function App() {
  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div className="header__logo"></div>
        </header>
        <main className="content">
          <section className="profile">
            <div className="profile__avatar">
              <img className="profile__avatar-image" src="." alt="Аватар" />
            </div>
            <div className="profile__info">
              <h1 className="profile__name"></h1>
              <button type="button" className="profile__edit-btn"></button>
              <p className="profile__about"></p>
            </div>
            <button type="button" className="profile__add-btn"></button>
          </section>
          <section aria-label="Места" className="places"></section>
        </main>
        <footer className="footer">
          <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
        </footer>
      </div>

      <div className="popup popup-edit">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-btn"
            title="Закрыть"
          ></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form
            name="edit"
            className="popup__form popup__form_type_edit"
            noValidate
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
            <button type="submit" className="popup__save-btn">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup-addcard">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-btn"
            title="Закрыть"
          ></button>
          <h2 className="popup__title">Новое место</h2>
          <form name="add" className="popup__form popup__form_type_add" noValidate>
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
            <button type="submit" className="popup__save-btn">
              Создать
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_dark popup-image">
        <div className="popup__image-view">
          <button
            type="button"
            className="popup__close-btn"
            title="Закрыть"
          ></button>
          <img className="popup__image" src="." alt="Попап картинки" />
          <p className="popup__img-caption"></p>
        </div>
      </div>

      <div className="popup popup-delete">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-btn"
            title="Закрыть"
          ></button>
          <h2 className="popup__title popup__title_short">Вы уверены?</h2>
          <button type="button" className="popup__save-btn">
            Да
          </button>
        </div>
      </div>

      <div className="popup popup-avatar">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-btn"
            title="Закрыть"
          ></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form
            name="add"
            className="popup__form popup__form_type_avatar"
            noValidate
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
            <button type="submit" className="popup__save-btn">
              Создать
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
