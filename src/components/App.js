import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import { useState } from 'react';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, editProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, addPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopup] = useState(false);
  const [isPopupImageOpen, openPopupImage] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openPopupImage(true);
  };

  const closeAllPopups = () => {
    editProfilePopup(false);
    editAvatarPopup(false);
    addPlacePopup(false);
    openPopupImage(false);
  };

  const handleEditProfileClick = () => {
    editProfilePopup(true);
  };
  const handleEditAvatarClick = () => {
    editAvatarPopup(true);
  };
  const handleAddPlaceClick = () => {
    addPlacePopup(true);
  };

  return (
    <>
      <div className="App">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClickMain={handleCardClick} />
          <Footer />
          <ImagePopup card={selectedCard} isOpen={isPopupImageOpen} onClose={closeAllPopups} />
          <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>

            <label className="popup__label">
              <section className="popup__section">
                <input
                  type="text"
                  className="popup__input popup__input_type_name"
                  placeholder="ФИО"
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
                  required
                  minLength="2"
                  maxLength="200"
                  id="job-input"
                  autoComplete="off"
                />
                <span className="popup__input-error job-input-error"></span>
              </section>
            </label>
            <input type="submit" className="popup__submit" value="Сохранить" />
          </PopupWithForm>

          <PopupWithForm name="new-place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >

            <label className="popup__label">
              <section className="popup__section">
                <input
                  type="text"
                  className="popup__input popup__input_type_place"
                  placeholder="Название Места"
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
                  required
                  name="link"
                  id="url-input"
                  autoComplete="off"
                />
                <span className="popup__input-error url-input-error"></span>
              </section>
              <input type="submit" className="popup__submit" value="Создать" />
            </label>
            <button
              type="button"
              className="popup__close-btn"
              aria-label="закрыть окно"
            ></button>
          </PopupWithForm>

          <PopupWithForm name="type_delete" title="Вы уверены?">
            <label className="popup__label">
              <input type="submit" className="popup__submit" value="Да" />
            </label>
            <button
              type="button"
              className="popup__close-btn popup__close-img"
              aria-label="закрыть окно"
            ></button>
          </PopupWithForm>

          <PopupWithForm name="upd-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <label className="popup__label">
              <section className="popup__section">
                <input
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
              <input type="submit" className="popup__submit" value="Сохранить" />
            </label>
            <button
              type="button"
              className="popup__close-btn popup__close-img"
              aria-label="закрыть окно"
            ></button>
          </PopupWithForm>

        </div>
      </div>
    </>
  );
}

export default App;
