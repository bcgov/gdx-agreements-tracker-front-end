import { Button, FormControlLabel, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Field } from "formik";
import { usePickerValues } from "../../../hooks";
import { GridItem } from "../FormLayout/GridItem";
import { ReadField } from "components/Forms/ReadForm/ReadField";
import { IOption, IFormInput } from "../../../types";
import { DATE_FORMAT_SHORT_YEAR } from "utils/formatDate";
import dayjs from "dayjs";
import { MoneyField } from "./MoneyField";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { AutocompleteTable } from "./AutocompleteTable";
import { PercentField } from "./PercentField";

export const FormInput = ({
  errors,
  setFieldValue = () => {},
  fieldValue,
  fieldName,
  fieldType,
  fieldLabel,
  handleChange = () => {},
  width,
  pickerName,
  tableName,
  projectId,
  contractId,
  required = false,
  touched,
  autocompleteTableColumns,
  customOnChange = () => {},
  generateValueButton,
  multiple,
  noOptionsMessage,
}: IFormInput) => {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickerValues: any = usePickerValues(projectId, contractId);
  const GetPickerOptions = () => {
    const defaults = {
      associated_table: "_options",
      definition: [{ value: "", label: "No Option table found" }],
      description: "No option",
      id: 0,
      name: "noop",
      title: "No option",
    };
    let options = defaults;
    if (pickerName) {
      options = pickerValues?.data?.pickers["_options"][pickerName];
    } else {
      options = pickerValues?.data?.pickers[tableName as string][fieldName];
    }
    return options ?? defaults;
  };
  switch (fieldType) {
    case "percentage":
      return (
        <>
          <GridItem width={width}>
            <Field
              required={required}
              fullWidth={true}
              as={PercentField}
              name={fieldName}
              onChange={async (newValue: string) => {
                await setFieldValue(fieldName, newValue);
                customOnChange({ [fieldName]: newValue });
              }}
              value={fieldValue}
              label={fieldLabel}
              id={fieldName}
              role={`${fieldName}_input`}
              helperText={touched[fieldName] && errors[fieldName]}
              error={touched[fieldName] && Boolean(errors[fieldName])}
            />
          </GridItem>
        </>
      );
    case "money":
      return (
        <>
          <GridItem width={width}>
            <Field
              required={required}
              fullWidth={true}
              as={MoneyField}
              name={fieldName}
              onChange={async (newValue: string) => {
                await setFieldValue(fieldName, newValue);
                customOnChange({ [fieldName]: newValue });
              }}
              value={fieldValue !== null ? Number(fieldValue.replace(/[^0-9.-]+/g, "")) : "0.00"}
              label={fieldLabel}
              id={fieldName}
              role={`${fieldName}_input`}
              helperText={touched[fieldName] && errors[fieldName]}
              error={touched[fieldName] && Boolean(errors[fieldName])}
            />
          </GridItem>
        </>
      );
    case "date":
      return (
        <GridItem width={width}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
              // placeholder for dates: "DD-Mon-YY"
              fieldMonthPlaceholder: (params) =>
                "letter" === params.contentType ? "Mon" : params.format,
            }}
          >
            <Field
              as={DatePicker}
              id={fieldName}
              label={fieldLabel}
              format={DATE_FORMAT_SHORT_YEAR}
              value={null === fieldValue ? null : dayjs(fieldValue).utc()}
              onChange={(newValue: string) => {
                const formatDate = newValue ? dayjs(newValue).utc().format("YYYY-MM-DD") : null;
                setFieldValue?.(fieldName, formatDate);
              }}
              sx={{
                width: "100%",
              }}
              slotProps={{
                field: { clearable: true },
                textField: {
                  required: required,
                  helperText: touched[fieldName] && errors[fieldName],
                  error: touched[fieldName] && Boolean(errors[fieldName]),
                },
              }}
              role={`${fieldName}_input`}
            />
          </LocalizationProvider>
        </GridItem>
      );
    case "singleText":
      return (
        <GridItem width={width}>
          <>
            <Field
              required={required}
              fullWidth={true}
              as={TextField}
              name={fieldName}
              onChange={(newValue: string) => {
                handleChange(newValue);
              }}
              value={fieldValue}
              label={fieldLabel}
              id={fieldName}
              role={`${fieldName}_input`}
              helperText={touched[fieldName] && errors[fieldName]}
              error={touched[fieldName] && Boolean(errors[fieldName])}
            />
            {generateValueButton && (
              <Button
                onClick={() => {
                  generateValueButton?.buttonFunction(setFieldValue);
                }}
                variant="contained"
              >
                {generateValueButton?.buttonTitle}
              </Button>
            )}
          </>
        </GridItem>
      );
    case "multiText":
      return (
        <GridItem width={width}>
          <Field
            required={required}
            fullWidth={true}
            as={TextField}
            name={fieldName}
            onChange={handleChange}
            label={fieldLabel}
            multiline
            rows={10}
            id={fieldName}
            role={`${fieldName}_input`}
            helperText={touched[fieldName] && errors[fieldName]}
            error={touched[fieldName] && Boolean(errors[fieldName])}
          />
        </GridItem>
      );
    case "select":
    case "multiselect":
      return (
        <GridItem width={width}>
          <Field
            required={required}
            as={Select}
            onChange={(newValue: string) => {
              setFieldValue?.(fieldName, newValue);
              customOnChange(newValue);
            }}
            multiple={"multiselect" === fieldType ? true : false}
            fieldName={fieldName}
            fieldValue={fieldValue as IOption}
            fieldLabel={fieldLabel}
            setFieldValue={setFieldValue as Function}
            pickerData={GetPickerOptions()}
            helperText={touched?.[fieldName] && errors?.[fieldName]}
            error={touched?.[fieldName] && Boolean(errors?.[fieldName])}
            noOptionsMessage={noOptionsMessage}
          />
        </GridItem>
      );
    case "autocompleteTable":
      return (
        <GridItem width={width}>
          <Field
            required={required}
            as={AutocompleteTable}
            onChange={(newValue: string) => {
              setFieldValue?.(fieldName, newValue);
              customOnChange(newValue);
            }}
            fieldName={fieldName}
            fieldValue={fieldValue as IOption}
            fieldLabel={fieldLabel}
            setFieldValue={setFieldValue as Function}
            pickerData={GetPickerOptions()}
            autocompleteTableColumns={autocompleteTableColumns}
            multiple={multiple}
            helperText={touched[fieldName] && errors[fieldName]}
            error={touched[fieldName] && Boolean(errors[fieldName])}
            noOptionsMessage={noOptionsMessage}
          />
        </GridItem>
      );
    case "number":
      return (
        <GridItem width={width}>
          <Field
            required={required}
            fullWidth={true}
            as={TextField}
            type={"number"}
            name={fieldName}
            onChange={handleChange}
            label={fieldLabel}
            id={fieldName}
            role={`${fieldName}_input`}
            helperText={touched[fieldName] && errors[fieldName]}
            error={touched[fieldName] && Boolean(errors[fieldName])}
          />
        </GridItem>
      );
    case "checkbox":
      return (
        <GridItem width={width}>
          <FormControlLabel
            control={
              <Checkbox
                checked={fieldValue as boolean}
                onChange={handleChange}
                fieldName={fieldName}
                setFieldValue={setFieldValue as Function}
                helperText={touched[fieldName] && errors[fieldName]}
                error={touched[fieldName] && Boolean(errors[fieldName])}
              />
            }
            label={fieldLabel}
          />
        </GridItem>
      );
    case "readonly":
      return (
        <ReadField
          width={width}
          title={fieldLabel}
          value={fieldValue as string}
          helperText={touched[fieldName] && errors[fieldName]}
          error={touched[fieldName] && Boolean(errors[fieldName])}
        />
      );
  }
};
