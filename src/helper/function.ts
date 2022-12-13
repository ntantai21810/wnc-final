import { IBasePageRole, IPageRole } from "../model/page";

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isFullPageRole = (
  page: (IPageRole | IBasePageRole) & { discriminatedType?: "base" | "full" }
): page is IPageRole => {
  return page.discriminatedType === "full";
};

export const isBasePageRole = (
  page: (IPageRole | IBasePageRole) & { discriminatedType?: "base" | "full" }
): page is IBasePageRole => {
  return page.discriminatedType === "base";
};
