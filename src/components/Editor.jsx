import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

// Themes
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';

// const themeArray = ['dracula', 'material', 'material-darker' , 'mdn-like', 'the-matrix', 'night']

const Editor = ({ socketRef, sessionId, onCodeChange }) => {
    const [theme, setTheme] = useState("material-darker")
    const editorRef = useRef(null);

    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: theme,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        sessionId,
                        code,
                    });
                }
            });
        }
        init();
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                console.log("received code change: ",code);
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    return <>
        <div className={`codeEditor`}>
            <div className='codeEditor__container'>
                <textarea className="codeEditor__container__codeMirror" id="realtimeEditor"></textarea>
            </div>
        </div></>
};

export default Editor;

// import React, { useState, useCallback, useRef } from 'react'
// import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
// import { githubDark } from '@uiw/codemirror-themes-all';

// function Editor({ editorCode, setEditorCode, onChange }) {
//     // let x = useRef('10');

//     // const [code, setCode] = useState("console.log('hello')")

//     // useEffect(() => {
//     // })

//     // const onChange = useCallback((event) => {
//     //     console.log(x.current);
//     // //     //     console.log("on change");
//     // //     setEditorCode(event)
//     // }, [])
//     return (
//         <div className={`codeEditor`}>
//             <div className='codeEditor__container'>
//                 <CodeMirror
//                     className="codeEditor__container__codeMirror"
//                     extensions={[javascript({ jsx: true })]}

//                     // keyMap='sublime'
//                     theme={githubDark}
//                     height="100%"
//                     width="100%"
//                     autocompletion='false'
//                     autoFocus={true}
//                     // foldGutter={true}

//                     value={editorCode}
//                     onChange={onChange}
//                 // value={editorCode.current}

//                 // value={code}
//                 // onChange={(event) => { setCode(event) }}
//                 />
//             </div>
//         </div>
//     )
// }

// export default Editor