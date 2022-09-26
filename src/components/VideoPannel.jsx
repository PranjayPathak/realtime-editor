import React, { useMemo } from 'react'
import OutputPannel from './OutputPannel';

function VideoPannel({ outputDetails, videoPannelOpen, setVideoPannel }) {

    const click = () => {
        // setVideoPannel(!videoPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return videoPannelOpen ? 'open' : 'closed';
    }, [videoPannelOpen])

    return (
        <div className={`video-container ${pannelOpen}`} onClick={click}>
            <OutputPannel outputDetails={outputDetails} style={{ color: 'white !important' }} />
        </div>
    )
}

export default VideoPannel