import React, { useMemo } from 'react';
import monacoThemes from "monaco-themes/themes/themelist";
import { languageOptions } from 'constants/languageOptions';
import CustomInput from './CustomInput';
import OutputDetails from './OutputDetails';
import Dropdown from './Dropdown';

function TerminalPannel({ terminalPannelOpen, setTerminalPannel, editorTheme, handleThemeChange, editorLanguage, setEditorLanguage, customInput, setCustomInput, outputDetails }) {
    const click = () => {
        // setTerminalPannel(!terminalPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return terminalPannelOpen ? 'open' : 'closed';
    }, [terminalPannelOpen])

    return (
        <div onClick={click} className={`terminal-container ${pannelOpen}`}>
            <div className='dropdown-container'>
                <Dropdown
                    placeholderText={'Javascript'}
                    listItems={languageOptions}
                    onSelectItem={(item) => {
                        setEditorLanguage(item)
                    }}
                />
                <Dropdown
                    placeholderText={'Select Theme'}
                    listItems={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                        label: themeName,
                        value: themeId,
                        id: themeId,
                    }))}
                    onSelectItem={handleThemeChange}
                />
            </div>
            <div className='custom-input-container para-2'>

                <OutputDetails outputDetails={outputDetails} />
                <CustomInput
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                />
            </div>
        </div>
    )
}

export default TerminalPannel