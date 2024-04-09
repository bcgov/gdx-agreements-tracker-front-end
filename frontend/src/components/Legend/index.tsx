import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { TableHealthChip } from "components/Table/TableHealthChip";
import { ILegendValues } from "types";

export const Legend = ({ legendTitle }: { legendTitle: string }) => {
  const theme = useTheme();

  const lessThanLarge = useMediaQuery(theme.breakpoints.down("lg"));

  const legendValues: ILegendValues[] = [
    { label: "Not Started", color: { red: 255, green: 255, blue: 255 }, caption: "Not Started" },
    { label: "Active", color: { red: 0, green: 255, blue: 0 }, caption: "Active and on-track" },
    {
      label: "Minor",
      color: { red: 255, green: 255, blue: 0 },
      caption: "Active but some concerns need to be monitored closely",
    },
    {
      label: "Major",
      color: { red: 255, green: 0, blue: 0 },
      caption: "Active But Major Concerns and needs corrective action",
    },
    { label: "Complete", color: { red: 90, green: 131, blue: 255 }, caption: "Complete" },
  ];

  return (
    <Card>
      <CardHeader
        subheader={`${legendTitle} Legend`}
        sx={{ background: "#222" }}
        subheaderTypographyProps={{ color: "#fff" }}
      />
      <CardContent>
        <Stack direction={lessThanLarge ? "row" : "column"} spacing={3}>
          {legendValues.map(({ caption, label, color }: ILegendValues) => {
            return (
              <Box key={label} sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <TableHealthChip color={color} caption={caption} />
                <Typography variant="body1" gutterBottom>
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};
