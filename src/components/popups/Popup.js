import { useRef } from "react";

function Popup({ children, name, isOpen, onClose }) {
  const closeButtonRef = useRef();

  function handleOverlayOrCloseClick(e) {
    if (e.target === e.currentTarget || e.target === closeButtonRef.current) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name}` + (isOpen ? " popup_opened" : "")}
      onClick={handleOverlayOrCloseClick}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-btn"
          title="Закрыть"
          ref={closeButtonRef}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
