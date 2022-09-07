import React, { useState, useMemo } from 'react'
import UserPannel from 'components/UserPannel'
import Split from 'split.js'
import EditorPannel from 'components/EditorPannel'

const EditorPage = () => {
  const [userPannelOpen, setUserPannel] = useState(true);
  const [videoPannelOpen, setVideoPannel] = useState(false);
  const [terminalPannelOpen, setTerminalPannel] = useState(false);

  return (
    <div className='editor_page'>
      <UserPannel isOpen={userPannelOpen} toggleUserPannel={setUserPannel} />
      <EditorPannel videoPannelOpen={videoPannelOpen} setVideoPannel={setVideoPannel} terminalPannelOpen={terminalPannelOpen} setTerminalPannel={setTerminalPannel}/>
    </div>
  )
}

export default EditorPage