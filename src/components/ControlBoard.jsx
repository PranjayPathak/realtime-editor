import React, { useCallback, useMemo, useState } from 'react'
import Toast from 'react-hot-toast';
import EndCallIcon from 'assets/icon/end-call.svg'
import CopyIcon from 'assets/icon/copy.png'
import CheckedIcon from 'assets/icon/checked.png'

import { useNavigate, useParams } from 'react-router-dom';
import ExitButton from './ExitButton';
import CopyButton from './CopyButton';

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
            {/* <button onClick={copyId} className='control_board__button primary label-2'>
                <img className='control_board__button__icon' src={icon} alt='.' />
                <span className='control_board__button__text' >Session ID</span>
            </button> */}

            {/* <button onClick={leaveRoom} className='control_board__button danger label-2'>
                <img className='control_board__button__icon' src={EndCallIcon} alt='end call' />
                <span className='control_board__button__text' >Leave Room</span>
            </button> */}
            <CopyButton clicked={copyId} icon={icon} />
            <ExitButton clicked={leaveRoom} />
        </div>
    )
}

export default ControlBoard