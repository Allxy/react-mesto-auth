import { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, setCards }) {
  const [name, onChangeName, resetName, nameRef, nameError] = useInput("");
  const [link, onChangeLink, resetLink, linkRef, linkError] = useInput("");
  const [isPending, setPending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    Api.addCard({ name, link })
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        onClose();
      })
      .catch((err) => console.error(err.message))
      .finally(() => setPending(false));
  }

  useEffect(() => {
    if (isOpen) {
      resetName("");
      resetLink("");
    }
  }, [isOpen]);

  const inputErrorClass = (error) =>
    "popup__input-error" + (error ? " popup__input-error_active" : "");

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="addcard"
      title="Новое место"
      onSubmit={handleSubmit}
      buttonText={isPending ? "Сохранение" : "Сохранить"}
    >
      <input
        className="popup__input popup__input_type_name"
        placeholder="Название"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
        id="add-name-input"
        ref={nameRef}
        value={name}
        onChange={onChangeName}
      />
      <span
        className={inputErrorClass(nameError)}
        id="add-name-input-error"
      >
        {nameError}
      </span>
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
        autoComplete="off"
        id="add-link-input"
        ref={linkRef}
        value={link}
        onChange={onChangeLink}
      />
      <span
        className={inputErrorClass(linkError)}
        id="add-link-input-error"
      >
        {linkError}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
