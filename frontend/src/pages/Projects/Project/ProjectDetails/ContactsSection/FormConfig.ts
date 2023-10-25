import { FormikValues } from "formik";
import { useParams } from "react-router-dom";
import { IEditField } from "types";

const FormConfig = (query: FormikValues) => {
  const { projectId } = useParams();

  const findContacts = (keyword: string) => {
    const filterOutContacts = query?.data?.data?.data?.find(
      (item: { role_type: string }) => item.role_type === keyword
    );
    return filterOutContacts?.contacts.map((contact: { label: string }) => contact.label);
  };

  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Client Contact",
          value: findContacts("ClientContact"),
        },
        {
          width: "half",
          title: "GDX Contact",
          value: findContacts("GDXContact"),
        },
        {
          width: "half",
          title: "Client Sponsor",
          value: findContacts("ClientSponsor"),
        },
        {
          width: "half",
          title: "GDX Sponsor",
          value: findContacts("GDXSponsor"),
        },
        {
          width: "half",
          title: "Client Financial",
          value: findContacts("ClientFinancial"),
        },
        {
          width: "half",
          title: "Project Manager",
          value: findContacts("ProjectManager"),
        },
        {
          width: "half",
          title: "CommsLead",
          value: findContacts("CommsLead"),
        },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Client Contact",
      fieldName: 2,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
    {
      width: "half",
      fieldLabel: "GDX Contact",
      fieldName: 5,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
    {
      width: "half",
      fieldLabel: "Client Sponsor",
      fieldName: 1,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
    {
      width: "half",
      fieldLabel: "GDX Sponsor",
      fieldName: 4,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
    {
      width: "half",
      fieldLabel: "Client Financial",
      fieldName: 3,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
    {
      width: "half",
      fieldLabel: "Project Manager",
      fieldName: 6,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
    {
      width: "half",
      fieldLabel: "Comms Lead",
      fieldName: 7,
      fieldType: "multiselect",
      pickerName: "contact_option",
    },
  ];

  const initialValues = () => {
    const row: FormikValues[string] = {};
    !Array.isArray(query?.data?.data?.data)
      ? []
      : query?.data?.data?.data?.map((role: { role_id: string | number; contacts: any }) => {
          row[role.role_id] = role.contacts;
        });

    return row;
  };

  const rowsToLock: Array<number> = !query.isLoading
    ? []
    : query?.data?.data?.data?.flatMap((obj: { rows_to_lock: [] }) =>
        obj.rows_to_lock
          ? obj.rows_to_lock.filter(
              (val: null | undefined) => val !== null && val !== undefined && val !== 0
            )
          : []
      );

  const updateUrl = `/projects/${projectId}/contacts`;

  return { readFields, editFields, initialValues, rowsToLock, updateUrl };
};

export default FormConfig;
