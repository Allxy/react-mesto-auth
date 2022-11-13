import { memo, useEffect, useRef, useState } from "react";

function ImagePopup({ card, onClose }) {
  const closeButtonRef = useRef();
  const [lastCard, setLastCard] = useState(null)

  useEffect(()=> {
    if(card)
      setLastCard(card)
  }, [card])

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
        <img className="popup__image" src={lastCard?.link} alt={lastCard?.name} />
        <p className="popup__img-caption">{lastCard?.name}</p>
      </div>
    </div>
  );
}

export default memo(ImagePopup);
