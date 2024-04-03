import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "First Name", value: query.data?.data?.data?.first_name },
        { width: "half", title: "Street Name", value: query.data?.data?.data?.address },
        { width: "half", title: "Last Name", value: query.data?.data?.data?.last_name },
        { width: "half", title: "City", value: query.data?.data?.data?.city },
        { width: "half", title: "Job Title", value: query.data?.data?.data?.contact_title },
        { width: "half", title: "State/Province", value: query.data?.data?.data?.province },
        { width: "half", title: "Ministry ID", value: query.data?.data?.data?.ministry_id.label },
        { width: "half", title: "Country", value: query.data?.data?.data?.country },
        { width: "half", title: "Business Phone", value: query.data?.data?.data?.contact_phone },
        { width: "half", title: "Postal Code", value: query.data?.data?.data?.postal },
        { width: "half", title: "Mobile Phone", value: query.data?.data?.data?.mobile },
        { width: "half", title: "Website", value: query.data?.data?.data?.website },
        { width: "half", title: "Email", value: query.data?.data?.data?.email },
        { width: "half", title: "Notes", value: query.data?.data?.data?.notes },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "first_name",
      fieldType: "singleText",
      fieldLabel: "First Name",
      width: "half",
      required: true,
    },
    {
      fieldName: "last_name",
      fieldType: "singleText",
      fieldLabel: "Last Name",
      width: "half",
      required: true,
    },
    {
      fieldName: "address",
      fieldType: "singleText",
      fieldLabel: "Street Name",
      width: "half",
    },
    {
      fieldName: "city",
      fieldType: "singleText",
      fieldLabel: "City",
      width: "half",
    },
    {
      fieldName: "contact_title",
      fieldType: "singleText",
      fieldLabel: "Job Title",
      width: "half",
    },
    {
      fieldName: "province",
      fieldType: "singleText",
      fieldLabel: "State/Province",
      width: "half",
    },
    {
      fieldName: "ministry_id",
      fieldType: "select",
      fieldLabel: "Ministry ID",
      width: "half",
      pickerName: "ministry_option",
    },
    {
      fieldName: "country",
      fieldType: "singleText",
      fieldLabel: "Country",
      width: "half",
    },
    {
      fieldName: "contact_phone",
      fieldType: "singleText",
      fieldLabel: "Business Phone",
      width: "half",
    },
    {
      fieldName: "postal",
      fieldType: "singleText",
      fieldLabel: "Postal Code",
      width: "half",
    },
    {
      fieldName: "mobile",
      fieldType: "singleText",
      fieldLabel: "Mobile Phone",
      width: "half",
    },
    {
      fieldName: "website",
      fieldType: "singleText",
      fieldLabel: "Website",
      width: "half",
    },
    {
      fieldName: "email",
      fieldType: "singleText",
      fieldLabel: "Email",
      width: "half",
    },
    {
      fieldName: "notes",
      fieldType: "multiText",
      fieldLabel: "Notes",
      width: "half",
    },
  ];

  const initialValues = {
    first_name: "",
    address: "",
    last_name: "",
    city: "",
    contact_title: "",
    province: "",
    ministry_id: null,
    country: "",
    contact_phone: "",
    postal: "",
    mobile: "",
    website: "",
    email: "",
    notes: "",
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/contacts`;
  const updateUrl = `/contacts/${rowId}`;
  const deleteUrl = `/contacts/${query}`;

  const formTitle = "Contacts";

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
