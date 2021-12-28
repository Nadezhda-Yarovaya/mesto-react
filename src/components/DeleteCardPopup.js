import React from 'react';
import api from '../utils/api.js';
import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
const DeleteCardPopup = (props) => {

    function handleSubmit(e) {
        e.preventDefault();
      props.onEditButText('Удаление...');  
      props.onDeletePopup(props.currentCard); 
    }

    return (

        <PopupWithForm name="_delete" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit}>   
 <label className="popup__label">
 </label>
</PopupWithForm>
    );
}

export default DeleteCardPopup;