function Card({card, onCardClick}) {
  return (
    <article class="place">
      <img alt={card.name} src={card.link} class="place__img" onClick={() => onCardClick(card)} />
      <div class="place__info">
        <h2 class="place__title">{card.name}</h2>
        <div class="place__like">
          <button type="button" class="place__like-btn"></button>
          <div class="place__like-count">{card.likes.length}</div>
        </div>
      </div>
      <button type="button" class="place__trash-btn"></button>
    </article>
  );
}

export default Card;
