import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import { getResponsabilityServiceLine } from "utils/getResponsabilityServiceLine";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { contractId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          value: query?.data?.data?.data?.portfolio_id.label,
          title: "Portfolio",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.cas_project_number,
          title: "CAS Project #",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.responsibility,
          title: "Responsibility",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.service_line,
          title: "Service_line",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.stob,
          title: "STOB",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.qualified_receiver,
          title: "Qualified Receiver",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.recovery_info?.recovery_type_name,
          title: "Recovery Info",
          width: "full",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "portfolio_id",
      fieldType: "select",
      fieldLabel: "Portfolio",
      width: "half",
      pickerName: "portfolio_option",
      customOnChange: getResponsabilityServiceLine,
    },
    {
      fieldName: "cas_project_number",
      fieldType: "singleText",
      fieldLabel: "CAS Project #",
      width: "half",
    },
    {
      fieldName: "responsibility",
      fieldType: "readonly",
      fieldLabel: "Responsibility",
      width: "half",
    },
    {
      fieldName: "service_line",
      fieldType: "readonly",
      fieldLabel: "Service Line",
      width: "half",
    },
    {
      fieldName: "stob",
      fieldType: "singleText",
      fieldLabel: "STOB",
      width: "half",
    },
    {
      fieldName: "qualified_receiver",
      fieldType: "singleText",
      fieldLabel: "Qualified Receiver",
      width: "half",
    },
    {
      width: "half",
      fieldLabel: "Recovery Info",
      fieldName: "recovery_info",
      fieldType: "autocompleteTable",
      pickerName: "recovery_type_option",
      autocompleteTableColumns: [
        { field: "recovery_type_name", headerName: "Recovery Type Name" },
        { field: "inactive", headerName: "Inactive?" },
      ],
    },
  ];

  /**
   * Initial values for create form.
   */
  const initialValues = {
    portfolio_id: null,
    cas_project_number: "",
    responsibility: "",
    service_line: "",
    stob: "",
    qualified_receiver: "",
    recovery_info: "",
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/contracts/${contractId}/internal-coding`;
  const updateUrl = `/contracts/internal-coding/${query?.data?.data?.data?.id}`;

  const formTitle = "Contract Internal Coding";

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl, formTitle };
};
