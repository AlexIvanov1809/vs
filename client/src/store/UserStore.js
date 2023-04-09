import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    // тут проглядывается неконсистентность данных. Сейчас система позволяет иметь в поле user какие-то данные,
    // при этом в isAuth будет false. Кажется, что isAuth должно быть вычисляемым полем на основании наличии
    // пользователя:
    // get isAuth() {
    //   return !!this._user;
    // }
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._isAuth = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
