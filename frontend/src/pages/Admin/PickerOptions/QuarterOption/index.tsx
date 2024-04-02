import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const QuarterOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Quarter Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"quarter_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/quarter_option`}
      formDataApiEndpoint={`/quarter_option/${formControls.currentRowData?.id}`}
    />
  );
};
