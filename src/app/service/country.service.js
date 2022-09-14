import httpService from "./http.service";

const countryEndpoint = "countries/";

const countryService = {
  get: async () => {
    const { data } = await httpService.get(countryEndpoint);
    return data;
  }
};

export default countryService;
