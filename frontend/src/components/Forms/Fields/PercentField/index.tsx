import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import AutoNumeric from "autonumeric";
import { IAutoNumericField } from "types";
import { InputAdornment } from "@mui/material";

export const PercentField = ({
  onChange = () => {},
  id,
  value,
  label,
  helperText,
  error,
  required,
  disabled = false,
  styles = null,
}: IAutoNumericField) => {
  useEffect(() => {
    new AutoNumeric(`#${id}`, value, {
      decimalPlaces: 2,
      allowDecimalPadding: false,
      minimumValue: "0",
      maximumValue: "100",
      decimalCharacter: ".",
      digitGroupSeparator: "",
      decimalPlacesShownOnFocus: 0,
      selectOnFocus: true,
      rawValueDivisor: 100, // Divide by 100 when reading value
      modifyValueOnWheel: false,
    });
  }, [styles, id]);

  return (
    <TextField
      sx={styles}
      fullWidth={true}
      variant={disabled ? "filled" : "outlined"}
      InputProps={{
        startAdornment: <InputAdornment position="start">%</InputAdornment>,
      }}
      id={id}
      onChange={(e) => {
        onChange(Number(e.target.value) / 100);
      }}
      label={label}
      error={Boolean(error)}
      helperText={helperText}
      required={required}
      disabled={disabled}
    />
  );
};
