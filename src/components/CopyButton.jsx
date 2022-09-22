import React from 'react'

function CopyButton({ clicked, icon }) {
    return (
        <button onClick={clicked} className="btn button-69 label-2" >
            <img className='control_board__button__icon' src={icon} alt='.' />
            <span className='control_board__button__text' >Session ID</span>
        </button>
    )
}

export default CopyButton