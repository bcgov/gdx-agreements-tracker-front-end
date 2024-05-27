import { GridColDef } from "@mui/x-data-grid";
import LineBreak from "utils/LineBreak";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 4;
  const largeFlex = 8;

  const tableColumns: GridColDef[] = [
    {
      field: "recovery_area",
      headerName: "Recovery Area",
      flex: largeFlex,
      renderHeader: (): JSX.Element => LineBreak("Recovery", "Area"),
    },
    {
      field: "project_deliverable_id",
      headerName: "Deliverable Name",
      flex: largeFlex,
      renderHeader: (): JSX.Element => LineBreak("Deliverable", "Name"),
    },
    {
      field: "detail_amount",
      headerName: "Deliverable Amount",
      flex: largeFlex,
      renderHeader: (): JSX.Element => LineBreak("Detail", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "q1_amount",
      headerName: "Q1 Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q1", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "q1_recovered",
      headerName: "Q1 Recovered",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q1", "Recovered"),
    },
    {
      field: "q2_amount",
      headerName: "Q2 Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q2", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "q2_recovered",
      headerName: "Q2 Recovered",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q2", "Recovered"),
    },
    {
      field: "q3_amount",
      headerName: "Q3 Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q3", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "q3_recovered",
      headerName: "Q3 Recovered",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q3", "Recovered"),
    },
    {
      field: "q4_amount",
      headerName: "Q4 Amount",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q4", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "q4_recovered",
      headerName: "Q4 Recovered",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Q4", "Recovered"),
    },
    {
      field: "total",
      headerName: "Total",
      flex: defaultFlex,
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "resource_type",
      headerName: "Resource Type",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Resource", "Type"),
    },
    { field: "stob", headerName: "STOB", flex: defaultFlex },
    {
      field: "responsibility_centre",
      headerName: "Responsibility",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Resource", "Type"),
    },
    {
      field: "service_line",
      headerName: "Service Line",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Service", "Line"),
    },
    {
      field: "fiscal",
      headerName: "Fiscal",
      flex: defaultFlex,
    },
    {
      field: "client_coding_id",
      headerName: "Program Area",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Program", "Area"),
    },
    { field: "contract_id", headerName: "Contract", flex: defaultFlex },
    { field: "notes", headerName: "Notes", flex: largeFlex },
  ];

  return { tableColumns };
};
