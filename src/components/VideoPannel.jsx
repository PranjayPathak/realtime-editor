import React, { useMemo } from 'react'

function VideoPannel({videoPannelOpen, setVideoPannel}) {

    const click = () => {
        setVideoPannel(!videoPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return videoPannelOpen ? 'open' : 'closed';
    }, [videoPannelOpen])

    return (
        <div className={`video-container ${pannelOpen}`}>
            <h3>video box</h3>
            <button onClick={click}>shift</button>
        </div>
    )
}

export default VideoPannel