import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `ContractResources` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */

//** When a  supplier is chosen in the contract details section, that is the value used to filter the resources for the contract resource section.  Then depending  */
export const ContractResources = () => {
  const { updateSubTitle } = useTitle();

  useEffect(() => {
    updateSubTitle("Contract Resources");
  }, [updateSubTitle]);

  const { contractId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <>
      <TableWithModal
        tableName={"contract_resource"}
        tableConfig={tableConfig()}
        formControls={formControls}
        formConfig={FormConfig}
        tableDataApiEndPoint={`/contracts/${contractId}/resources`}
        formDataApiEndpoint={`/contracts/resources/${formControls.currentRowData?.id}`}
      />
    </>
  );
};
