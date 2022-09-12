import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubLight, githubDark } from '@uiw/codemirror-themes-all';

function Editor() {
    const [code, setCode] = useState("console.log('hello')")

    useEffect(() => {
    })
    return (
        <div className={`codeEditor`}>
            <div className='codeEditor__container'>
                <CodeMirror
                    className="codeEditor__container__codeMirror"
                    extensions={[javascript({ jsx: true })]}
                    value={code}
                    theme={githubDark}
                    height="100%"
                    width="100%"
                    autoFocus={true}
                    // foldGutter={true}
                    // onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Editor