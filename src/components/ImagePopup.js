import { useRef } from "react";

function ImagePopup({ card, onClose }) {
  const closeButtonRef = useRef();

  function handleOverlayOrCloseClick(e) {
    if (e.target === e.currentTarget || e.target === closeButtonRef.current) {
      onClose();
    }
  }

  return (
    <div
      className={"popup popup_dark popup-image"  + (card ? " popup_opened" : "")}
      onClick={handleOverlayOrCloseClick}
    >
      <div className="popup__image-view">
        <button
          type="button"
          className="popup__close-btn"
          title="Закрыть"
          ref={closeButtonRef}
        ></button>
        <img className="popup__image" src={card?.link} alt="Попап картинки" />
        <p className="popup__img-caption">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
