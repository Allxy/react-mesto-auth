import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Api from "../utils/Api";
import { useUser } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useUser();

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    const handleEscKeyDown = (e) => {
      if (e.code === "Escape") closeAllPopups();
    };

    if (
      selectedCard ||
      isDeletePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isEditProfilePopupOpen
    )
      document.addEventListener("keydown", handleEscKeyDown);

    return () => {
      document.removeEventListener("keydown", handleEscKeyDown);
    };
  }, [
    selectedCard,
    isDeletePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isEditProfilePopupOpen,
  ]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <Main
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
        />
        <Footer />
      </div>

      <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
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

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
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

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
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
        <span
          className="popup__input-error"
          id="avatar-link-input-error"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isDeletePopupOpen}
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
      ></PopupWithForm>
    </>
  );
}

export default App;
