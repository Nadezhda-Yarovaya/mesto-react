import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
 /* console.log('card owner: ' + props.card.owner._id);
  console.log('currentUser same : ' + currentUser.id);*/
  
  const isOwn = props.card.owner._id === currentUser.id;
  //console.log('isOwn: ' + isOwn);
  const cardDeleteButtonClassName = (
    `elements__delete ${!isOwn && 'elements__delete_hidden'}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser.id);
  const cardLikeButtonClassName = (
    `elements__like ${isLiked && ' elements__like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Удалить место"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img className="elements__image-btn" src={props.card.link} onClick={handleClick} alt={props.card.name} />
      <div className="elements__title-container">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like-cont">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__likes-number">{props.card.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;