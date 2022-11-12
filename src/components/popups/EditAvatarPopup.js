import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/CurrentUserContext";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen }) {
  const urlRef = useRef(null);
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
    if (urlRef.current) {
      urlRef.current.value = "";
    }
  }, [isOpen]);

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
      />
      <span className="popup__input-error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
