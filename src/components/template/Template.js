import React, { useState } from 'react'
import style from './Template.module.css'
import Template1 from '../../public/img1.png'
import Template2 from '../../public/im2.jpg'
import Template3 from '../../public/im3.jpeg'
function Template() {
    const [activeIndex, setActiveIndex] = useState(1);

    function handle(index) {
        setActiveIndex(index);
    }

    return (
        <div className={style.container}>
            <p className={style.heading}>Templates</p>
            <div className={style.img}>
                <img 
                    src={Template1} 
                    className={`${style.image} ${activeIndex === 0 ? style.active : ''}`} 
                    onClick={() => handle(0)} 
                    alt='resume'
                />
                <img 
                    src={Template2} 
                    className={`${style.image} ${activeIndex === 1 ? style.active : ''}`} 
                    onClick={() => handle(1)} 
                    alt="temp2"
                />
                <img 
                    src={Template3} 
                    className={`${style.image} ${activeIndex === 2 ? style.active : ''}`} 
                    onClick={() => handle(2)} 
                    alt="temp3"
                />
            </div>
        </div>
    )
}

export default Template
