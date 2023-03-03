import { query } from "src/models/query";

export const convertToForceArray = (obj: query) => {
  if (!obj) return [];
  return Array.isArray(obj) ? obj : [obj];
};

export const checkInArr = (arr: string[], value: string) =>
  arr.some((element) => element === value);

export const checkIncludeArr = (arr1: string[], arr2: string[]) =>
  arr1.some((element) => arr2.includes(element));

export function isArray(value: any): value is string[] {
  return Array.isArray(value);
}
