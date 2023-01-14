import api from "./core";

export const findTag = async () => {
  const { data } = await api.get(`/api/tags`);
  return data;
};
