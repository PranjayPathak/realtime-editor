import React, { useState, useMemo, useRef, useEffect, Navigate, useCallback } from 'react'
import UserPannel from 'components/UserPannel'
// import Editor from 'components/Editor';
// import Split from 'split.js'
import EditorPannel from 'components/EditorPannel'
import Toast from 'react-hot-toast';
import ToasterComponent from 'components/ToasterComponent';

import { initSocket } from 'socket';
// import { debounce } from "lodash"
import ACTIONS from 'Actions';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null)
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { sessionId } = useParams();
  const [userPannelOpen, setUserPannel] = useState(true);
  const [videoPannelOpen, setVideoPannel] = useState(false);
  const [terminalPannelOpen, setTerminalPannel] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const handleErrors = useCallback((err) => {
    console.log('socket error: ', err);
    Toast.dismiss();
    Toast.error('Socket connection failed, please try again later.');
    reactNavigator('/');
  }, [reactNavigator])

  useEffect(() => {
    const init = async () => {
      console.log("init socket client");
      socketRef.current = await initSocket();

      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        sessionId,
        userName: location.state?.userName
      })

      //Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {
        if (userName !== location.state?.userName) {
          Toast.dismiss();
          Toast.success(`${userName} just joined`)
          console.log(`${userName} joined`);

          console.log("emitting code sync: ", socketId, codeRef.current);
          socketRef.current.emit(ACTIONS.SYNC_CODE, { sessionId: socketId, code: codeRef.current })
        }
        setUsersList(clients);
      })

      //Listening for disconnect event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ userName, socketId }) => {
        Toast.dismiss();
        Toast.error(`${userName} left the room`)

        setUsersList((prev) => {
          return prev.filter(client => client.socketId !== socketId)
        });
      })

    }
    init();

    return () => {
      // clearing listners
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED)
      socketRef.current.off(ACTIONS.DISCONNECTED)
      // socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [sessionId, handleErrors, location.state?.userName]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className='editor_page'>
      <ToasterComponent />
      <UserPannel usersList={usersList} isOpen={userPannelOpen} toggleUserPannel={setUserPannel} />
      <EditorPannel socketRef={socketRef}
        sessionId={sessionId}
        onCodeChange={(code) => {
          codeRef.current = code;
        }} videoPannelOpen={videoPannelOpen} setVideoPannel={setVideoPannel} terminalPannelOpen={terminalPannelOpen} setTerminalPannel={setTerminalPannel} />
    </div>
  )
}

export default EditorPage
