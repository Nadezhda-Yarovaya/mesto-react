const ImagePopup = (props) => {
  return (
    <>
      <div className={`popup popup_type_image ${props.isOpen && ('popup_opened')}`}>
        <div className="popup__image-container">
          <img className="popup__image" src={props.card.cardLink} alt="пример изображения" />
          <p className="popup__img-paragraph"></p>
          <button
            type="button"
            className="popup__close-btn popup__close-img"
            aria-label="закрыть окно"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}
export default ImagePopup;