import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { useFormControls } from "hooks/useFormControls";
import apiAxios from "utils/apiAxios";
import { useQuery } from "react-query";
import { Renderer } from "components/Renderer";
import { GDXModal } from "components/GDXModal";
import { IEditFields } from "types";
import { ReadForm } from "components/ReadForm";
import { CreateForm } from "components/CreateForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import { EditForm } from "components/EditForm";

export const Contacts: FC = () => {
  const {
    handleEditMode,
    handleOpen,
    handleClose,
    handleCurrentRowData,
    handleFormType,
    formType,
    open,
    editMode,
    currentRowData,
  } = useFormControls();

  const { data, isLoading } = useFormatTableData({
    tableName: "contacts",
    apiEndPoint: "/contacts",
    handleClick: handleOpen,
  });

  const getContact = async () => {
    const contact = await apiAxios().get(
      `/contacts/${currentRowData?.id}`
    );
    return contact.data.data[0];
  };

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactQuery: any = useQuery(`contact - ${currentRowData?.id}`, getContact, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const readFields = [
    { width: "half", title: "First Name", value: contactQuery?.data?.first_name },
    { width: "half", title: "Street Name", value: contactQuery?.data?.address },
    { width: "half", title: "Last Name", value: contactQuery?.data?.last_name },
    { width: "half", title: "City", value: contactQuery?.data?.city },
    { width: "half", title: "Job Title", value: contactQuery?.data?.contact_title },
    { width: "half", title: "State/Province", value: contactQuery?.data?.province },
    { width: "half", title: "Ministry ID", value: contactQuery?.data?.ministry_id },
    { width: "half", title: "Country", value: contactQuery?.data?.country },
    { width: "half", title: "Business Phone", value: contactQuery?.data?.contact_phone },
    { width: "half", title: "Postal Code", value: contactQuery?.data?.postal },
    { width: "half", title: "Mobile Phone", value: contactQuery?.data?.mobile },
    { width: "half", title: "Website", value: contactQuery?.data?.website },
    { width: "half", title: "Notes", value: contactQuery?.data?.notes },
  ];

  const editFields: IEditFields[] = [
    {
      fieldName: "first_name",
      fieldType: "singleText",
      fieldLabel: "First Name",
      width: "half",
    },
    {
      fieldName: "address",
      fieldType: "singleText",
      fieldLabel: "Street Name",
      width: "half",
    },
    {
      fieldName: "last_name",
      fieldType: "singleText",
      fieldLabel: "Last Name",
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
      fieldType: "singleText",
      fieldLabel: "Ministry ID",
      width: "half",
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
      fieldName: "notes",
      fieldType: "singleText",
      fieldLabel: "Notes",
      width: "half",
    },
  ];

  const createFormInitialValues = {
    first_name: "",
    address: "",
    last_name: "",
    city: "",
    contact_title: "",
    province: "",
    ministry_id: 0,
    country: "",
    contact_phone: "",
    postal: "",
    mobile: "",
    website: "",
    notes: "",
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Contacts
      </Typography>
      <Renderer
        isLoading={isLoading}
        component={
          <>
            <Table
              columns={data?.columns}
              rows={data?.rows}
              loading={isLoading}
              onRowClick={handleCurrentRowData}
            />
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType ? `New Contact` : `Change Contact ${contactQuery?.data?.id}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields} />
          ) : (
            <>
              {"new" === formType ? (
                <CreateForm
                  initialValues={createFormInitialValues}
                  // todo: Define a good type. "Any" type temporarily permitted.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSubmit={async (values: any) => {
                    return handlePost({
                      formValues: values,
                      apiUrl: "/contacts",
                      handleEditMode: handleEditMode,
                      queryKeys: ["/contacts"],
                    });
                  }}
                  editFields={editFields}
                />
              ) : (
                <EditForm
                  initialValues={contactQuery?.data}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: contactQuery?.data,
                      apiUrl: `contacts/${contactQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [
                        `contact - ${currentRowData?.id}`,
                        `contacts`,
                      ],
                    });
                  }}
                  editFields={editFields}
                />
              )}
            </>
          )}
        </>
      </GDXModal>
    </>
  );
};
