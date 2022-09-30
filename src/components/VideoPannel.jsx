import React, { useMemo } from 'react'
import Arrow from './Arrow';
import OutputPannel from './OutputPannel';

function VideoPannel({ outputDetails, videoPannelOpen, setVideoPannel }) {

    const click = () => {
        setVideoPannel(!videoPannelOpen);
    }

    const pannelOpen = useMemo(() => {
        return videoPannelOpen ? 'open' : 'closed';
    }, [videoPannelOpen])

    return (
        <div className={`output-wrapper ${pannelOpen}`}>
            <div className={`video-container ${pannelOpen}`}>
                <OutputPannel outputDetails={outputDetails} />
            </div>
            <Arrow onClick={click} position='position-top' direction={videoPannelOpen ? 'bottom' : 'top'} />
        </div>
    )
}

export default VideoPannel