import React from 'react';

const PopupWithForm = (props) => {

  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen && ('popup_opened')}`}>
        <div className="popup__container">
          <form className="popup__form" name={`${props.name}`}>
            <p className="popup__paragraph">{props.title}</p>
            {props.children}
            <input type="submit" className="popup__submit" value={props.buttonText} />
          </form>
          <button
            type="button"
            className="popup__close-btn"
            aria-label="закрыть окно"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );

}
export default PopupWithForm;