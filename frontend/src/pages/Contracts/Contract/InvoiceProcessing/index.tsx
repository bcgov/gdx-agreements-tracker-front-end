import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import { Grid } from "@mui/material";
import { InvoiceResources } from "./InvoiceResources";
import { InvoiceDeliverables } from "./InvoiceDeliverables";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `InvoiceProcessing` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const InvoiceProcessing = () => {
  const { updateSubTitle } = useTitle();

  useEffect(() => {
    updateSubTitle("Contract Invoice Processing");
  }, [updateSubTitle]);

  const { contractId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <>
      <TableWithModal
        tableName={"invoice"}
        tableConfig={tableConfig}
        formControls={formControls}
        formConfig={FormConfig}
        tableDataApiEndPoint={`/contracts/${contractId}/invoices`}
        formDataApiEndpoint={`/invoices/${formControls.currentRowData?.id}`}
      />
      {formControls.currentRowData && (
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <InvoiceResources invoiceId={formControls.currentRowData?.id} title={"Hourly"} />
          </Grid>
          <Grid item md={6} sm={12}>
            <InvoiceDeliverables
              invoiceId={formControls.currentRowData?.id}
              title={"Fixed Price Deliverables/Expense"}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
