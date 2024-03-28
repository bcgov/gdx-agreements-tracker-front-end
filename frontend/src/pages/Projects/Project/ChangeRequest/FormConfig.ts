import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import formatDate from "utils/formatDate";
import { apiAxios } from "utils";

const generateCRVersion = async () => {
  return await apiAxios()
    .get(`/projects/change_request/nextCRVersion`)
    .then((CRVersion) => {
      return CRVersion.data.data[0].cr_version;
    });
};

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Version", value: query?.data?.data?.data?.version },
        {
          width: "half",
          title: "Initiation Date",
          value: formatDate(query?.data?.data?.data?.initiation_date),
        },
        { width: "half", title: "CR Contact", value: query?.data?.data?.data?.cr_contact },
        {
          width: "half",
          title: "Initiated By",
          value: query?.data?.data?.data?.initiated_by?.label,
        },
        { width: "half", title: "Fiscal Year", value: query?.data?.data?.data?.fiscal_year?.label },
        {
          width: "half",
          title: "Approval Date",
          value: formatDate(query?.data?.data?.data?.approval_date),
        },
        {
          width: "full",
          title: "Types",
          value:
            query?.data?.data?.data?.types?.map(
              (item: { crtype_name: string }) => item.crtype_name
            ) || [],
          type: "multiSelect",
        },
        { width: "full", title: "Summary", value: query?.data?.data?.data?.summary },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "version",
      fieldType: "singleText",
      fieldLabel: "Version",
      width: "half",
      required: true,
      generateValueButton: {
        buttonTitle: "generate cr-version",
        buttonFunction: (setFieldValue: Function) => {
          generateCRVersion().then((nextCRVersion: string) => {
            setFieldValue("version", nextCRVersion);
          });
        },
      },
    },
    {
      fieldName: "initiation_date",
      fieldType: "date",
      fieldLabel: "Initiation Date",
      width: "half",
      required: true,
    },
    {
      //TODO: Broken, wil be updated in future ticket
      fieldName: "cr_contact",
      fieldType: "singleText",
      fieldLabel: "CR Contact",
      width: "half",
      // required: true,
    },
    {
      fieldName: "initiated_by",
      fieldType: "select",
      fieldLabel: "Initiated By",
      width: "half",
      pickerName: "initiated_by_option",
      required: true,
    },
    {
      fieldName: "fiscal_year",
      fieldType: "select",
      fieldLabel: "Fiscal Year",
      width: "half",
      pickerName: "fiscal_year_option",
      required: true,
    },
    {
      fieldName: "approval_date",
      fieldType: "date",
      fieldLabel: "Approval Date",
      width: "half",
      required: true,
    },
    {
      fieldName: "types",
      fieldType: "autocompleteTable",
      pickerName: "cr_type_option",
      fieldLabel: "Types",
      width: "full",
      multiple: true,
      // required: true,
      autocompleteTableColumns: [
        { field: "crtype_name", headerName: "Type" },
        { field: "inactive", headerName: "Inactive ?" },
      ],
    },
    {
      fieldName: "summary",
      fieldType: "multiText",
      fieldLabel: "Summary",
      width: "full",
      required: true,
    },
  ];

  const initialValues = {
    version: "",
    fiscal_year: null,
    initiation_date: null,
    cr_contact: null,
    initiated_by: null,
    approval_date: null,
    types: [],
    summary: null,
    link_id: projectId,
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/change_request`;
  const updateUrl = `/change_request/${rowId}`;
  const formTitle = "Project Change Request";

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl, formTitle };
};
