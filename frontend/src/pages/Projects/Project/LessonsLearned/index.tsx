import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const LessonsLearned = () => {
  const { updateSubTitle } = useTitle();

  useEffect(() => {
    updateSubTitle("Project Lessons Learned");
  }, [updateSubTitle]);

  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"project_lesson"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`projects/${projectId}/lessons-learned`}
      formDataApiEndpoint={`/projects/${projectId}/lessons-learned/${formControls.currentRowData?.id}`}
    />
  );
};
