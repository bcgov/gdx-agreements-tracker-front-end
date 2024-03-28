import { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { IEditField } from "types";
import formatDate from "utils/formatDate";

export const FormConfig = (query: AxiosResponse | undefined) => {
  const { projectId } = useParams();

  const readFields = !query
    ? []
    : [
        { width: "half", title: "Project Number", value: query?.data?.data?.data?.project_number },
        { width: "half", title: "Project Name", value: query?.data?.data?.data?.project_name },
        { width: "half", title: "Version", value: query?.data?.data?.data?.project_version },
        {
          width: "half",
          title: "Client Ministry Name",
          value: query?.data?.data?.data?.ministry_id?.label,
        },
        {
          width: "half",
          title: "Registration Date",
          value: formatDate(query?.data?.data?.data?.initiation_date),
        },
        {
          width: "half",
          title: "Portfolio Name",
          value: query?.data?.data?.data?.portfolio_id?.label,
        },
        {
          width: "half",
          title: "Planned Start Date",
          value: formatDate(query?.data?.data?.data?.planned_start_date),
        },
        { width: "half", title: "Fiscal", value: query?.data?.data?.data?.fiscal?.label },
        {
          width: "half",
          title: "Planned End Date",
          value: formatDate(query?.data?.data?.data?.planned_end_date),
        },
        { width: "half", title: "Planned Budget", value: query?.data?.data?.data?.planned_budget },
        {
          width: "half",
          title: "Project Type",
          value: query?.data?.data?.data?.project_type?.label,
        },
        {
          width: "half",
          title: "Project Status",
          value: query?.data?.data?.data?.project_status?.label,
        },
        { width: "half", title: "Funding", value: query?.data?.data?.data?.funding?.label },
        {
          width: "half",
          title: "Total Budget",
          value: query?.data?.data?.data?.total_project_budget,
        },
        {
          width: "half",
          title: "Recovery Details",
          value: query?.data?.data?.data?.recoverable?.label,
        },
        {
          width: "half",
          title: "Recoverable Total",
          value: query?.data?.data?.data?.recoverable_amount,
        },
        {
          width: "half",
          title: "Contracts",
          value: query?.data?.data?.data?.contracts
            ? (query?.data?.data?.data?.contracts as Array<{ id: number; co_number: string }>).map(
                (c) => {
                  return { link: `/contracts/${c.id}`, label: c.co_number };
                }
              )
            : "",
          type: "link",
        },
      ];
  const editFields: IEditField[] = [
    {
      fieldName: "project_number",
      fieldType: "singleText",
      fieldLabel: "Project Number",
      width: "half",
    },
    {
      fieldName: "project_name",
      fieldType: "singleText",
      fieldLabel: "Project Name",
      width: "half",
    },
    {
      fieldName: "project_version",
      fieldType: "singleText",
      fieldLabel: "Version",
      width: "half",
    },
    {
      fieldName: "ministry_id",
      fieldType: "select",
      fieldLabel: "Client Ministry Name",
      width: "half",
      pickerName: "ministry_option",
    },
    {
      fieldName: "initiation_date",
      fieldType: "date",
      fieldLabel: "Registration Date",
      width: "half",
    },
    {
      fieldName: "portfolio_id",
      fieldType: "select",
      fieldLabel: "Portfolio Name",
      width: "half",
      pickerName: "portfolio_option",
    },
    {
      fieldName: "planned_start_date",
      fieldType: "date",
      fieldLabel: "Planned Start Date",
      width: "half",
    },
    {
      fieldName: "fiscal",
      fieldType: "select",
      fieldLabel: "Fiscal",
      width: "half",
      pickerName: "fiscal_year_option",
    },
    {
      fieldName: "planned_end_date",
      fieldType: "date",
      fieldLabel: "Planned End Date",
      width: "half",
    },
    {
      fieldName: "planned_budget",
      fieldType: "money",
      fieldLabel: "Planned Budget",
      width: "half",
    },
    {
      fieldName: "project_type",
      fieldType: "select",
      fieldLabel: "Project Type",
      width: "half",
      pickerName: "project_type_option",
    },
    {
      fieldName: "project_status",
      fieldType: "select",
      fieldLabel: "Project Status",
      width: "half",
      pickerName: "project_status_option",
    },
    {
      fieldName: "funding",
      fieldType: "select",
      fieldLabel: "Funding",
      width: "half",
      pickerName: "project_funding_option",
    },
    {
      fieldName: "total_project_budget",
      fieldType: "money",
      fieldLabel: "Total Budget",
      width: "half",
    },
    {
      fieldName: "recoverable",
      fieldType: "select",
      fieldLabel: "Recovery Details",
      width: "half",
      pickerName: "project_recoverable_option",
    },
    {
      fieldName: "recoverable_amount",
      fieldType: "money",
      fieldLabel: "Recoverable Total",
      width: "half",
    },
  ];

  const rowsToLock = [Number(projectId)];

  const postUrl = "/projects";

  const updateUrl = `/projects/${projectId}`;

  return { readFields, editFields, rowsToLock, postUrl, updateUrl };
};
