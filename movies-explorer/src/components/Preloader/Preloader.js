import React from 'react'
import './Preloader.css'

function Preloader({loader}) {
  return (
    <div className={`preloader ${loader}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
