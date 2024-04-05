import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Legend } from "components/Legend";

export const Status = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Project Status");
  }, [updateTitle]);

  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={10} xl={11} sx={{ overflowX: "scroll" }}>
        <TableWithModal
          tableName={"project_status"}
          tableConfig={tableConfig()}
          formControls={formControls}
          formConfig={FormConfig}
          tableDataApiEndPoint={`projects/${projectId}/status`}
          formDataApiEndpoint={`/projects/status/${formControls.currentRowData?.id}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={2} xl={1}>
        <Legend legendTitle="Health" />
      </Grid>
    </Grid>
  );
};
