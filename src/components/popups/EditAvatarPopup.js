import { memo, useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/CurrentUserContext";
import { useInput } from "../../hooks/useInput";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen }) {
  const [url, onChangeUrl, resetUrl, urlRef, urlError] = useInput("");
  const [, setCurrentUser] = useUser();
  const [isPending, setPending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    Api.setAvatar({ avatar: urlRef.current.value })
      .then((user) => {
        onClose();
        setCurrentUser(user);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setPending(false));
  }

  useEffect(() => {
    if (isOpen) {
      resetUrl("");
    }
  }, [isOpen]);

  const inputErrorClass = (error) =>
    "popup__input-error" + (error ? " popup__input-error_active" : "");

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      buttonText={isPending ? "Сохранение" : "Сохранить"}
    >
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на аватар"
        type="url"
        name="link"
        required
        autoComplete="off"
        id="avatar-link-input"
        ref={urlRef}
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
