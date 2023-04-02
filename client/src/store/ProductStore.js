import { makeAutoObservable, runInAction } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._countries = [];
    this._makingMethods = [];
    this._manufacturingMethods = [];
    this._teaTypes = [];
    this._packageTypes = [];

    this._products = [];
    this._selectedType = 1;
    this._selectedBrand = {};
    this._selectedCountry = {};
    this._selectedMakingMethod = {};
    this._selectedManufacturingMethod = {};
    this._selectedTeaType = {};
    this._selectedPackageType = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 9;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setCountries(countries) {
    this._countries = countries;
  }

  setMakingMethods(makingMethods) {
    this._makingMethods = makingMethods;
  }

  setManufacturingMethods(manufacturingMethods) {
    this._manufacturingMethods = manufacturingMethods;
  }

  setTeaTypes(teaTypes) {
    this._teaTypes = teaTypes;
  }

  setPackageTypes(packageTypes) {
    this._packageTypes = packageTypes;
  }

  setProducts(products) {
    this._products = products;
  }
  setPage(page) {
    runInAction(() => {
      this._page = page;
    });
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }

  setSelectedCountry(country) {
    this._selectedCountry = country;
  }

  setSelectedMakingMethod(makingMethod) {
    this._selectedMakingMethod = makingMethod;
  }

  setSelectedManufacturingMethod(manufacturingMethod) {
    this._selectedManufacturingMethod = manufacturingMethod;
  }

  setSelectedTeaType(teaType) {
    this._selectedTeaType = teaType;
  }

  setSelectedPackageType(packageType) {
    this._selectedPackageType = packageType;
  }

  productSorting(type, sort) {
    if (sort === "asc") {
      return this._products.sort((a, b) => {
        if (typeof a[type] === "object") {
          return (a[type]?.name ? a[type].name : "").localeCompare(
            b[type]?.name ? b[type].name : "",
          );
        } else {
          if (typeof a[type] === "string")
            return a[type].localeCompare(b[type]);
          if (typeof a[type] === "boolean") return a[type] - b[type];
        }
      });
    } else {
      return this._products.sort((a, b) => {
        if (typeof a[type] === "object") {
          return (b[type]?.name ? b[type].name : "").localeCompare(
            a[type]?.name ? a[type].name : "",
          );
        } else {
          if (typeof a[type] === "string")
            return b[type].localeCompare(a[type]);
          if (typeof a[type] === "boolean") return b[type] - a[type];
        }
      });
    }
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get countries() {
    return this._countries;
  }

  get makingMethods() {
    return this._makingMethods;
  }

  get manufacturingMethods() {
    return this._manufacturingMethods;
  }

  get teaTypes() {
    return this._teaTypes;
  }

  get packageTypes() {
    return this._packageTypes;
  }

  get products() {
    return this._products;
  }

  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
  get totalCount() {
    return this._totalCount;
  }
  get selectedType() {
    this.setPage(1);
    return this._selectedType;
  }

  get selectedBrand() {
    this.setPage(1);
    return this._selectedBrand;
  }

  get selectedCountry() {
    this.setPage(1);
    return this._selectedCountry;
  }

  get selectedMakingMethod() {
    this.setPage(1);
    return this._selectedMakingMethod;
  }

  get selectedManufacturingMethod() {
    this.setPage(1);
    return this._selectedManufacturingMethod;
  }

  get selectedTeaType() {
    this.setPage(1);
    return this._selectedTeaType;
  }

  get selectedPackageType() {
    this.setPage(1);
    return this._selectedPackageType;
  }
}
