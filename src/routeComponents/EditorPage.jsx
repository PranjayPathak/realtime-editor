import React, { useState, useMemo } from 'react'
import UserPannel from 'components/UserPannel'
import EditorPannel from 'components/EditorPannel'

const EditorPage = () => {
  const [userPannelCollapsed, setUserPannelCollapsed] = useState(true);
  const [userPannelWidth, editorPannelWidth] = useMemo(() => {
    return userPannelCollapsed ? ['10vw','90vw'] : ['20vw','80vw']
  }, [userPannelCollapsed])

  return (
    <div className='editor_page'>
      <div>
        <UserPannel width={userPannelWidth} />
      </div>
      <div >
        <EditorPannel width={editorPannelWidth} />
      </div>

    </div>
  )
}

export default EditorPage