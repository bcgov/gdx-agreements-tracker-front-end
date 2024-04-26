import { TableWithModal } from "components/TableWithModal";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import TitleCard from "components/TitleCard";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `ChangeRequest` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

export const InvoiceResources = ({ invoiceId, title }: { invoiceId: number; title: string }) => {
  const { updateSubTitle } = useTitle();

  useEffect(() => {
    updateSubTitle("Contract Invoice Resources");
  }, [updateSubTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TitleCard title={title}>
      <TableWithModal
        tableName={"invoice_detail"}
        tableConfig={tableConfig()}
        formControls={formControls}
        formConfig={(formData) => {
          return FormConfig(formData, invoiceId);
        }}
        tableDataApiEndPoint={`invoices/${invoiceId}/resources`}
        formDataApiEndpoint={`/invoices/resources/${formControls.currentRowData?.id}`}
      />
    </TitleCard>
  );
};
