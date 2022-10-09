// import httpService from "./http.service";

const hostURL = "http://localhost:8080/venditore/files/";
const params = new URLSearchParams();

const fileService = {
  create: async (payload, key) => {
    try {
      const formData = new FormData();
      formData.append("file", payload);

      const res = await fetch(hostURL + key, {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  },
  // create: async (payload) => {
  //   const formData = new FormData();
  //   formData.append("file", payload);
  //   const { data } = await httpService.post(hostURL, formData);
  //   return data;
  // },
  edit: async (payload, data) => {
    const formData = new FormData();
    formData.append("file", payload);

    const res = await fetch(hostURL + data._id, {
      method: "PATCH",
      body: formData
      // headers: { data: data._id }
    });

    return await res.json();
  },
  remove: async (payload) => {
    params.set("data", payload._id);
    const res = await fetch(hostURL, {
      method: "DELETE",
      body: params
    });
    return await res.json();
  }
};

export default fileService;
