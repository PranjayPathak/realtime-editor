import React, { useMemo } from 'react';
import monacoThemes from "monaco-themes/themes/themelist";
import Dropdown from './Dropdown';
import ThemeDropdown from './themeDropdown';

// const themeArray = ['dracula', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night', 'material', 'material-darker', 'mdn-like', 'the-matrix', 'night']

function TerminalPannel({ terminalPannelOpen, setTerminalPannel, editorTheme, handleThemeChange }) {
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
                // listItems={themeArray}
                placeholderText={'Select Theme'}
                listItems={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                    label: themeName,
                    value: themeId,
                    key: themeId,
                }))}
                onSelectItem={handleThemeChange} />
        </div>
    )
}

export default TerminalPannel