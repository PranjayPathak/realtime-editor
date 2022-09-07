import React, { useState, useMemo } from 'react'

function UserPannel({ isOpen, toggleUserPannel }) {
    const list = [{
        name: 'ajjj',
        socketID: 1
    },{
        name: 'babbb',
        socketID: 2
    },{
        name: 'cbbba',
        socketID: 3
    }]
    const [usersList, setUsersList] = useState(list)

    const click = () => {
        toggleUserPannel(!isOpen)
    }

    let pannelOpen = useMemo(() => {
        return isOpen ? 'open' : 'closed';
    }, [isOpen])

    return (
        <div onClick={click} className={`user-pannel ${pannelOpen}`}>
            <div className='usercard'>


            </div>
        </div>
    )
}

export default UserPannel