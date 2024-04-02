import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import formatDate from "utils/formatDate";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { contractId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          value: query?.data?.data?.data?.deliverable_name,
          title: "Deliverable Name",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.is_expense,
          title: "Expense",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.description,
          title: "Description",
          width: "full",
        },
        {
          value: formatDate(query?.data?.data?.data?.completion_date),
          title: "Completion Date",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.deliverable_amount,
          title: "Deliverable Amount",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.deliverable_status.label,
          title: "Deliverable Status",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.project_deliverable_id.label,
          title: "Project Deliverable",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.fiscal.label,
          title: "Fiscal",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.comments,
          title: "Comments",
          width: "full",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "deliverable_name",
      fieldType: "singleText",
      fieldLabel: "Deliverable",
      width: "half",
      required: true,
    },
    {
      fieldName: "is_expense",
      fieldType: "checkbox",
      fieldLabel: "Expense",
      width: "half",
    },
    {
      fieldName: "description",
      fieldType: "multiText",
      fieldLabel: "Description",
      width: "full",
    },
    {
      fieldName: "completion_date",
      fieldType: "date",
      fieldLabel: "Completion Date",
      width: "half",
    },
    {
      fieldName: "deliverable_amount",
      fieldType: "money",
      fieldLabel: "Deliverable Amount",
      width: "half",
    },
    {
      fieldName: "deliverable_status",
      fieldType: "select",
      fieldLabel: "Deliverable Status",
      width: "half",
      pickerName: "deliverable_status_option",
      required: true,
    },
    {
      fieldName: "project_deliverable_id",
      fieldType: "autocompleteTable",
      fieldLabel: "Project Deliverable",
      width: "half",
      pickerName: "project_deliverable_option",
      autocompleteTableColumns: [
        { field: "deliverable_name", headerName: "Deliverable Name" },
        { field: "deliverable_amount", headerName: "Deliverable Amount" },
        { field: "deliverable_status", headerName: "Deliverable Status" },
      ],
      contractId: Number(contractId),
    },
    {
      fieldName: "fiscal",
      fieldType: "select",
      fieldLabel: "Fiscal Year",
      width: "half",
      pickerName: "fiscal_year_option",
      required: true,
    },
    {
      fieldName: "comments",
      fieldType: "multiText",
      fieldLabel: "Comments",
      width: "full",
    },
  ];

  /**
   * Initial values for create form.
   */
  const initialValues = {
    deliverable_name: "",
    is_expense: false,
    completion_date: null,
    deliverable_amount: null,
    deliverable_status: "",
    project_deliverable_id: null,
    comments: "",
    fiscal: "",
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/contracts/${contractId}/deliverables`;
  const updateUrl = `/contracts/deliverables/${rowId}`;
  const deleteUrl = `/contracts/deliverables/${query}`;

  const formTitle = "Contract Deliverables";

  return {
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    deleteUrl,
    formTitle,
  };
};
