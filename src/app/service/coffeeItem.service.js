import httpService from "./http.service";

const coffeeItemEndpoint = "coffeeItem/";

const coffeeItemService = {
  get: async () => {
    const { data } = await httpService.get(coffeeItemEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      coffeeItemEndpoint + payload._id,
      payload
    );
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      coffeeItemEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(coffeeItemEndpoint + id);
    return data;
  }
};

export default coffeeItemService;
