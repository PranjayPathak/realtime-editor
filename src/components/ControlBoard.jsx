import React, { useCallback, useMemo, useState } from 'react'
import Toast from 'react-hot-toast';
import EndCallIcon from 'assets/icon/end-call.svg'
import CopyIcon from 'assets/icon/copy.svg'
import CheckedIcon from 'assets/icon/checked.svg'

import { useNavigate, useParams } from 'react-router-dom';

function ControlBoard() {

    const Navigate = useNavigate();
    const [clicked, setClicked] = useState(false)
    const icon = useMemo(() => {
        return clicked ? CheckedIcon : CopyIcon
    }, [clicked])

    const { sessionId } = useParams();
    const copyId = useCallback(async () => {
        if (clicked) return;
        try {
            setClicked(true);
            await navigator.clipboard.writeText(sessionId);
            setTimeout(() => {
                setClicked(false)
            }, 2000)
            Toast.dismiss();
            Toast.success('Copied Session ID');
        } catch (err) {
            Toast.dismiss();
            Toast.error('Error while copying the Session ID');
            console.error(err);
        }
    }, [clicked, sessionId])

    const leaveRoom = useCallback(() => {
        Navigate('/')
    })
    return (
        <div className='control_board'>
            <button onClick={copyId} className='control_board__button primary label-2'>

                <img className='control_board__button__icon' src={icon} alt='.' />
                <span className='control_board__button__text' >Copy Session ID</span>
            </button>
            <button onClick={leaveRoom} className='control_board__button danger label-2'>
                <img className='control_board__button__icon' src={EndCallIcon} alt='end call' />
                <span className='control_board__button__text' >Leave Room</span>
            </button>
        </div>
    )
}

export default ControlBoard