import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-hot-toast';
import ToasterComponent from 'components/ToasterComponent';


const HomepageForm = () => {
    const Navigate = useNavigate();
    const [sessionId, setSessionId] = useState('');
    const [userName, setUserName] = useState('');

    const createNewSession = () => {
        // console.log("creating new room");
        const uuid = uuidv4();
        // console.log(uuid);
        setSessionId(uuid);
        Toast.dismiss();
        Toast.success("New session created")
    }

    const joinSession = (e) => {
        e.preventDefault();
        if (!sessionId) {
            Toast.dismiss();
            Toast.error("Invalid Session ID")
        }
        else if (!userName) {
            Toast.dismiss();
            Toast.error("Invalid Username")
        } else {
            Navigate(`/editor/${sessionId.trim()}`, {
                state: {
                    userName
                }
            })
        }
    }

    return (
        <div className='homepage_form'>
            <ToasterComponent />
            <form className='form' onSubmit={joinSession}>
                <div className='form__input_container' >
                    <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} className='form__input paragraph' id='room_id' required placeholder=' ' />
                    <label className='form__label paragraph' htmlFor="room_id">Session ID</label>
                </div>
                <div className='form__input_container'>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} className='form__input paragraph' id='room_id' required placeholder=' ' />
                    <label className='form__label paragraph' htmlFor="room_id">User Name</label>
                </div>

                <button type='submit' onClick={joinSession} className='form__btn paragraph'>Join Room</button>
                <span className='paragraph'>or</span>
                <button type="button" onClick={createNewSession} className='form__btn paragraph form__btn-login'>Create New Room</button>
            </form>
        </div>
    )
}

export default HomepageForm