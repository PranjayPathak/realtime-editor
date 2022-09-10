import React, { useMemo } from 'react'

function TerminalPannel({terminalPannelOpen, setTerminalPannel}) {
    const click = () => {
        setTerminalPannel(!terminalPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return terminalPannelOpen ? 'open' : 'closed';
    }, [terminalPannelOpen])

    return (
        <div onClick={click} className={`terminal-container ${pannelOpen}`}>
            <h3>Terminal Pannel</h3>
        </div>
    )
}

export default TerminalPannel