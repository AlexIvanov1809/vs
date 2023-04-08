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

      // prod.id === id - ненужное условие, которое проверено уже выше: if (prod.id !== id) return prod;
      if (prod.quantity > 1) {
        prod.quantity -= 1;
        return prod;
      }

      // Верхнее условие покрывает все значения от 2 и выше,
      // остаются только единица, ноль и отрицательные значения. Почему продукт с единицей в quantity не возвращается из map?
      // а продукты с отрицательным quantity - остаются
      if (prod.quantity !== 1) return prod;

      // если идея была зафиксировать результат между 2 и N, то это можно записать одной строкой без условий:
      // prod.quantity = Math.min(2, prod.quantity - 1);
    });

    // не очень хороший фильтр, т.к. непонятно, почему в массиве появились дырки
    this._basket = data.filter((i) => i);
  }

  get order() {
    return this._basket;
  }
}
