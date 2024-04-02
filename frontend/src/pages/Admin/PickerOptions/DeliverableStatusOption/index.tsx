import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const DeliverableStatusOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Deliverable Status Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"deliverable_status_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/deliverable_status_option`}
      formDataApiEndpoint={`/deliverable_status_option/${formControls.currentRowData?.id}`}
    />
  );
};
