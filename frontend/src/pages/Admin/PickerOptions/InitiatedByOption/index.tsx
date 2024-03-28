import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const InitiatedByOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Initiated By Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"initiated_by_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/initiated_by_option`}
      formDataApiEndpoint={`/initiated_by_option/${formControls.currentRowData?.id}`}
    />
  );
};
