import React from "react";
import { useHistory } from 'react-router-dom';
import "./Error404Page.css";
 

function Error404Page() {
  const history = useHistory(); 

  return (
    <section className="error404">
      <div className="error404__container">
        <p className="error404__num">404</p>
        <p className="error404__text">Страница не найдена</p>
        <p className="error404__link" onClick={()=>{history.push('/')}}>Назад</p>
        {/* <p className="error404__link" onClick={() => history.goBack()}>Назад</p> */}
      </div>
    </section>
  );
}

export default Error404Page;