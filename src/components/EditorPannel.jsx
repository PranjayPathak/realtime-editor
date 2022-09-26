import React from 'react'
import CodeEditor from './CodeEditor'
import TerminalPannel from './TerminalPannel'
import VideoPannel from './VideoPannel'
function EditorPannel({ processing, outputDetails , videoPannelOpen, setVideoPannel, terminalPannelOpen, setTerminalPannel, editorTheme, handleThemeChange, editorCode, updateEditorCode, editorLanguage, setEditorLanguage, customInput, setCustomInput }) {

    return (
        <div className={`editor-pannel`}>
            <div className='editor-container'>
                <CodeEditor
                    editorTheme={editorTheme.value}
                    editorCode={editorCode}
                    updateEditorCode={updateEditorCode}
                    editorLanguage={editorLanguage}
                />
                <TerminalPannel
                    setTerminalPannel={setTerminalPannel}
                    terminalPannelOpen={terminalPannelOpen}
                    editorTheme={editorTheme}
                    handleThemeChange={handleThemeChange}
                    editorLanguage={editorLanguage}
                    setEditorLanguage={setEditorLanguage}
                    customInput={customInput} 
                    setCustomInput={setCustomInput}
                    outputDetails={outputDetails}
                />
            </div>
            {/* <p style={{color: 'white'}}></p> */}
            {/* <button onClick={handleCompile}>compile</button> */}
            <VideoPannel
                videoPannelOpen={videoPannelOpen}
                setVideoPannel={setVideoPannel}

                processing={processing}
                outputDetails={outputDetails}
            />
        </div >
    )
}

export default EditorPannel