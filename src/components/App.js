import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./popups/PopupWithForm";
import ImagePopup from "./popups/ImagePopup";
import CurrentUserProvider from "../contexts/CurrentUserContext";
import EditProfilePopup from "./popups/EditProfilePopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    <CurrentUserProvider>
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

      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
      />

      <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={isAddPlacePopupOpen} 
      />

      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
      />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isDeletePopupOpen}
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
      />
    </CurrentUserProvider>
  );
}

export default App;
