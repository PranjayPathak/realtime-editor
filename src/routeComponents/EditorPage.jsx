import React, { useState,  useEffect, useCallback } from 'react'
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
import axios from 'axios';
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

  const [editorCode, setEditorCode] = useState("console.log('hello world')")
  const [editorTheme, setEditorTheme] = useState("cobalt")
  const [usersList, setUsersList] = useState([]);
  const [editorLanguage, setEditorLanguage] = useState({
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
  });
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("")
  const [outputDetails, setOutputDetails] = useState(null);


  const checkStatus = useCallback(async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {

        if (!videoPannelOpen) setVideoPannel(true);
        setProcessing(false)
        setOutputDetails(response.data)
        Toast.dismiss();
        Toast.success(`Compiled Successfully!`)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      if (!videoPannelOpen) setVideoPannel(true);
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();

      Toast.dismiss();
      Toast.error('Something went wrong, please try again later.');
    }
  }, [videoPannelOpen]);


  const handleCompile = useCallback(() => {
    setProcessing(true);
    const formData = {
      language_id: editorLanguage.id,
      // encode source code in base64
      source_code: btoa(editorCode),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  }, [checkStatus, customInput, editorCode, editorLanguage]);


  const handleThemeChange = useCallback((th) => {
    const theme = th;
    console.log("theme: ", theme);

    if (["light", "vs-dark"].includes(theme.value)) { 
      setEditorTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setEditorTheme(theme));
    }
  }, [])

  const updateEditorCode = useCallback((code) => {
    console.log("update code: ", code);
    setEditorCode(code);
    socket.emit(ACTIONS.CODE_CHANGE, {
      sessionId,
      code,
    });
  }, [setEditorCode, sessionId])

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
      socket.off(ACTIONS.SYNC_CODE)
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

  // console.log("!location.state: ", !location.state, location.state?.userName);
  if (!location.state) {
    reactNavigator('/');
    // return <Redirect to="/" />;
  }

  return (
    <div className='editor_page'
    // style={{backgroundColor: `${backgroundColor}`}}
    >
      <ToasterComponent />
      <UserPannel
        usersList={usersList}
        isOpen={userPannelOpen}
        toggleUserPannel={setUserPannel}
        handleCompile={handleCompile}
        processing={processing}
      />
      <EditorPannel
        videoPannelOpen={videoPannelOpen}
        setVideoPannel={setVideoPannel}
        terminalPannelOpen={terminalPannelOpen}
        setTerminalPannel={setTerminalPannel}
        editorTheme={editorTheme}
        handleThemeChange={handleThemeChange}
        editorCode={editorCode}
        editorLanguage={editorLanguage}
        setEditorLanguage={setEditorLanguage}
        updateEditorCode={updateEditorCode}
        processing={processing}
        outputDetails={outputDetails}


        customInput={customInput}
        setCustomInput={setCustomInput}
      />
    </div>
  )
}

export default EditorPage
