import { Checkbox } from "@mui/material";
import { GridCell, GridRenderCellParams } from "@mui/x-data-grid";
import { TableHealthChip } from "../components/Table/TableHealthChip";
import { TableObjectViewer } from "components/Table/TableObjectViewer";

export const useRenderTableCell = (params: GridRenderCellParams) => {
  if ("boolean" === typeof params.value) {
    return (
      <GridCell {...params}>
        <Checkbox disabled checked={params.value} />
      </GridCell>
    );
  }

  if (
    params.value &&
    params.value.red !== undefined &&
    params.value.green !== undefined &&
    params.value.blue !== undefined
  ) {
    return (
      <GridCell {...params}>
        {" "}
        <TableHealthChip color={params.value} />
      </GridCell>
    );
  }

  if ("api_body" === params?.field) {
    return <TableObjectViewer ObjectToView={params.value} />;
  }

  return <GridCell {...params} />;
};
