import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext, useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const AddPlacePopup = (props) => {
    const placeNameRef= useRef('');
    const placeLinkRef= useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onEditButText('Создание...');  
        props.onAddNewPlace(placeNameRef.current.value, placeLinkRef.current.value);

    }

    return (
        <PopupWithForm name="new-place" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit}>

            <label className="popup__label">
                <section className="popup__section">
                    <input
                        type="text"
                        className="popup__input popup__input_type_place"
                        placeholder="Название Места"
                        ref={placeNameRef}
                        required
                        name="name"
                        id="newplace-input"
                        autoComplete="off"
                        minLength="2"
                        maxLength="30"
                    />
                    <span className="popup__input-error newplace-input-error"></span>
                </section>
                <section className="popup__section">
                    <input
                        type="url"
                        className="popup__input popup__input_type_link"
                        placeholder="Ссылка на картинку"
                        ref={placeLinkRef}
                        required
                        name="link"
                        id="url-input"
                        autoComplete="off"
                    />
                    <span className="popup__input-error url-input-error"></span>
                </section>
            </label>
        </PopupWithForm>

    );
}
export default AddPlacePopup;
