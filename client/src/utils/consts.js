export const ADMIN_ROUTE = "/admin";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const SHOP_ROUTE = "/";
export const BASKET_ROUTE = "/basket";
export const ITEM_ROUTE = "/admin/item/:id";
export const ENTITY_TYPES = [
  {
    id: 1,
    endpoint: "Type",
    label: "Типы",
    getter: "types",
    setter: "setTypes",
    filter: "typeId",
    setSelected: "setSelectedType",
  },
  {
    id: 2,
    endpoint: "Brand",
    label: "Бренды",
    getter: "brands",
    setter: "setBrands",
    filter: "brandId",
    setSelected: "setSelectedBrand",
  },
  {
    id: 3,
    endpoint: "Country",
    label: "Страны",
    getter: "countries",
    setter: "setCountries",
    filter: "countryId",
    setSelected: "setSelectedCountry",
  },
  {
    id: 4,
    endpoint: "MakingMethod",
    label: "Методы приготовления",
    getter: "makingMethods",
    setter: "setMakingMethods",
    filter: "makingMethodId",
    setSelected: "setSelectedMakingMethod",
  },
  {
    id: 5,
    endpoint: "ManufacturingMethod",
    label: "Особенности кофе",
    getter: "manufacturingMethods",
    setter: "setManufacturingMethods",
    filter: "manufacturingMethodId",
    setSelected: "setSelectedManufacturingMethod",
  },
  {
    id: 6,
    endpoint: "TeaType",
    label: "Виды чая",
    getter: "teaTypes",
    setter: "setTeaTypes",
    filter: "teaTypeId",
    setSelected: "setSelectedTeaType",
  },
  {
    id: 7,
    endpoint: "PackageType",
    label: "Виды упаковки",
    getter: "packageTypes",
    setter: "setPackageTypes",
    filter: "packageTypeId",
    setSelected: "setSelectedPackageType",
  },
];
export const ADMIN_ITEM_FIELDS = [
  { id: 1, name: "Вид товара", type: "type" },
  { id: 2, name: "Бренд", type: "brand" },
  { id: 3, name: "Страна", type: "country" },
  { id: 4, name: "Сорт или название", type: "sortName" },
  { id: 5, name: "Метод приготовления", type: "making_method" },
  { id: 6, name: "Метод производства", type: "manufacturing_method" },
  { id: 7, name: "Тип чая", type: "tea_type" },
  { id: 8, name: "Активный", type: "active" },
];

export const BEANS = [
  { id: "0", name: "для чашки" },
  { id: "1", name: "для фильтра" },
  { id: "2", name: "для эспрессо" },
];

export const DEFAULT = {
  acidity: "",
  density: "",
  sortName: "",
  shortDescription: "",
  description: "",
  brandId: "",
  package: "",
  typeId: "",
  countryId: "",
  makingMethodId: "",
  manufacturingMethodId: "",
  teaTypeId: "",
  packageTypeId: "",
  active: true,
};

export const LEVEL = [
  { id: "0", name: 0 },
  { id: "1", name: 1 },
  { id: "2", name: 2 },
  { id: "3", name: 3 },
  { id: "4", name: 4 },
  { id: "5", name: 5 },
  { id: "6", name: 6 },
  { id: "7", name: 7 },
  { id: "8", name: 8 },
  { id: "9", name: 9 },
  { id: "10", name: 10 },
];

export const WEIGHT = [
  { id: "шт", name: "шт" },
  { id: "50 г", name: "50 г" },
  { id: "100 г", name: "100 г" },
  { id: "125 г", name: "125 г" },
  { id: "150 г", name: "150 г" },
  { id: "250 г", name: "250 г" },
  { id: "500 г", name: "500 г" },
  { id: "1000 г", name: "1000 г" },
  { id: "0.25 л", name: "0.25 л" },
  { id: "0.5 л", name: "0.5 л" },
  { id: "1 л", name: "1 л" },
];

export const VALIDATOR_CONFIG = {
  brandId: {
    isRequired: { message: "Поле необходимое для заполнения" },
  },
  typeId: {
    isRequired: { message: "Поле необходимое для заполнения" },
  },
  sortName: {
    isRequired: { message: "Поле необходимое для заполнения" },
  },
  shortDescription: {
    isRequired: { message: "Поле необходимое для заполнения" },
  },
};
