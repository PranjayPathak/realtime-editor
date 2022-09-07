import React, { useMemo, useState } from 'react'
import Dist from 'react-hot-toast'
import Split from 'react-split'
import Editor from './Editor'
import TerminalPannel from './TerminalPannel'
import VideoPannel from './VideoPannel'
function EditorPannel({videoPannelOpen, setVideoPannel, terminalPannelOpen, setTerminalPannel}) {

    return (
        <div className={`editor-pannel`}>
            <div className='editor-container'>
                <Editor />
                <TerminalPannel setTerminalPannel={setTerminalPannel} terminalPannelOpen={terminalPannelOpen}/>
            </div>
            <VideoPannel videoPannelOpen={videoPannelOpen} setVideoPannel={setVideoPannel} />
        </div >
    )
}

export default EditorPannel