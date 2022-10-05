const hostURL = "http://localhost:8080/venditore/files/";
const params = new URLSearchParams();

const fileService = {
  create: async (payload, folder) => {
    const formData = new FormData();
    formData.append("file", payload);

    const res = await fetch(hostURL, {
      method: "POST",
      body: formData,
      headers: { folder }
    });

    return await res.json();
  },
  edit: async (payload, data) => {
    const formData = new FormData();
    formData.append("file", payload);

    const res = await fetch(hostURL, {
      method: "PATCH",
      body: formData,
      headers: { data: data._id }
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
