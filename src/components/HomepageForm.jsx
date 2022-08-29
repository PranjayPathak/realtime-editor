import React from 'react';

const HomepageForm = () => {
    return (
        <div className='homepage_form'>

            <div className='form'>
                <div className='form__input_container' >
                    <input className='form__input paragraph' id='room_id' placeholder=' ' />
                    <label className='form__label paragraph' htmlFor="room_id">Session ID</label>
                </div>
                {/* <br /><br /><br /><br /><br /> */}
                <div className='form__input_container'>
                    <input className='form__input paragraph' id='room_id' placeholder=' ' />
                    <label className='form__label paragraph' htmlFor="room_id">User Name</label>
                </div>

                <button className='form__btn paragraph'>Join Room</button>
                <span className='paragraph'>or</span>
                <button className='form__btn paragraph form__btn-login'>Create New Room</button> 
            </div>
        </div>
    )
}

export default HomepageForm