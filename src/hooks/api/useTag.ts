import { useQuery } from "@tanstack/react-query";
import { findTag } from "src/api/tag";

export const useTag = () => {
  return useQuery(["tag"], () => findTag());
};
