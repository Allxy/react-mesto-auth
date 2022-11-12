import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen }) {
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="edit"
      title="Редактировать профиль"
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
        defaultValue=""
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
        defaultValue=""
      />
      <span className="popup__input-error" id="edit-about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
