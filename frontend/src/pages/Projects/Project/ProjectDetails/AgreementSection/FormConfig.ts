import { AxiosResponse } from "axios";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import formatDate from "utils/formatDate";

export const FormConfig = (query: AxiosResponse | undefined) => {
  const { projectId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Agreement Type",
          value: query?.data?.data?.data?.agreement_type?.label,
        },
        {
          width: "half",
          title: "Signed Date",
          value: formatDate(query?.data?.data?.data?.agreement_signed_date),
        },
        {
          width: "half",
          title: "Start Date",
          value: formatDate(query?.data?.data?.data?.agreement_start_date),
        },
        {
          width: "half",
          title: "End Date",
          value: formatDate(query?.data?.data?.data?.agreement_end_date),
        },
        { width: "full", title: "Description", value: query?.data?.data?.data?.description },
        { width: "full", title: "Notes", value: query?.data?.data?.data?.notes },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "agreement_type",
      fieldLabel: "Agreement Type",
      fieldType: "select",
      width: "half",
      pickerName: "project_agreement_types_option",
    },
    {
      fieldName: "agreement_signed_date",
      fieldLabel: "Signed Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "agreement_start_date",
      fieldLabel: "Start Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "agreement_end_date",
      fieldLabel: "End Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "description",
      fieldLabel: "Description",
      fieldType: "multiText",
      width: "full",
    },
    {
      fieldName: "notes",
      fieldLabel: "Notes",
      fieldType: "multiText",
      width: "full",
    },
  ];

  const updateUrl = `/projects/${projectId}/agreement`;

  const rowsToLock = [Number(projectId)];

  return { readFields, editFields, updateUrl, rowsToLock };
};
