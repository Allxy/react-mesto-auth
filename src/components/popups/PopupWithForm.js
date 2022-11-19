import { memo, useEffect, useRef, useState } from "react";
import Popup from "./Popup";

function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText = "Сохранить",
}) {
  const formRef = useRef();
  const [valid, setValid] = useState(true);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     setValid(formRef.current?.checkValidity());
  //   }
  // });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    onSubmit().finally(() => setLoading(false));
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className={`popup__form popup__form_type_${name}`}
          noValidate
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {children}
          <button
            type="submit"
            className={
              "popup__save-btn" + (valid ? "" : " popup__save-btn_disabled")
            }
            disabled={!valid || isLoading}
          >
            {isLoading ? "Сохранение" : buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
