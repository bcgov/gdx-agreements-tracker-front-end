import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          value: query.data?.data?.data?.supplier_number,
          title: "Supplier Number",
          width: "half",
        },
        {
          value: query.data?.data?.data?.site_number,
          title: "Site Number",
          width: "half",
        },
        {
          value: query.data?.data?.data?.supplier_name,
          title: "Supplier Name",
          width: "half",
        },
        {
          value: query.data?.data?.data?.signing_authority_name,
          title: "Signing Authority Name",
          width: "half",
        },
        {
          value: query.data?.data?.data?.signing_authority_title,
          title: "Signing Authority Title",
          width: "half",
        },
        {
          value: query.data?.data?.data?.address,
          title: "Address",
          width: "half",
        },
        {
          value: query.data?.data?.data?.city,
          title: "City",
          width: "half",
        },
        {
          value: query.data?.data?.data?.province,
          title: "Province",
          width: "half",
        },
        {
          value: query.data?.data?.data?.country,
          title: "Country",
          width: "half",
        },
        {
          value: query.data?.data?.data?.postal_code,
          title: "Postal Code",
          width: "half",
        },
        {
          value: query.data?.data?.data?.phone,
          title: "Phone",
          width: "half",
        },
        {
          value: query.data?.data?.data?.fax,
          title: "Fax",
          width: "half",
        },
        {
          value: query.data?.data?.data?.email,
          title: "Email",
          width: "half",
        },
        {
          value: query.data?.data?.data?.website,
          title: "Website",
          width: "half",
        },
        {
          value: query.data?.data?.data?.financial_contact_name,
          title: "Financial Contact Name",
          width: "half",
        },
        {
          value: query.data?.data?.data?.financial_contact_phone,
          title: "Financial Contact Phone",
          width: "half",
        },
        {
          value: query.data?.data?.data?.financial_contact_email,
          title: "Financial Contact Email",
          width: "half",
        },
        {
          value: query.data?.data?.data?.supplier_legal_name,
          title: "Supplier Legal Name",
          width: "half",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "supplier_number",
      fieldType: "number",
      fieldLabel: "Supplier Number",
      width: "half",
    },
    {
      fieldName: "site_number",
      fieldType: "singleText",
      fieldLabel: "Site Number",
      width: "half",
    },
    {
      fieldName: "supplier_name",
      fieldType: "singleText",
      fieldLabel: "Supplier Name",
      width: "half",
    },
    {
      fieldName: "signing_authority_name",
      fieldType: "singleText",
      fieldLabel: "Signing Authority Name",
      width: "half",
    },
    {
      fieldName: "signing_authority_title",
      fieldType: "singleText",
      fieldLabel: "Signing Authority Title",
      width: "half",
    },
    {
      fieldName: "address",
      fieldType: "singleText",
      fieldLabel: "Address",
      width: "half",
    },
    {
      fieldName: "city",
      fieldType: "singleText",
      fieldLabel: "City",
      width: "half",
    },
    {
      fieldName: "province",
      fieldType: "singleText",
      fieldLabel: "Province",
      width: "half",
    },
    {
      fieldName: "country",
      fieldType: "singleText",
      fieldLabel: "Country",
      width: "half",
    },
    {
      fieldName: "postal_code",
      fieldType: "singleText",
      fieldLabel: "Postal Code",
      width: "half",
    },
    {
      fieldName: "phone",
      fieldType: "singleText",
      fieldLabel: "Phone",
      width: "half",
    },
    {
      fieldName: "fax",
      fieldType: "singleText",
      fieldLabel: "Fax",
      width: "half",
    },
    {
      fieldName: "email",
      fieldType: "singleText",
      fieldLabel: "Email",
      width: "half",
    },
    {
      fieldName: "website",
      fieldType: "singleText",
      fieldLabel: "Website",
      width: "half",
    },
    {
      fieldName: "financial_contact_name",
      fieldType: "singleText",
      fieldLabel: "Financial Contact Name",
      width: "half",
    },
    {
      fieldName: "financial_contact_phone",
      fieldType: "singleText",
      fieldLabel: "Financial Contact Phone",
      width: "half",
    },
    {
      fieldName: "financial_contact_email",
      fieldType: "singleText",
      fieldLabel: "Financial Contact Email",
      width: "half",
    },
    {
      fieldName: "supplier_legal_name",
      fieldType: "singleText",
      fieldLabel: "Supplier Legal Name",
      width: "half",
    },
  ];

  const initialValues = {
    supplier_number: null,
    site_number: "",
    supplier_name: "",
    signing_authority_name: "",
    signing_authority_title: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    financial_contact_name: "",
    financial_contact_phone: "",
    financial_contact_email: "",
    supplier_legal_name: "",
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/suppliers`;
  const updateUrl = `/suppliers/${rowId}`;
  const deleteUrl = `/suppliers/${query}`;

  const formTitle = "Suppliers";

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
