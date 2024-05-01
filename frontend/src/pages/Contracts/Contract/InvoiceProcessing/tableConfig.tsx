import { apiAxios } from "utils";
import { dateFormatter } from "utils/formatDate";
const defaultFlex = 3;
export const tableConfig = {
  tableColumns: [
    {
      field: "received_date",
      headerName: "Received Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    {
      field: "invoice_date",
      headerName: "Invoice Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "due_date", headerName: "Due Date", valueFormatter: dateFormatter, flex: defaultFlex },
    { field: "billing_period", headerName: "Billing Period", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "invoice_number", headerName: "Invoice Number", flex: defaultFlex },
    { field: "invoice_total", headerName: "Invoice Total", flex: defaultFlex },
    { field: "is_gl", headerName: "General Ledger", flex: defaultFlex },
    { field: "notes", headerName: "Notes", flex: defaultFlex },
  ],
  customSearchParams: async (rowId: number) => {
    return await apiAxios()
      .get(`/invoices/${rowId}/fiscal`)
      .then((customParams) => {
        return customParams;
      });
  },
};
