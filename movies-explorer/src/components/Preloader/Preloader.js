import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className="preloader" style={{"display":`${props.loader? "flex":"none"}`}}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
