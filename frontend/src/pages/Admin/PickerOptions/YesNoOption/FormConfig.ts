import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [{ width: "full", title: "Label", value: query?.data?.data?.data?.label }];

  const editFields: IEditField[] = [
    {
      fieldName: "label",
      fieldType: "singleText",
      fieldLabel: "Label",
      width: "full",
    },
  ];

  const initialValues = {
    label: "",
  };
  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/yes_no_option`;
  const updateUrl = `/yes_no_option/${rowId}`;

  const formTitle = "Yes/No Option";
  const deleteUrl = `/yes_no_option/${query}`;

  return {
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    formTitle,
    deleteUrl,
  };
};
