
import avatar from '../images/avatar.png';
import editImg from '../images/edit-avatar.svg';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

const Main = (props) => {
  const [userName, setUsername] = useState('Жак-ив-Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState([avatar]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    handleRequest();
    renderCards();
  }, []);

  function setProfileInfo(profileData) {
    setUsername(profileData.name);
    setUserDescription(profileData.job);
    setUserAvatar(profileData.avatar);
  }

  function handleRequest() {
    api.getProfileInfo()
      .then((data) => {
        const resultProfileData = {
          id: data._id,
          name: data.name,
          job: data.about,
          avatar: data.avatar
        };

        setProfileInfo(resultProfileData);
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
      });
  }

  function renderCards() {
    api.getInitialCards()
      .then((data) => {
        const resultCards = data.map(card => {
          return {
            cardId: card._id,
            likes: card.likes,
            cardTitle: card.name,
            cardLink: card.link
          };
        });
        setCards(resultCards);
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
      });
  }
  return (
    <main className="main page__main">
      <section className="profile main__profile-section">
        <div className="profile__avatar-cont">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <div className="profile__av-overlay" onClick={props.onEditAvatar}>
            <img className="profile__av-overlay-edit-pic" src={editImg} alt="изменить аватар" />
          </div>
        </div>

        <div className="profile__personal-data">
          <div className="profile__name-containter">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-btn"
              aria-label="редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          aria-label="добавить место"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements main__elements-section">
        <ul className="elements__list">{cards.map((card) => (
          <li className="elements__element" key={card.cardId}>
            <Card
              card={card}
              onCardClick={props.onCardClickMain}
            />
          </li>
        )
        )
        }</ul>
      </section>
    </main>
  );

}
export default Main;