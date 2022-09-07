import React, { useMemo } from 'react'

function TerminalPannel({terminalPannelOpen, setTerminalPannel}) {
    const click = () => {
        setTerminalPannel(!terminalPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return terminalPannelOpen ? 'open' : 'closed';
    }, [terminalPannelOpen])

    return (
        <div className={`terminal-container ${pannelOpen}`}>
            <button onClick={click}>shiftterm</button>
        </div>
    )
}

export default TerminalPannel