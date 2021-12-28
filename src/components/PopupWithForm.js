import React from 'react';
import validationConfig from '../utils/utils.js';
import FormValidator from '../utils/validation.js';

const PopupWithForm = (props) => {

    /*validations*/
/*const validation = new FormValidator(validationConfig, props.name);
validation.enableValidation();*/

  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen && ('popup_opened')}`}>
        <div className="popup__container">
          <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
            <p className="popup__paragraph">{props.title}</p>
            {props.children}
            <input type="submit" className="popup__submit" value={props.saveButton} />
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