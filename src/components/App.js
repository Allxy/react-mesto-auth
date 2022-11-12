import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./popups/PopupWithForm";
import ImagePopup from "./popups/ImagePopup";
import CurrentUserProvider, { useUser } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./popups/EditProfilePopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import Api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser] = useUser();

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.setLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error(err.message));
  }

  function handleCardDelete(card) {
    Api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.error(err.message));
  }

  useEffect(() => {
    Api.getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.error(err.message));
  }, []);

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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
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
        setCards={setCards}
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
    </>
  );
}

export default App;
