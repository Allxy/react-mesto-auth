import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen}) {
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
    >
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на аватар"
        type="url"
        name="link"
        required
        autoComplete="off"
        id="avatar-link-input"
        defaultValue=""
      />
      <span className="popup__input-error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
