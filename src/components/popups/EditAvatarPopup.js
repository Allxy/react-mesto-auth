import { memo, useEffect } from "react";
import { useUser } from "../../contexts/CurrentUserContext";
import { useInput } from "../../hooks/useInput";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen }) {
  const [url, urlError, onChangeUrl, resetUrl] = useInput("");
  const [, setCurrentUser] = useUser();

  useEffect(() => {
    if (isOpen) {
      resetUrl();
    }
  }, [isOpen, resetUrl]);

  function handleSubmit() {
    return Api.setAvatar({ avatar: url })
      .then((user) => {
        onClose();
        setCurrentUser(user);
      })
      .catch((err) => console.error(err.message));
  }

  const inputErrorClass = (error) =>
    "popup__input-error" + (error ? " popup__input-error_active" : "");

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на аватар"
        type="url"
        name="link"
        required
        autoComplete="off"
        id="avatar-link-input"
        value={url}
        onChange={onChangeUrl}
      />
      <span className={inputErrorClass(urlError)} id="avatar-link-input-error">
        {urlError}
      </span>
    </PopupWithForm>
  );
}

export default memo(EditAvatarPopup);
