import httpService from "../http.service";

const teaPakegesEndpoint = "teaPackage/";

const teaPakegesService = {
  get: async () => {
    const { data } = await httpService.get(teaPakegesEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      teaPakegesEndpoint + payload._id,
      payload
    );
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      teaPakegesEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(teaPakegesEndpoint + id);
    return data;
  }
};

export default teaPakegesService;
