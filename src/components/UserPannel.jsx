import React, { useMemo, useCallback } from 'react'
import Logo from 'assets/image/logo-beta-5.png'
import ControlBoard from './ControlBoard'
import UserCard from './UserCard'
import Arrow from "./Arrow";

function UserPannel({ usersList, isOpen, toggleUserPannel, handleCompile, processing }) {

    console.log("usersList: ", usersList);

    const click = useCallback(() => {
        toggleUserPannel(!isOpen)
    }, [toggleUserPannel, isOpen])

    let pannelOpen = useMemo(() => {
        return isOpen ? 'open' : 'closed';
    }, [isOpen])

    if (usersList.length === 0) return;
    return (
        <div className={`user-pannel ${pannelOpen}`}>
            <div>
                <div className='logo-container'>
                    <img className='logo-container__logo' src={Logo} alt='LOGO' />
                </div>
                <hr className='hr-rule' />

                <div className='usercard_container'>
                    {
                        usersList.map((user) => {
                            return (
                                <UserCard key={user.socketId} user={user} />
                            )
                        })
                    }

                </div>
            </div>
            <Arrow onClick={click} position='position-right' direction={isOpen ? 'left' : 'right'} />
            <ControlBoard processing={processing} handleCompile={handleCompile} />
        </div>
    )
}

export default UserPannel;