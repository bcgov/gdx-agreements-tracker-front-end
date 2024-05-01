import { IUseFormSubmitHandlePost, IUseFormSubmitHandleSubmit } from "../types";
import { useAxios } from "./useAxios";

/**
 *
 * A hook that handles the submit functionality for any form
 */

export const useFormSubmit = () => {
  const { axiosAll } = useAxios();

  const handleUpdate = async ({
    changedValues,
    currentRowData,
    apiUrl,
    tableName,
  }: IUseFormSubmitHandleSubmit) => {
    let deltaChanges: {
      [key: string]: boolean;
    } = {};

    if ("contact_project" === tableName) {
      deltaChanges = changedValues;
    } else {
      Object.keys(changedValues).forEach((key) => {
        if (changedValues[key] !== currentRowData[key]) {
          if (
            "object" === typeof changedValues[key] &&
            null !== changedValues[key] &&
            "value" in changedValues[key]
          ) {
            deltaChanges[key] = changedValues[key].value;
          } else {
            deltaChanges[key] = changedValues[key];
          }
        }
      });
    }
    const response = await axiosAll().put(apiUrl, deltaChanges);
    return response.data;
  };

  const handlePost = async ({ formValues, apiUrl }: IUseFormSubmitHandlePost) => {
    const formattedValues: {
      [key: string]: boolean | string | null;
    } = {};
    for (const key in formValues) {
      if (formValues[key] !== null) {
        if (formValues[key].value) {
          formattedValues[key] = formValues[key].value;
        } else {
          formattedValues[key] = formValues[key];
        }
      }
    }

    const response = await axiosAll().post(apiUrl, formattedValues);
    return response.data.data;
  };

  const handleDelete = async ({ apiUrl }: { apiUrl: string }) => {
    try {
      const response = await axiosAll().delete(apiUrl);
      Promise.resolve(response);
    } catch (error) {
      console.error("error:", error);
      throw error; // Ensure the error is propagated
    }
  };

  return { handlePost, handleUpdate, handleDelete };
};
