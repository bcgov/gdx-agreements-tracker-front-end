import { Button, LinearProgress } from "@mui/material";
import { useFormControls } from "hooks";
import FormModal from "../FormModal";
import { Table } from "../Table";
import { useFormatTableData } from "../Table/useFormatTable";
import InputForm from "../InputForm";
import { tableConfig } from "../Pages/ProjectsSandbox/tableConfig";

const TableWithModal = ({ apiEndPoint }: { apiEndPoint: string }) => {
  const {
    handleEditMode,
    handleOpen,
    handleClose,
    // handleCurrentRowData,
    handleFormType,
    formType,
    open,
  } = useFormControls();

  const { data, isLoading } = useFormatTableData({
    apiEndPoint: apiEndPoint,
  });

  const [tableColumns, initialState, selectedRow] = tableConfig();
  return isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Table columns={tableColumns} rows={data.data.data} initialState={initialState} />
      <Button
        onClick={() => {
          handleOpen();
          handleEditMode(true);
          handleFormType("new");
        }}
        variant="contained"
      >
        Add New
      </Button>
      <FormModal open={open} handleClose={handleClose}>
        {"new" === formType && <InputForm formType={formType} selectedRow={selectedRow} />}
        {/* {formType === "read" && <ReadForm fields={selectedRow} />} */}
        {"edit" === formType && <InputForm formType={formType} selectedRow={selectedRow} />}
      </FormModal>
    </>
  );
};

export default TableWithModal;
