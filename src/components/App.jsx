import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./popups/ImagePopup";
import { useUser } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./popups/EditProfilePopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import { authApi, dataApi } from "../utils/Api";
import PopupWithForm from "./popups/PopupWithForm";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Footer from "./Footer";
import Loader from "./Loader";
import InfoPopup from "./popups/InfoPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useUser();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isSuccesSignUp, setSuccessSignUp] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    handleCheckToken().finally(() => {
      setLoading(false);
    });

    dataApi
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoPopupOpen(false);
    setDeletedCard(null);
    setSelectedCard(null);
  }, []);

  const handleSignIn = useCallback(
    (data) => {
      return authApi
        .login(data)
        .then((data) => {
          localStorage.setItem("token", data.token);
          authApi.setToken("Bearer " + data.token);
          history.push("/");
          handleCheckToken();
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [history]
  );

  const handleSignUp = useCallback((values) => {
    return authApi
      .register(values)
      .then(
        ({ data }) => {
          setSuccessSignUp(true);
          history.push("/sign-in")
        },
        (err) => {
          setSuccessSignUp(false);
          console.log(err.message);
        }
      )
      .then(() => setInfoPopupOpen(true));
  }, []);

  const handleCheckToken = useCallback(() => {
    const token = localStorage.getItem("token");
    authApi.setToken("Bearer " + token);
    return authApi
      .check()
      .then(({ data }) => {
        setEmail(data.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setEmail("");
        authApi.removeToken();
        console.error(err.message);
      });
  }, []);

  const handleSignOut = useCallback((data) => {
    localStorage.removeItem("token");
    setEmail("");
  }, []);

  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);

      dataApi
        .setLikeStatus(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.error(err.message));
    },
    [cards, currentUser]
  );

  const handleCardDelete = useCallback(() => {
    return dataApi
      .removeCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        setDeletedCard(null);
      })
      .catch((err) => console.error(err.message));
  }, [deletedCard, cards]);

  const handleUpdateAvatar = useCallback(
    (data) => {
      return dataApi
        .setAvatar(data)
        .then((user) => {
          closeAllPopups();
          setCurrentUser(user);
        })
        .catch((err) => console.error(err.message));
    },
    [closeAllPopups, setCurrentUser]
  );

  const handleUpdateUser = useCallback(
    (data) => {
      return dataApi
        .patchUser(data)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopups();
        })
        .catch((err) => console.error(err.message));
    },
    [closeAllPopups, setCurrentUser]
  );

  const handleAddCard = useCallback(
    (data) => {
      return dataApi
        .addCard(data)
        .then((newCard) => {
          setCards((prev) => [newCard, ...prev]);
          closeAllPopups();
        })
        .catch((err) => console.error(err.message));
    },
    [closeAllPopups]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="wrapper">
        <Header email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            isLoggedIn={email}
            onEditProfile={() => setEditProfilePopupOpen(true)}
            onAddPlace={() => setAddPlacePopupOpen(true)}
            onEditAvatar={() => setEditAvatarPopupOpen(true)}
            onCardClick={(card) => setSelectedCard(card)}
            onCardLike={handleCardLike}
            onCardDelete={setDeletedCard}
            cards={cards}
            component={Main}
          />
          <Route path="/sign-up">
            <Register isLoggedIn={email} onSubmit={handleSignUp} />
          </Route>
          <Route path="/sign-in">
            <Login isLoggedIn={email} onSubmit={handleSignIn} />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>

      {email && <Footer />}

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onSubmit={handleUpdateUser}
      />

      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onSubmit={handleAddCard}
      />

      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onSubmit={handleUpdateAvatar}
      />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={deletedCard}
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onSubmit={handleCardDelete}
      />

      <InfoPopup
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        success={isSuccesSignUp}
      />
    </>
  );
}

export default App;
