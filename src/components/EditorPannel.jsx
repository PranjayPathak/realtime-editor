import React from 'react'
import CodeEditor from './CodeEditor'
import TerminalPannel from './TerminalPannel'
import VideoPannel from './VideoPannel'
function EditorPannel({ videoPannelOpen, setVideoPannel, terminalPannelOpen, setTerminalPannel, editorTheme, handleThemeChange, editorCode, updateEditorCode }) {

    return (
        <div className={`editor-pannel`}>
            <div className='editor-container'>
                <CodeEditor
                    editorTheme={editorTheme.value}
                    editorCode={editorCode}
                    updateEditorCode={updateEditorCode}
                />
                <TerminalPannel
                    setTerminalPannel={setTerminalPannel}
                    terminalPannelOpen={terminalPannelOpen}
                    editorTheme={editorTheme}
                    handleThemeChange={handleThemeChange}
                />
            </div>
            {/* <p style={{color: 'white'}}></p> */}
            <VideoPannel
                videoPannelOpen={videoPannelOpen}
                setVideoPannel={setVideoPannel}
            />
        </div >
    )
}

export default EditorPannel