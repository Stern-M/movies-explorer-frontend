import React from "react";
import "./InfoTooltip.css"
import errorStatus from '../../images/error.png'
import successStatus from '../../images/successfully_registered.png'

function InfoTooltip(props) {

  return (
    <div className={`popup popup_status_info ${props.isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__status">
        <button type="button" className="popup__cancel-button" aria-label="закрыть окно" onClick={props.onClose}></button>
        {
          props.status ? (
            <>
            <img className="popup__result-logo" alt="произошла ошибка" src={errorStatus}></img>
            <h2 className="popup__title popup__title-result">Что-то пошло не так! Попробуйте ещё раз.</h2>
            </>
          ) : (
            <>
            <img className="popup__result-logo" alt="вы зарегистрировались" src={successStatus}></img>
            <h2 className="popup__title popup__title-result">Вы успешно зарегистрировались!</h2>
            </>
          )
        }
      </div>
    </div>

  );
}

export default InfoTooltip