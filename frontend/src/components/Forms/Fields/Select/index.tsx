import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IPickerProps, IOption } from "../../../../types";

/**
 * Renders an Autocomplete/Select component
 *
 * @param   {IPickerProps} props passed into component
 * @returns {JSX.Element}        a JSX select
 */
export const Select: FC<IPickerProps> = ({
  fieldName,
  fieldValue,
  fieldLabel,
  onChange,
  pickerData,
  required,
  multiple,
  helperText,
  error,
}: IPickerProps) => {
  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={"auto"} height={38} />
      ) : (
        <Autocomplete
          id={fieldName}
          options={pickerData?.definition}
          onChange={(event, choice: unknown) => {
            onChange(choice);
          }}
          multiple={multiple}
          value={fieldValue}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              required={required}
              label={fieldLabel ? fieldLabel : pickerData?.title}
              name={fieldName}
              {...params}
              error={Boolean(error)}
              helperText={helperText}
            />
          )}
          isOptionEqualToValue={(option: IOption, value: IOption) => value.value === option.value}
        />
      )}
    </>
  );
};
