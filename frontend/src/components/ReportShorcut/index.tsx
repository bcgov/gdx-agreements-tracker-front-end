import { Button, Stack } from "@mui/material";
import { apiAxios } from "utils";
import { handleReportExport } from "utils/handleReportExport";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { NotificationSnackBar } from "components/NotificationSnackbar";
import { useSnackbar } from "hooks/useSnackbar";

export const ReportShorcut = ({
  reportConfig,
  currentRowApiUrl,
}: {
  // reportConfig: { [key: string]: string | null };
  reportConfig: { [key: string]: string | null }[];
  currentRowApiUrl: string;
}) => {
  const { handleSnackbar, snackbarOpen } = useSnackbar();

  const getCurrentRowData = async () => {
    return await apiAxios()
      .get(currentRowApiUrl)
      .then((currentRow) => {
        return currentRow;
      });
  };

  const generateReport = async (config: { [key: string]: string | null }) => {
    if (currentRowApiUrl.includes("undefined")) {
      handleSnackbar(true);
      return;
    } else {
      await getCurrentRowData().then((currentRowData) => {
        handleReportExport({ ...currentRowData.data.data, ...config });
      });
    }
  };
  return (
    <Stack direction="row" spacing={2} sx={{ paddingBottom: "1rem" }}>
      {reportConfig.map((config: { [key: string]: string | null }) => {
        return (
          <Button
            key={config.type}
            onClick={() => {
              generateReport(config);
            }}
            color="success"
            variant="contained"
            endIcon={<SummarizeIcon />}
          >
            {config.buttonText}
          </Button>
        );
      })}
      <NotificationSnackBar
        snackbarMessage={"No row selected to run the report. Please select a row and try again."}
        snackbarOpen={snackbarOpen}
        snackbarType={"error"}
        handleSnackbar={handleSnackbar}
      />
    </Stack>
  );
};
