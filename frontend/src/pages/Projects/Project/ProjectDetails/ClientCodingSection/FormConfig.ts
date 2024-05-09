import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();
  const readFields = !query
    ? []
    : [
        {
          width: "full",
          title: "Program Area",
          value: query?.data?.data?.data?.program_area,
        },
        {
          width: "full",
          title: "Client",
          value: query?.data?.data?.data?.client,
        },
        {
          width: "full",
          title: "Responsibility Centre",
          value: query?.data?.data?.data?.responsibility_centre,
        },
        {
          width: "full",
          title: "Service Line",
          value: query?.data?.data?.data?.service_line,
        },
        {
          width: "full",
          title: "STOB",
          value: query?.data?.data?.data?.stob,
        },
        {
          width: "full",
          title: "Project Code",
          value: query?.data?.data?.data?.project_code,
        },
        {
          width: "full",
          title: "Financial Contact",
          value: query?.data?.data?.data?.contact_id?.label,
        },
        {
          width: "full",
          title: "Expense Authority Name",
          value: query?.data?.data?.data?.expense_authority_name,
        },
        {
          width: "full",
          title: "Client Amount",
          value: query?.data?.data?.data?.client_amount,
        },
      ];

  const editFields: IEditField[] = [
    {
      width: "full",
      fieldLabel: "Program Area",
      fieldName: "program_area",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "Client",
      fieldName: "client",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "Responsibility Centre",
      fieldName: "responsibility_centre",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "Service Line",
      fieldName: "service_line",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "STOB",
      fieldName: "stob",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "Project Code",
      fieldName: "project_code",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "Financial Contact",
      fieldName: "contact_id",
      fieldType: "select",
      pickerName: "contact_option",
    },
    {
      width: "full",
      fieldLabel: "Expense Authority Name",
      fieldName: "expense_authority_name",
      fieldType: "singleText",
    },
    {
      width: "full",
      fieldLabel: "Client Amount",
      fieldName: "client_amount",
      fieldType: "money",
    },
  ];

  const initialValues = {
    program_area: "",
    client: "",
    responsibility_centre: "",
    service_line: "",
    stob: "",
    project_code: "",
    contact_id: null,
    expense_authority_name: "",
    client_amount: "",
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/projects/${projectId}/client-coding`;
  const updateUrl = `/projects/client-coding/${query?.data?.data?.data?.id}`;
  const formTitle = "Project Client Coding";

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl, formTitle };
};
