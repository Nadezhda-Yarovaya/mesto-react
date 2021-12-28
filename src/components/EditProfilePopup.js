import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const EditProfilePopup = (props) => {
    const currentUser = useContext(CurrentUserContext);
    //console.log('all users: ' + Object.entries(currentUser));
    //Внутри EditProfilePopup добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми. 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function changeName(e) {
        setName(e.target.value);
    }
    
    function changeDesc(e) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.job);
      }, [currentUser]); 


      function handleSubmit(e) {
        e.preventDefault();
        props.onEditButText('Сохранение...');        
        props.onUpdateUser({
          name,
          job: description,
        });
      }

  return (
      <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit}>
<label className="popup__label">
  <section className="popup__section">
    <input
      type="text"
      className="popup__input popup__input_type_name"
      placeholder="ФИО"
      value={name || ''}
      onChange={changeName}
      name="profileName"
      required
      minLength="5"
      maxLength="40"
      id="name-input"
      autoComplete="off"
    />
    <span className="popup__input-error name-input-error"></span>
  </section>

  <section className="popup__section">
    <input
      type="text"
      className="popup__input popup__input_type_job"
      placeholder="должность"
      name="job"
      value={description || ''}
      onChange={changeDesc}
      required
      minLength="2"
      maxLength="200"
      id="job-input"
      autoComplete="off"
    />
    <span className="popup__input-error job-input-error"></span>
  </section>
</label>

</PopupWithForm>
  );
}
export default EditProfilePopup;