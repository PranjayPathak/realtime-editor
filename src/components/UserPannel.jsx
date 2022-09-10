import React, { useState, useMemo } from 'react'
import ControlBoard from './ControlBoard'
import UserCard from './UserCard'

function UserPannel({ isOpen, toggleUserPannel }) {
    const list = [{
        name: 'shivam',
        socketID: 1
    }, {
        name: 'rahul',
        socketID: 2
    }, {
        name: 'babayaga',
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
            <div className='usercard_container'>
                {
                    usersList.map((user) => {
                        return (
                            <UserCard key={user.socketID} user={user} />
                        )
                    })
                }

            </div>
            <ControlBoard />
        </div>
    )
}

export default UserPannel;