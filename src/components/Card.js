function Card({card, onCardClick}) {
  return (
    <article className="place">
      <img alt={card.name} src={card.link} className="place__img" onClick={() => onCardClick(card)} />
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like">
          <button type="button" className="place__like-btn"></button>
          <div className="place__like-count">{card.likes.length}</div>
        </div>
      </div>
      <button type="button" className="place__trash-btn"></button>
    </article>
  );
}

export default Card;
