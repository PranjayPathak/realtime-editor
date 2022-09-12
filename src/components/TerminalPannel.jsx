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
        </div>
    )
}

export default TerminalPannel