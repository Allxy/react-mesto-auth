class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
    if (options?.headers?.authorization) {
      this.setToken(options?.headers?.authorization);
    }
  }

  setToken(token) {
    if (!this._options.headers) this._options.headers = {};
    this._options.headers.authorization = token;
  }

  removeToken() {
    if(this._options?.headers?.authorization) {
      delete this._options?.headers?.authorization
    }
  }

  async _fetch(path, method = "GET", body) {
    const opt = { ...this._options, method };
    if (body)
      if (typeof body === "string") opt.body = body;
      else opt.body = JSON.stringify(body);

    const response = await fetch(this._baseUrl + path, opt);
    const json = await response.json();

    if (response.ok) return json;

    throw new Error(json.message);
  }
}

class DataApi extends Api {
  constructor() {
    super({
      baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52/",
      headers: {
        authorization: "47016496-8e67-44e3-804c-b828c4f61e69",
        "Content-Type": "application/json",
      },
    });
  }

  getUser() {
    return this._fetch("users/me");
  }

  patchUser(data) {
    return this._fetch("users/me", "PATCH", data);
  }

  setAvatar(data) {
    return this._fetch("users/me/avatar", "PATCH", data);
  }

  addCard(data) {
    return this._fetch("cards", "POST", data);
  }

  removeCard(id) {
    return this._fetch("cards/" + id, "DELETE");
  }

  getCards() {
    return this._fetch("cards");
  }

  setLikeStatus(cardId, status) {
    if (status) return this._fetch("cards/" + cardId + "/likes", "PUT");
    return this._fetch("cards/" + cardId + "/likes", "DELETE");
  }
}

class AuthApi extends Api {
  constructor() {
    super({
      baseUrl: "https://auth.nomoreparties.co",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  check() {
    return this._fetch("/users/me", "GET");
  }

  login(data) {
    return this._fetch("/signin", "POST", data);
  }

  register(data) {
    return this._fetch("/signup", "POST", data);
  }
}

export const dataApi = new DataApi();
export const authApi = new AuthApi();
