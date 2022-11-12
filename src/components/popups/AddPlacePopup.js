import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen}) {
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="addcard"
      title="Новое место"
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
        defaultValue=""
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
        defaultValue=""
      />
      <span className="popup__input-error" id="add-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
