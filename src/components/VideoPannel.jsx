import React, { useMemo } from 'react'

function VideoPannel({videoPannelOpen, setVideoPannel}) {

    const click = () => {
        setVideoPannel(!videoPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return videoPannelOpen ? 'open' : 'closed';
    }, [videoPannelOpen])

    return (
        <div className={`video-container ${pannelOpen}`} onClick={click}>
            <h3>video Pannel</h3>
        </div>
    )
}

export default VideoPannel