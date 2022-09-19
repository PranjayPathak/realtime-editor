import React, { useState, useEffect, useCallback } from 'react'

function UserCard({ user }) {

    const stringToHslColor = useCallback((str = user.userName, s = 85, l = 55) => {
        // console.log("set clr");
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var h = hash % 360;
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }, [user])

    const [bgColor, setBgColor] = useState();//(getRandomColor())

    // function getRandomColor() {
    //     const hue = Math.floor(Math.random() * 360);
    //     const saturation = Math.floor(Math.random() * (90 - 60 + 1) + 60) + "%";
    //     const lightness = Math.floor(Math.random() * (60 - 30 + 1) + 30) + "%";;//'40%';
    //     return "hsl(" + hue + ", " + saturation + ", " + lightness + ")";
    //     // return "hsl(" + Math.random() * 360 + ", 80%, 40%)";
    // }


    useEffect(() => {
        setBgColor(stringToHslColor());
    }, [stringToHslColor])

    return (
        <div className='usercard'>
            <div className='usercard__icon label-1' style={{ backgroundColor: bgColor }}>
                {user.userName.slice(0, 1).toUpperCase()}
            </div>

            <div className='usercard__name label-3'>{user.userName}</div>
        </div>
    )
}

export default UserCard
