const hostURL = "http://localhost:8080/venditore/files/";
// const params = new URLSearchParams();

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

  edit: async (payload, data) => {
    try {
      const formData = new FormData();
      formData.append("file", payload);

      const res = await fetch(hostURL + data._id, {
        method: "PATCH",
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
  remove: async (payload) => {
    // params.set("data", payload._id);
    try {
      const res = await fetch(hostURL + payload._id, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
};

export default fileService;
