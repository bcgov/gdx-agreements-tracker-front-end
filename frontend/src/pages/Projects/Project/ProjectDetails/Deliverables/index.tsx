import { TableWithModal } from "components/TableWithModal";
import { FormConfig } from "./FormConfig";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { Grid } from "@mui/material";
import DeliverablesTotals from "./DeliverablesTotals";
import { Legend } from "components/Legend";

/**
 * A component representing the Deliverables section of a project, displaying a table with modal
 * for project deliverables and a section for deliverables totals.
 *
 * @returns {JSX.Element} JSX element representing the component.
 */

export const DeliverablesSection = (): JSX.Element => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={10} xl={11} sx={{ overflowX: "scroll" }}>
        <TableWithModal
          tableName={"project_deliverable"}
          tableConfig={tableConfig()}
          formControls={formControls}
          formConfig={FormConfig}
          tableDataApiEndPoint={`projects/${projectId}/deliverables`}
          formDataApiEndpoint={`/projects/deliverables/${formControls.currentRowData?.id}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={2} xl={1}>
        <Legend legendTitle="Health" />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <DeliverablesTotals />
      </Grid>
    </Grid>
  );
};
