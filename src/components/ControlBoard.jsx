import React from 'react'
import EndCallIcon from 'assets/icon/end-call.svg'
import CopyIcon from 'assets/icon/copy.svg'
import CheckedIcon from 'assets/icon/checked.svg'

function ControlBoard() {
    return (
        <div><div className='control_board'>
            <button className='control_board__button primary label-2'>
                <img className='control_board__button__icon' src={CopyIcon} alt='.' />
                <span className='control_board__button__text' >Copy Room ID</span>
            </button>
            <button className='control_board__button danger label-2'>
                <img className='control_board__button__icon' src={EndCallIcon} alt='end call' />
                <span className='control_board__button__text' > Leave Room</span>
            </button>
        </div></div>
    )
}

export default ControlBoard