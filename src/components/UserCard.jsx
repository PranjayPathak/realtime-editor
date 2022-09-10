import React, { useEffect, useState, useMemo } from 'react'

function UserCard({ user }) {

    const [bgColor, setBgColor] = useState(getRandomColor())

    function getRandomColor() {

        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * (90 - 60 + 1) + 60) + "%";
        const lightness = Math.floor(Math.random() * (60 - 30 + 1) + 30) + "%";;//'40%';
        return "hsl(" + hue + ", " + saturation + ", " + lightness + ")";
        // return "hsl(" + Math.random() * 360 + ", 80%, 40%)";
    }


    // useEffect(() => {
    //     setBgColor();
    // })
    return (
        <div className='usercard'>
            <div className='usercard__icon headline-1`' style={{ backgroundColor: bgColor }}>
                {user.name.slice(0, 1).toUpperCase()}
            </div>

            <div className='usercard__name label-3'>{user.name}</div>
        </div>
    )
}

export default UserCard
