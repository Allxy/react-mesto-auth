import { useCallback, useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./popups/ImagePopup";
import { useUser } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./popups/EditProfilePopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import Api from "../utils/Api";
import ConfirmPopup from "./popups/ConfirmPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
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

  const handleCardDelete = useCallback(()=> {
    return Api.removeCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        setDeletedCard(null)
      })
      .catch((err) => console.error(err.message));
  }, [])

  useEffect(() => {
    Api.getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const closeAllPopups = useCallback(()=> {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletedCard(null);
    setSelectedCard(null);
  }, [])

  useEffect(() => {
    const handleEscKeyDown = (e) => {
      if (e.code === "Escape") closeAllPopups();
    };

    if (
      selectedCard ||
      deletedCard ||
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
    deletedCard,
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
          onCardDelete={setDeletedCard}
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

      <ConfirmPopup
        onClose={closeAllPopups}
        onConfirm={handleCardDelete}
        isOpen={deletedCard}
      />
    </>
  );
}

export default App;
