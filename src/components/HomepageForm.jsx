import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HomepageForm = () => {

    const [sessionId, setSessionId] = useState('');
    const [userName, setUserName] = useState('');

    const createNewRoom = () => {
        console.log("creating new room");
        const uuid = uuidv4();
        console.log(uuid);
        setSessionId(uuid);
    }

    const joinRoom = () => {
        console.log("join room");
    }
    return (
        <div className='homepage_form'>

            <div className='form'>
                <div className='form__input_container' >
                    <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} className='form__input paragraph' id='room_id' placeholder=' ' />
                    <label className='form__label paragraph' htmlFor="room_id">Session ID</label>
                </div>
                <div className='form__input_container'>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} className='form__input paragraph' id='room_id' placeholder=' ' />
                    <label className='form__label paragraph' htmlFor="room_id">User Name</label>
                </div>

                <button onClick={joinRoom} className='form__btn paragraph'>Join Room</button>
                <span className='paragraph'>or</span>
                <button onClick={createNewRoom} className='form__btn paragraph form__btn-login'>Create New Room</button>
            </div>
        </div>
    )
}

export default HomepageForm