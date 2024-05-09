import { GridColDef } from "@mui/x-data-grid";
import { sortComparatorByHealth } from "utils";
import { dateFormatter } from "utils/formatDate";
import LineBreak from "utils/LineBreak";

export const tableConfig = () => {
  const largeFlex = 8;
  const defaultFlex = 4;
  const smallFlex = 2;

  const tableColumns: GridColDef[] = [
    {
      field: "status_date",
      headerName: "Status Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "progress", headerName: "Progress", flex: largeFlex },
    { field: "issues", headerName: "Issues", flex: largeFlex },
    { field: "forecast_and_next_steps", headerName: "Forecast", flex: largeFlex },
    { field: "risk", headerName: "Risk", flex: largeFlex },
    {
      field: "schedule_health",
      headerName: "Schedule Health",
      flex: smallFlex,
      renderHeader: (): JSX.Element => LineBreak("Schedule", "Health"),
      sortComparator: sortComparatorByHealth(),
    },
    {
      field: "budget_health",
      headerName: "Budget Health",
      flex: smallFlex,
      renderHeader: (): JSX.Element => LineBreak("Budget", "Health"),
      sortComparator: sortComparatorByHealth(),
    },
    {
      field: "team_health",
      headerName: "Team Health",
      flex: smallFlex,
      renderHeader: (): JSX.Element => LineBreak("Team", "Health"),
      sortComparator: sortComparatorByHealth(),
    },
  ];

  const initialState = {
    sorting: {
      sortModel: [{ field: "status_date", sort: "desc" }],
    },
  };

  return { tableColumns, initialState };
};
