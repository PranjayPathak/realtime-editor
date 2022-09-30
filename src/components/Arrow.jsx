import React from 'react'

const Arrow = ({ position, direction, onClick }) => {

    return (
        <div onClick={onClick} className={`arrow_container ${position}`}>
            <span className={`arrow ${direction}`} ></span>
        </div>
    )
}

export default Arrow
