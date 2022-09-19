import React, { useState, useMemo } from 'react'
import ControlBoard from './ControlBoard'
import UserCard from './UserCard'

function UserPannel({ usersList, isOpen, toggleUserPannel }) {

    const click = () => {
        // toggleUserPannel(!isOpen)
    }

    let pannelOpen = useMemo(() => {
        return isOpen ? 'open' : 'closed';
    }, [isOpen])

    if (usersList.length === 0) return;
    return (
        <>
            <div onClick={click} className={`user-pannel ${pannelOpen}`}>

                <div className='usercard_container'>
                    {/* <h3 className="usercard_container__heading headline-3 ">CONNECTED</h3> */}
                    {
                        usersList.map((user) => {
                            return (
                                <UserCard key={user.socketId} user={user} />
                            )
                        })
                    }

                </div>
                <ControlBoard />
            </div>
        </>
    )
}

export default UserPannel;