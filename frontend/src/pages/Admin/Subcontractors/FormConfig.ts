import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          value: query.data?.data?.data?.subcontractor_name,
          title: "Subcontractor Name",
          width: "half",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "subcontractor_name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
      required: true,
    },
  ];

  const initialValues = {
    subcontractor_name: "",
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/subcontractors`;
  const updateUrl = `/subcontractors/${rowId}`;
  const deleteUrl = `/subcontractors/${query}`;

  const formTitle = "Subcontractors";

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
