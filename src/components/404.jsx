import React from 'react'
function error404() {
    return (
        <div className="error"> 
            <span className='error__subtitle label-2'>
                Thanks. You just broke it all !
            </span>
            <h1 className="error__title">
                404
            </h1>
            <a href="/" >
                <span className="error__btn label-3">get me out of here</span>
            </a>
        </div>

    )
}

export default error404;