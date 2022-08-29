import React from 'react';
import hero_img from 'assets/image/hero_img.svg';
import HomepageForm from 'components/HomepageForm';
const Home = () => {
    return (
        <>
            <div className='homepage_container'>
                {/* <div className='homepage_container__hero-image'></div> */}
                <img className='homepage_container__hero-image' src={hero_img} alt='imagine_a_guy_on_desktop'></img>
                <HomepageForm className="homepage_container__form" />
            </div>
        </>
    )
}

export default Home