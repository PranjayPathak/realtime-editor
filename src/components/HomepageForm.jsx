import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-hot-toast';
import Logo from 'assets/image/logo-white.png'
import ToasterComponent from 'components/ToasterComponent';


const HomepageForm = () => {
    const Navigate = useNavigate();
    const [sessionId, setSessionId] = useState('');
    const [userName, setUserName] = useState('');

    const createNewSession = useCallback(() => {
        // console.log("creating new room");
        const uuid = uuidv4();
        // console.log(uuid);
        setSessionId(uuid);
        Toast.dismiss();
        Toast.success("New session created")
    }, [])

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
            {/* <div style={{ border: '5px solid #0051DD', borderRadius: "10px", position: "relative", zIndex: "5", display: 'inline-block', background: '#0051DD', margin: '4rem', padding: '1rem 1.5rem' }}> */}
                    {/* <img style={{position:"relative", height: '5.5rem', marginBottom:"5rem" }} src={Logo} alt='LOGO' /> */}
                {/* </div> */}
            <form className='form' onSubmit={joinSession}>
                <div className='form__input_container' >
                    <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} className='form__input para-2' id='room_id' required placeholder=' ' />
                    <label className='form__label para-2' htmlFor="room_id">Session ID</label>
                </div>
                <div className='form__input_container'>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} className='form__input para-2' id='room_id' required placeholder=' ' />
                    <label className='form__label para-2' htmlFor="room_id">User Name</label>
                </div>

                <button type='submit' onClick={joinSession} className='form__btn para-2'>Join Room</button>
                <span className='para-2'>or</span>
                <button type="button" onClick={createNewSession} className='form__btn para-2 form__btn-login'>Create New Room</button>
            </form>
        </div>
    )
}

export default HomepageForm