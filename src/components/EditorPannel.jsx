import React from 'react'
import Editor from './Editor'
import TerminalPannel from './TerminalPannel'
import VideoPannel from './VideoPannel'
function EditorPannel({ videoPannelOpen, setVideoPannel, terminalPannelOpen, setTerminalPannel, socketRef,
    sessionId,
    onCodeChange }) {

    return (
        <div className={`editor-pannel`}>
            <div className='editor-container'>
                <Editor socketRef={socketRef}
                    sessionId={sessionId}
                    onCodeChange={onCodeChange} />
                <TerminalPannel setTerminalPannel={setTerminalPannel} terminalPannelOpen={terminalPannelOpen} />
            </div>
            <VideoPannel videoPannelOpen={videoPannelOpen} setVideoPannel={setVideoPannel} />
        </div >
    )
}

export default EditorPannel