import React, { useMemo } from 'react';
import monacoThemes from "monaco-themes/themes/themelist";
import { languageOptions } from 'constants/languageOptions';
import Dropdown from './Dropdown';
import ThemeDropdown from './themeDropdown';

// const themeArray = ['dracula', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night']

function TerminalPannel({ terminalPannelOpen, setTerminalPannel, editorTheme, handleThemeChange, editorLanguage, setEditorLanguage }) {
    const click = () => {
        // setTerminalPannel(!terminalPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return terminalPannelOpen ? 'open' : 'closed';
    }, [terminalPannelOpen])

    return (
        <div onClick={click} className={`terminal-container ${pannelOpen}`}>
            {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={editorTheme} /> */}
            <Dropdown
                key={1}
                // listItems={themeArray}
                placeholderText={'Javascript'}
                listItems={languageOptions}
                onSelectItem={(item) => {
                    setEditorLanguage(item.value)
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
    )
}

export default TerminalPannel