import React from 'react'
import EndCallIcon from 'assets/icon/end-call.png'

function ExitButton({ clicked }) {
    return (
        <div style={{marginRight:'7px'}}>
            <button
                onClick={() => {
                    clicked();
                }}
                className="btn button-49 label-2">
                <img className='control_board__button__icon' src={EndCallIcon} alt='end call' />
                <span className='control_board__button__text' >Leave Room</span>
            </button>
        </div>
    )
}

export default ExitButton