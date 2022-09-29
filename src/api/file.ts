import api from "./core";

export const deletefiles = (data: any) => {
  return api.post("/api/file", data);
};
