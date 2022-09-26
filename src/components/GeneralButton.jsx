import React from 'react'

function GeneralButton({ clicked, icon, text, isDisabled }) {
    return (
        <button onClick={clicked} className="btn button-69 label-2" disabled={isDisabled} >
            <img className='control_board__button__icon' src={icon} alt='.' />
            <span className='control_board__button__text' >{text}</span>
        </button>
    )
}

export default GeneralButton