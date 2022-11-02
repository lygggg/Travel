import api from "./core";

export const findTag = async (userId: string) => {
  const { data } = await api.get(`/api/users/${userId}/tags`);
  return data;
};
