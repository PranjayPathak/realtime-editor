import React from 'react';
import hero_img from 'assets/image/hero_img.jpg';
// import Logo from 'assets/image/logo-beta.png'

import Logo from 'assets/image/logo-white.png'
import HomepageForm from 'components/HomepageForm';
const Home = () => {
    return (
        <>
            <div className='homepage_container'>
                {/* <div className='homepage_container__hero-image'></div> */}
                {/* <div style={{ borderRadius: "10px", position: "absolute", zIndex: "5", display: 'inline-block', background: '#fff', margin: '4rem' }}> */}
                    <img className='homepage_container__logo' src={Logo} alt='LOGO' />
                {/* </div> */}
                <img className='homepage_container__hero-image' src={hero_img} alt='imagine_a_guy_on_desktop'></img>
                <HomepageForm className="homepage_container__form" />
            </div>
        </>
    )
}

export default Home