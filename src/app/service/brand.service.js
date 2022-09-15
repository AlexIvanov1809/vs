import httpService from "./http.service";

const brandEndpoint = "coffeeBrand/";

const brandService = {
  get: async () => {
    const { data } = await httpService.get(brandEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      brandEndpoint + payload._id,
      payload
    );
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      brandEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(brandEndpoint + id);
    return data;
  }
};

export default brandService;
