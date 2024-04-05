import { Chip, Tooltip } from "@mui/material";
import { ITableHealthChip } from "types";

export const TableHealthChip = ({ color, caption }: ITableHealthChip) => {
  const { red, green, blue } = "string" === typeof color ? { red: 0, green: 0, blue: 0 } : color;

  const chipStyles = {
    backgroundColor: "string" === typeof color ? color : `rgb(${red},${green},${blue})`,
    fontWeight: "bold",
    border: "solid 1px #ccc",
    borderRadius: "4px",
    maxHeight: "1.6rem", // make them square in spite of the auto-height on the row cells.
    maxWidth: "1.6rem",
  };

  return (
    <Tooltip title={caption}>
      <Chip sx={chipStyles} />
    </Tooltip>
  );
};
