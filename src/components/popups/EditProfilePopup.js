import { useEffect, useState } from "react";
import { useUser } from "../../contexts/CurrentUserContext";
import { useInput } from "../../hooks/useInput";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen }) {
  const [name, onChangeName, setName] = useInput("");
  const [about, onChangeAbout, setAbout] = useInput("");
  const [currentUser, setCurrentUser] = useUser();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    console.log(currentUser);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    Api.patchUser({ name, about })
      .then((user) => {
        setCurrentUser(user);
        onClose();
      })
      .catch((err) => console.error(err.message))
      .finally(() => setPending(false));
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      buttonText={isPending ? "Сохранение" : "Сохранить"}
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
        value={name}
        onChange={onChangeName}
      />
      <span className="popup__input-error" id="edit-name-input-error"></span>
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
        value={about}
        onChange={onChangeAbout}
      />
      <span className="popup__input-error" id="edit-about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
