import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Supplier", value: query.data?.data?.data?.supplier_id.label },
        {
          width: "half",
          title: "Subcontractor",
          value: query.data?.data?.data?.subcontractor_id.label,
        },
        { width: "half", title: "First Name", value: query.data?.data?.data?.resource_first_name },
        { width: "half", title: "Last Name", value: query.data?.data?.data?.resource_last_name },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "supplier_id",
      fieldType: "select",
      fieldLabel: "Supplier",
      width: "half",
      pickerName: "supplier_option",
    },
    {
      fieldName: "subcontractor_id",
      fieldType: "select",
      fieldLabel: "Subcontractor",
      width: "half",
      pickerName: "subcontractor_option",
    },
    {
      fieldName: "resource_first_name",
      fieldType: "singleText",
      fieldLabel: "First Name",
      width: "half",
    },
    {
      fieldName: "resource_last_name",
      fieldType: "singleText",
      fieldLabel: "Last Name",
      width: "half",
    },
  ];

  const initialValues = {
    resource_last_name: "",
    resource_first_name: "",
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/resources`;
  const updateUrl = `/resources/${rowId}`;
  const deleteUrl = `/resources/${query}`;

  const formTitle = "Resources";

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
