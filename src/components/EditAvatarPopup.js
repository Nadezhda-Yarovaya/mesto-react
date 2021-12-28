import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext, useRef } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const EditAvatarPopup = (props) => {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef= useRef('');
    //console.log('ref' + avatarRef);
    //console.log('current ' + avatarRef.current);
    
    function handleSubmit(e) {
              e.preventDefault();
              props.onEditButText('Сохранение...');     
      
        //console.log('av ref: ' + avatarRef.current.value);
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }
      
    return (        
        <PopupWithForm name="upd-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit}>
        <label className="popup__label">
          <section className="popup__section">
            <input
            ref={avatarRef}
           type="URL"
              className="popup__input popup__input_type_avatar"
              placeholder="URL"
              required
              name="avatarupdate"
              id="avatarupdateinput" autoComplete="off"
              minLength="2"
              maxLength="200"
            />
            <span className="popup__input-error avatarupdateinput-error">
            </span>
          </section>
        </label>
      </PopupWithForm>

    );
}

export default EditAvatarPopup;