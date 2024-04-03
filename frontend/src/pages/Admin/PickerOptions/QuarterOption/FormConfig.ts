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
  const postUrl = `/quarter_option`;
  const updateUrl = `/quarter_option/${rowId}`;
  const deleteUrl = `/quarter_option/${query}`;

  const formTitle = "Quarter Option";

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
