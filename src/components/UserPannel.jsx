import React, { useEffect } from 'react'

function UserPannel({ width }) {

    const style = {
        width //collapsed ? '10vw' : '20vw'
    }

    // useEffect(() => {
        // console.log(collapsed);
        // console.log(style);
    // })

    return (
        <div className='user-pannel' style={style}>UserPannel </div>
    )
}

export default UserPannel