import { $authHost, $host } from "./index";

const ENDPOINT = "api/v1/user";

export const registration = async (email, password) => {
  const { data } = await $host.post(`${ENDPOINT}/registration`, {
    email,
    password,
    role: "ADMIN",
  });
  localStorage.setItem("token", data.accessToken);

  return data.user;
};

export const login = async (email, password) => {
  const { data } = await $host.post(`${ENDPOINT}/login`, {
    email,
    password,
  });
  localStorage.setItem("token", data.accessToken);

  return data.user;
};

export const logout = async () => {
  await $host.post(`${ENDPOINT}/logout`);
  localStorage.removeItem("token");
};

export const check = async () => {
  const { data } = await $authHost.get(`${ENDPOINT}/refresh`);
  localStorage.setItem("token", data.accessToken);

  return data.user;
};
