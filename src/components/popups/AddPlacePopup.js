import { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Api from "../../utils/Api";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, cards, setCards }) {
  const [name, onChangeName, setName] = useInput("");
  const [link, onChangeLink, setLink] = useInput("");
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
    setName("");
    setLink("");
  }, [isOpen]);

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
        value={name}
        onChange={onChangeName}
      />
      <span className="popup__input-error" id="add-name-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
        autoComplete="off"
        id="add-link-input"
        value={link}
        onChange={onChangeLink}
      />
      <span className="popup__input-error" id="add-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
