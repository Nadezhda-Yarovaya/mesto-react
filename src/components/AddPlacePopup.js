import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useRef } from 'react';

const AddPlacePopup = (props) => {
    const [inputValidName, setInputValidName] = useState(false);
    const [inputValidLink, setInputValidLink] = useState(false);
    const [validMessageName, setValidMessageName] = useState('');
    const [validMessageLink, setValidMessageLink] = useState('');
    const [inputNameClass, setInputNameClass] = useState('popup__input popup__input_type_place');
    const [inputLinkClass, setInputLinkClass] = useState('popup__input popup__input_type_link');    
    const placeNameRef = useRef('');
    const placeLinkRef = useRef('');

    function checkValidityName() {
        const isValid = placeNameRef.current.validity.valid;
        setInputValidName(isValid);
        setValidMessageName(placeNameRef.current.validationMessage);
        setClassName(isValid);
    }

    function checkValidityLink() {
        const isValid = placeLinkRef.current.validity.valid;
        setInputValidLink(isValid);
        setValidMessageLink(placeLinkRef.current.validationMessage);
        setClassLink(isValid);
    }

    function setClassName(isValid) {
        const validityClassNameOnName = (
            `popup__input popup__input_type_place ${!isValid && 'popup__input_state_invalid'}`
        );
        setInputNameClass(validityClassNameOnName);
    }

    function setClassLink(isValid) {
        const validityClassNameOnLink = (
            `popup__input popup__input_type_link ${!isValid && 'popup__input_state_invalid'}`
        );
        setInputLinkClass(validityClassNameOnLink);
    }

    const formValidity = (
        inputValidName && inputValidLink
    );

    function handleSubmit(e) {
        e.preventDefault();
        props.onEditButText('Создание...');
        props.onAddNewPlace(placeNameRef.current.value, placeLinkRef.current.value);
        placeNameRef.current.value = '';
        placeLinkRef.current.value = '';
    }

    return (
        <PopupWithForm name="new-place" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit}
            validOrNotForm={formValidity}>

            <label className="popup__label">
                <section className="popup__section">
                    <input
                        type="text"
                        className={inputNameClass}
                        placeholder="Название Места"
                        ref={placeNameRef}
                        onInput={checkValidityName}
                        required
                        name="name"
                        id="newplace-input"
                        autoComplete="off"
                        minLength="2"
                        maxLength="30"
                    />
                    <span className="popup__input-error newplace-input-error">{validMessageName}</span>
                </section>
                <section className="popup__section">
                    <input
                        type="url"
                        className={inputLinkClass}
                        placeholder="Ссылка на картинку"
                        ref={placeLinkRef}
                        onInput={checkValidityLink}
                        required
                        name="link"
                        id="url-input"
                        autoComplete="off"
                    />
                    <span className="popup__input-error url-input-error">{validMessageLink}</span>
                </section>
            </label>
        </PopupWithForm>

    );
}
export default AddPlacePopup;
