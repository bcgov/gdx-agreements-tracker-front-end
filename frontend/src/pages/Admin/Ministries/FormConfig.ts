import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Ministry", value: query?.data?.data?.data?.ministry_name },
        { width: "half", title: "Abbr", value: query?.data?.data?.data?.ministry_short_name },
        {
          width: "half",
          title: "Is Active",
          value: query?.data?.data?.data?.is_active ? "Yes" : "No",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "ministry_name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
    },
    {
      fieldName: "ministry_short_name",
      fieldType: "singleText",
      fieldLabel: "Abbreviation",
      width: "half",
    },
    {
      fieldName: "is_active",
      fieldType: "checkbox",
      fieldLabel: "Is Active",
      width: "half",
    },
  ];

  const initialValues = {
    ministry_name: "",
    ministry_short_name: "",
    is_active: false,
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/ministries`;
  const updateUrl = `/ministries/${rowId}`;

  const formTitle = "Ministries";
  const deleteUrl = `/ministries/${query}`;

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
