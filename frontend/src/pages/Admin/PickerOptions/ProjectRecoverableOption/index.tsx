import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const ProjectRecoverableOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Recoverable Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_recoverable_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/project_recoverable_option`}
      formDataApiEndpoint={`/project_recoverable_option/${formControls.currentRowData?.id}`}
    />
  );
};
