import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._basket = [];
    makeAutoObservable(this);
  }

  setOrder(products) {
    this._basket = products;
  }

  setIncrementQty(id) {
    const data = this._basket.map((prod) => {
      if (prod.id === id) {
        prod.quantity += 1;
      }
      return prod;
    });
    this._basket = data;
  }
  setDecrementQty(id) {
    const data = this._basket.map((prod) => {
      if (prod.id !== id) return prod;

      if (prod.id === id && prod.quantity > 1) {
        prod.quantity -= 1;
        return prod;
      } else if (prod.quantity !== 1) return prod;
    });

    this._basket = data.filter((i) => i);
  }

  get order() {
    return this._basket;
  }
}
