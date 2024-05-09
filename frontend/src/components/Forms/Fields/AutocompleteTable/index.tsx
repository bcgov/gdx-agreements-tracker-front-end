import { FC } from "react";
import {
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { IAutocompleteTable, IOption } from "types";
import { ReadField } from "components/Forms/ReadForm/ReadField";

export const AutocompleteTable: FC<IAutocompleteTable> = ({
  fieldName,
  fieldValue,
  fieldLabel,
  onChange,
  pickerData,
  required,
  helperText,
  error,
  autocompleteTableColumns,
  multiple,
  noOptionsMessage,
}: IAutocompleteTable) => {
  const tableCellStyles = {
    width: "100%",
    "&:hover": {
      backgroundColor: "#ddd!important", // Change this to your desired hover color
    },
    borderBottom: "1px solid #D3D3D3",
  };

  /**
   * Extracts a picker label from the first value of an options object.
   * This fixes a console warning about undefined value being returned by getOptionLabel().
   * If the value is undefined, it returns an empty string.
   *
   * @param   {object} option - The object from which to extract the first value.
   * @returns {string}        The first value of the object, or an empty string if the value is undefined.
   */
  const extractLabelFromFirstValue = (option: IOption | string) => {
    const [firstValue] = Object.values(option);
    return firstValue ?? "";
  };

  return !pickerData?.definition?.length ? (
    <TextField
      disabled
      label={fieldLabel ? fieldLabel : pickerData?.title}
      name={fieldName}
      fullWidth
      required={required}
      error
      helperText={
        noOptionsMessage ||
        "There are no options available, Please contact your system administrator to resolve this issue."
      }
    />
  ) : (
    <Autocomplete
      multiple={multiple}
      freeSolo
      id={fieldName}
      autoHighlight
      options={pickerData?.definition}
      onChange={(e, selection) => {
        onChange(selection);
      }}
      value={fieldValue}
      getOptionLabel={extractLabelFromFirstValue}
      componentsProps={{
        paper: {
          sx: {
            width: "100rem",
            maxWidth: "fit-content",
          },
        },
      }}
      renderInput={(params) => {
        return (
          <TextField
            required={required}
            label={fieldLabel ? fieldLabel : pickerData?.title}
            name={fieldName}
            {...params}
            error={Boolean(error)}
            helperText={helperText}
          />
        );
      }}
      renderOption={(props: object, option: IOption) => (
        <Table sx={{ overflowX: "auto", width: "100% " }}>
          {0 === pickerData?.definition.indexOf(option) && (
            <TableHead sx={{ background: "#444", display: "flex" }}>
              <TableRow>
                {autocompleteTableColumns.map((column, index) => (
                  <TableCell key={index} sx={{ paddingLeft: 3, width: 255, color: "#fff" }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            <TableRow {...props} sx={tableCellStyles} hover>
              {Object.keys(option).map(
                (key, index) =>
                  key !== "value" && (
                    <TableCell
                      key={index}
                      sx={{ maxWidth: 100, minWidth: 100, display: "flex", border: "none" }}
                      component="th"
                      scope="row"
                    >
                      {"boolean" === typeof option[key] ? (
                        <ReadField width={""} title={""} value={option[key]} type={"checkbox"} />
                      ) : (
                        option[key]
                      )}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableBody>
        </Table>
      )}
    />
  );
};
