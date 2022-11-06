import { useEffect, useState } from "react";
import Api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([Api.getUser(), Api.getCards()]).then(([user, cards]) => {
      setUserName(user.name);
      setUserAbout(user.about);
      setUserAvatar(user.avatar);
      setCards(cards);
    }).catch((err)=>console.error(err.message));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar-image"
            src={userAvatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            type="button"
            className="profile__edit-btn"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">{userAbout}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section aria-label="Места" className="places">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
