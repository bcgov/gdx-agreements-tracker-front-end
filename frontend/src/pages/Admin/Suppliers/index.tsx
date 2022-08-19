import React, { FC } from "react";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { Renderer } from "components/Renderer";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import { readFields } from "./readFields";
import { editFields } from "./editFields";
import { ReadForm } from "components/ReadForm";
import { CreateForm } from "components/CreateForm";
import { EditForm } from "components/EditForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import { FormikValues } from "formik";
/**
 * The suppliers page
 *
 * @returns {JSX.Element} Suppliers
 */

export const Suppliers: FC = (): JSX.Element => {
  /**
   *
   * useFormControls is a hook that handles all functionality for a form.
   *
   * @returns  {object }
   * @property {Function}     handleEditMode       Handler for activating/deactivating edit mode.
   * @property {Function}     handleOpen           Handler for opening form modal.
   * @property {Function}     handleClose          Handler for closing form modal.
   * @property {Function}     handleCurrentRowData Handler for setting the current row data.
   * @property {Function}     handleFormType       Handler for setting the form type.
   * @property {"edit"|"new"} formType             The form type.
   * @property {boolean}      open                 To determine if form modal should be open or closed
   * @property {boolean}      editMode             To determine if the form is in edit mode.
   * @property {unknown}      currentRowData       The currently selected row in a table row.
   */

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

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  /**
   * returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
   * reference: https://reactrouter.com/docs/en/v6/hooks/use-params
   *
   * @returns {string} supplierId
   */

  const { supplierId } = useParams();

  /**
   * returns destructured props from the useFormatTableData hook.
   *
   * @param   {string}   tableName   - The name of the table that you are wanting data from.
   * @param   {string}   apiEndPoint - The enpoint as which the API query will use for it's call.
   * @param   {Function} handleClick - Function passed to the "view" button of the Table component.
   * @returns {object}               {data, isLoading}  - "data" contains the columns and rows of data for your table.  isLoading is a boolean prop that changes to true if quering data and false if it has received the data.
   */

  const { data, isLoading } = useFormatTableData({
    tableName: "suppliers",
    apiEndPoint: "suppliers",
    handleClick: handleOpen,
  });

  /**
   * getSuppliers is the fetch function for react query to leverage.
   *
   * @returns {object} An object that contains the data from the table it's querying.
   */

  const getSuppliers = async () => {
    const suppliers = await apiAxios().get(`/suppliers/${currentRowData?.id}`);
    return suppliers.data.data[0];
  };

  /**
   * returns destructured props from the useFormatTableData hook.
   *
   * @param   {string}         queryKey     - This is the queryKey.  The queryKey acts as a cache identifier for the UseQueryResult.
   * @param   {Function}       getSuppliers - The enpoint as which the API query will use for it's call.
   * @returns {UseQueryResult}              - The result of react query which contains things such as the data.
   */
  // Queries
  const suppliersQuery: UseQueryResult<FormikValues> = useQuery(
    `change_request - ${currentRowData?.id}`,
    getSuppliers,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  const createFormInitialValues = {
    approval_date: null,
    cr_contact: "",
    fiscal_year: null,
    initiated_by: null,
    initiation_date: null,
    link_id: Number(supplierId),
    summary: "",
    // version: "",
  };

  return (
    <>
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
          "new" === formType
            ? `New Supplier`
            : `Supplier ${suppliersQuery?.data?.version}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(suppliersQuery)} />
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
                      apiUrl: `/change_request`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`"/projects/${supplierId}/change_request"`],
                    });
                  }}
                  editFields={editFields()}
                />
              ) : (
                <EditForm
                  initialValues={suppliersQuery?.data as FormikValues}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: suppliersQuery?.data,
                      apiUrl: `suppliers/${suppliersQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`suppliers - ${currentRowData?.id}`, `/suppliers/${supplierId}`],
                    });
                  }}
                  editFields={editFields()}
                />
              )}
            </>
          )}
        </>
      </GDXModal>
    </>
  );
};
