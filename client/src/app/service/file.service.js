import httpService from "./http.service";

const fileEndpoint = "files/kg";

const fileService = {
  get: async () => {
    const { data } = await httpService.get(fileEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(fileEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      fileEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(fileEndpoint + id);
    return data;
  }
};

export default fileService;
