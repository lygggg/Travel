import { useQuery } from "@tanstack/react-query";
import { findTag } from "src/api/tag";

export const useTag = (userId: string) => {
  return useQuery(["tag", userId], () => findTag(userId));
};
