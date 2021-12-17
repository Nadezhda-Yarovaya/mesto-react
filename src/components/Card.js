import React from 'react';

const Card = (props) => {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Удалить место"
        className="elements__delete"
      ></button>
      <img className="elements__image-btn" src={props.card.cardLink} onClick={handleClick} />
      <div className="elements__title-container">
        <h2 className="elements__title">{props.card.cardTitle}</h2>
        <div className="elements__like-cont">
          <button
            type="button"
            className="elements__like"
            aria-label="Нравится"
          ></button>
          <p className="elements__likes-number">0</p>
        </div>
      </div>
    </>
  );
}

export default Card;