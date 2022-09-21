import React, { useState, useMemo, useRef, useEffect, Navigate, useCallback } from 'react'
import UserPannel from 'components/UserPannel'
// import Split from 'split.js'
import EditorPannel from 'components/EditorPannel'
import Toast from 'react-hot-toast';
import ToasterComponent from 'components/ToasterComponent';

// import { initSocket } from 'socket';
import { io } from 'socket.io-client';
import ACTIONS from 'Actions';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { defineTheme } from 'utils/defineTheme';
// import ThemeDropdown from 'components/themeDropdown';

const options = {
  'force new connection': true,
  reconnectionAttempt: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};
const socket = io.connect(process.env.REACT_APP_BACKEND_URL, options);

const EditorPage = () => {
  // const socketRef = useRef(null);
  // const codeRef = useRef(null)
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { sessionId } = useParams();
  const [userPannelOpen, setUserPannel] = useState(true);
  const [videoPannelOpen, setVideoPannel] = useState(false);
  const [terminalPannelOpen, setTerminalPannel] = useState(true);

  const [editorCode, setEditorCode] = useState("defaultext")
  const [editorTheme, setEditorTheme] = useState("cobalt")
  const [usersList, setUsersList] = useState([]);

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      console.log("here");
      setEditorTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setEditorTheme(theme));
    }
  }

  const updateEditorCode = (code) => {
    console.log("update code: ", code);
    setEditorCode(code);
    socket.emit(ACTIONS.CODE_CHANGE, {
      sessionId,
      code,
    });
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setEditorTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );

    const handleErrors = (err) => {
      console.log('socket error: ', err);
      Toast.dismiss();
      Toast.error('Socket connection failed, please try again later.');
      reactNavigator('/');
    }

    // const init = async () => {
    console.log("init socket client");
    // socket = await initSocket();

    socket.on('connect_error', (err) => handleErrors(err));
    socket.on('connect_failed', (err) => handleErrors(err));

    socket.emit(ACTIONS.JOIN, {
      sessionId,
      userName: location.state?.userName
    })

    // }
    // init();

    return () => {
      // clearing listners
      console.log("disconnecting and removing listeners");
      socket.disconnect();
      socket.off(ACTIONS.JOINED)
      socket.off(ACTIONS.DISCONNECTED)
      socket.off(ACTIONS.CODE_CHANGE)
    }
  }, [sessionId, location.state?.userName, reactNavigator]);

  useEffect(() => {
    //Listening for joined event
    socket.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {
      if (userName !== location.state?.userName) {
        Toast.dismiss();
        Toast.success(`${userName} just joined`)
        console.log(`${userName} joined`);

        console.log("emitting code sync: ", socketId, editorCode);
        socket.emit(ACTIONS.SYNC_CODE, { sessionId: socketId, code: editorCode })
      }
      setUsersList(clients);
    })

    //Listening to code change event
    socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      console.log("received code change: ", code);
      if (code !== null) {
        setEditorCode(code);
        // editorRef.current.setValue(code);
      }
    });

    //Listening for disconnect event
    socket.on(ACTIONS.DISCONNECTED, ({ userName, socketId }) => {
      Toast.dismiss();
      Toast.error(`${userName} left the room`)

      setUsersList((prev) => {
        return prev.filter(client => client.socketId !== socketId)
      });
    })
  }, [location.state?.userName, editorCode])
  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className='editor_page' 
    // style={{backgroundColor: `${backgroundColor}`}}
    >
      <ToasterComponent />
      <UserPannel
        usersList={usersList}
        isOpen={userPannelOpen}
        toggleUserPannel={setUserPannel} />
      <EditorPannel
        videoPannelOpen={videoPannelOpen}
        setVideoPannel={setVideoPannel}
        terminalPannelOpen={terminalPannelOpen}
        setTerminalPannel={setTerminalPannel}
        editorTheme={editorTheme}
        handleThemeChange={handleThemeChange}
        editorCode={editorCode}
        updateEditorCode={updateEditorCode}
      />
    </div>
  )
}

export default EditorPage
