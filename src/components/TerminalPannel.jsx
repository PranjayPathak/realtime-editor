import React, { useMemo } from 'react';
import monacoThemes from "monaco-themes/themes/themelist";
import { languageOptions } from 'constants/languageOptions';
import Dropdown from './Dropdown';
// import ThemeDropdown from './themeDropdown';
import CustomInput from './CustomInput';
import OutputDetails from './OutputDetails';

// const themeArray = ['dracula', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night']

function TerminalPannel({ terminalPannelOpen, setTerminalPannel, editorTheme, handleThemeChange, editorLanguage, setEditorLanguage, customInput, setCustomInput, outputDetails }) {
    const click = () => {
        // setTerminalPannel(!terminalPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return terminalPannelOpen ? 'open' : 'closed';
    }, [terminalPannelOpen])

    return (
        <div onClick={click} className={`terminal-container ${pannelOpen}`}>
            {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={editorTheme} /> */}
            <div>
                <Dropdown
                    key={1}
                    // listItems={themeArray}
                    placeholderText={'Javascript'}
                    listItems={languageOptions}
                    onSelectItem={(item) => {
                        setEditorLanguage(item)
                    }}
                />
                <Dropdown
                    key={2}
                    // listItems={themeArray}
                    placeholderText={'Select Theme'}
                    listItems={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                        label: themeName,
                        value: themeId,
                        id: themeId,
                    }))}
                    onSelectItem={handleThemeChange}
                />
            </div>
            <div>
                <CustomInput
                    customInput={customInput} 
                    setCustomInput={setCustomInput}
                />
                <OutputDetails outputDetails={outputDetails}/>
            </div>
        </div>
    )
}

export default TerminalPannel