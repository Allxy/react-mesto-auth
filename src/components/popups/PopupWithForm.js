import { useRef } from "react";

function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  buttonText = "Сохранить",
}) {
  const closeButtonRef = useRef();

  function handleOverlayOrCloseClick(e) {
    if (e.target === e.currentTarget || e.target === closeButtonRef.current) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup-${name}` + (isOpen ? " popup_opened" : "")}
      onClick={handleOverlayOrCloseClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          title="Закрыть"
          ref={closeButtonRef}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className={`popup__form popup__form_type_${name}`}
          noValidate
        >
          {children}
          <button type="submit" className="popup__save-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
