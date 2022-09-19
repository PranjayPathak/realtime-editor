import React, { useMemo } from 'react';
// import Dropdown from './dropdown';

function TerminalPannel({terminalPannelOpen, setTerminalPannel}) {
    const click = () => {
        setTerminalPannel(!terminalPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return terminalPannelOpen ? 'open' : 'closed';
    }, [terminalPannelOpen])

    return (
        <div onClick={click} className={`terminal-container ${pannelOpen}`}>
            {/* <Dropdown /> */}
        </div>
    )
}

export default TerminalPannel