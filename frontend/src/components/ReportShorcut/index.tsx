import { Button } from "@mui/material";
import { apiAxios } from "utils";
import { handleReportExport } from "utils/handleReportExport";

export const ReportShorcut = ({
  config,
  currentRowApiUrl,
}: {
  config: { [key: string]: string | null };
  currentRowApiUrl: string;
}) => {
  const getCurrentRowData = async () => {
    return await apiAxios()
      .get(currentRowApiUrl)
      .then((currentRow) => {
        return currentRow;
      });
  };
  const generateReport = async () => {
    await getCurrentRowData().then((currentRowData) => {
      handleReportExport({ ...currentRowData.data.data, ...config });
    });
  };

  return (
    <Button
      onClick={generateReport}
      color="success"
      variant="outlined"
      //   endIcon={<CheckCircle />}
    >
      {config.buttonText}
    </Button>
  );
};
