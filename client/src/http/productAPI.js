import { $authHost, $host } from "./index";

const TYPES_ENDPOINT = "api/v1/productTypes";
const PRODUCT_ENDPOINT = "api/v1/product";
const PIC_ENDPOINT = "api/v1/pictures";
const PRICE_ENDPOINT = "api/v1/price";

const httpService = {
  async createEntityItem(type, payload) {
    const { data } = await $authHost.post(`${TYPES_ENDPOINT}/${type}`, payload);

    return data;
  },

  async editEntityItem(type, id, payload) {
    const { data } = await $authHost.patch(
      `${TYPES_ENDPOINT}/${type}/${id}`,
      payload,
    );

    return data;
  },

  async removeEntityItem(type, id) {
    const { data } = await $authHost.delete(`${TYPES_ENDPOINT}/${type}/${id}`);

    return data;
  },

  async fetchEntityFilterItems(type, typeId) {
    const { data } = await $host.get(
      `${TYPES_ENDPOINT}/${type}/filter/${typeId}`,
    );

    return data;
  },

  async fetchEntityItems(type) {
    const { data } = await $host.get(`${TYPES_ENDPOINT}/${type}`);

    return data;
  },

  async createProduct(payload) {
    const { data } = await $authHost.post(PRODUCT_ENDPOINT, payload);

    return data;
  },
  async editProduct(payload) {
    const { data } = await $authHost.patch(
      `${PRODUCT_ENDPOINT}/${payload.id}`,
      payload,
    );

    return data;
  },

  async removeProduct(id) {
    const { data } = await $authHost.delete(`${PRODUCT_ENDPOINT}/${id}`);

    return data;
  },

  // если функция принимает много параметров, то стоит обернуть из в объект, иначе не понятен порядок передачи
  async fetchProducts(
    typeId,
    brandId,
    countryId,
    makingMethodId,
    manufacturingMethodId,
    teaTypeId,
    packageTypeId,
    page = 1,
    limit = 9,
  ) {
    // зачем тут шаблонный литерал?
    const { data } = await $host.get(`${PRODUCT_ENDPOINT}`, {
      params: {
        typeId,
        brandId,
        countryId,
        makingMethodId,
        manufacturingMethodId,
        teaTypeId,
        packageTypeId,
        page,
        limit,
      },
    });
    return data;
  },
  async fetchOneProduct(id) {
    const { data } = await $host.get(`${PRODUCT_ENDPOINT}/${id}`);

    return data;
  },

  async createProductImage(productId, index, payload) {
    // почитай про метод postForm, мне кажется тут нужно его использовать
    const { data } = await $authHost.post(
      `${PIC_ENDPOINT}/${productId}/${index}`,
      payload,
    );

    return data;
  },
  async editProductImage(id, payload) {
    const { data } = await $authHost.patch(`${PIC_ENDPOINT}/${id}`, payload);

    return data;
  },
  async removeProductImage(id) {
    const { data } = await $authHost.delete(`${PIC_ENDPOINT}/${id}`);

    return data;
  },
  async removePriceProduct(id) {
    const { data } = await $authHost.delete(`${PRICE_ENDPOINT}/${id}`);

    return data;
  },
};

export default httpService;
