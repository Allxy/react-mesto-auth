import { memo, useEffect, useState } from "react";
import { useUser } from "../../contexts/CurrentUserContext";
import { useInput } from "../../hooks/useInput";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen }) {
  const [name, onChangeName, resetName, nameRef, nameError] = useInput("");
  const [about, onChangeAbout, resetAbout, aboutRef, aboutError] = useInput("");
  const [currentUser, setCurrentUser] = useUser();

  useEffect(() => {
    if (isOpen) {
      resetName(currentUser.name);
      resetAbout(currentUser.about);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    return Api.patchUser({ name, about })
      .then((user) => {
        setCurrentUser(user);
        onClose();
      })
      .catch((err) => console.error(err.message));
  }

  const inputErrorClass = (error) =>
    "popup__input-error" + (error ? " popup__input-error_active" : "");

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        id="edit-name-input"
        ref={nameRef}
        value={name}
        onChange={onChangeName}
      />
      <span className={inputErrorClass(nameError)} id="edit-name-input-error">
        {nameError}
      </span>
      <input
        className="popup__input popup__input_type_about"
        placeholder="О себе"
        type="text"
        name="about"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
        id="edit-about-input"
        ref={aboutRef}
        value={about}
        onChange={onChangeAbout}
      />
      <span className={inputErrorClass(aboutError)} id="edit-about-input-error">
        {aboutError}
      </span>
    </PopupWithForm>
  );
}

export default memo(EditProfilePopup);
