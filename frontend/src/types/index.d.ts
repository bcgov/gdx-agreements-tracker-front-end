import { GridRowsProp, GridColDef, GridInitialState } from "@mui/x-data-grid";
import { Schema } from "yup";
import { FormikErrors, FormikTouched, FormikValues } from "formik";

export interface IBillingAmountValidationContext {
  parent: {
    quarter: { value: number };
    fiscal_year_id: { value: number };
    client_coding_id: { value: number };
  };
}

export interface IUseAxiosHandleError {
  response: {
    data: {
      data: {
        message: {
          length: number;
          name: string;
          severity: string;
          code: string;
          detail: string;
          schema: string;
          table: string;
          constraint: string;
          file: string;
          line: string;
          routine: string;
        };
      };
    };
    status: number;
    statusText: string;
  };
}

export interface ILegendValues {
  label: string;
  color: string;
  caption: string;
}
// Data Structures
export interface IUser {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;
  username: string;
  capabilities: string[];
}

// Hooks
export interface IUseDrawer {
  drawerOpen: boolean;
  handleDrawerToggle: (event: React.MouseEvent<HTMLElement>) => void;
}

// Components
export interface IPageHeader extends IUseDrawer {
  headerTitle: string;
}

export type ISidebar = IUseDrawer;

export interface ITable {
  rows: GridRowsProp;
  columns: GridColDef[];
  initialState?: GridInitialState;
  totalColumns?: string[];
  loading: boolean;
  onRowClick?: Function;
  allowEdit?: boolean;
}

// Tables
export interface IColumn {
  id: number;
  field: string;
  headerName: string;
  flex: number;
}

export interface ITableData {
  data: {
    data: Array<Object>;
    user: Array<Object>;
  };
}

// Project layout types
export interface IFormLayout {
  children: JSX.Element[] | JSX.Element;
}

//Picker Types
export interface IPickerLookupData {
  id: number;
  name: string;
  title: string;
  description: string;
  definition: { dropDownValues: { data: Array<Object> } };
}

//picker options types
export interface IPickerProps {
  error: boolean;
  fieldLabel?: string;
  fieldName?: string;
  fieldValue: IOption;
  handleChange: Function;
  helperText: string;
  multiple?: boolean;
  onChange: Function;
  pickerData: {
    associated_table: string;
    definition: IOption[];
    description: string;
    id: number;
    name: string;
    title: string;
  };
  required?: boolean;
  noOptionsMessage?: string;
}
export interface IAutocompleteTable extends IPickerProps {
  autocompleteTableColumns: { field: string; headerName: string }[];
  fieldValue: IOption;
  noOptionsMessage?: string;
}

// Picker options for multiselect inputs.
export interface IMultiPickerProps extends Omit<IPickerProps, "fieldValue"> {
  fieldValue: IOption[];
  multiple: boolean;
}

//checkbox types
export interface ICheckboxProps {
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  checked: boolean;
  fieldName: string | number;
  setFieldValue: Function;
  helperText: string;
  error?: boolean;
}

export interface IPickerTableData {
  data: {
    data: [
      {
        associated_table: string;
        definition: [IOption];
        description: string;
        id: number;
        name: string;
        title: string;
      }
    ];
  };
}

export interface IProjectLayout {
  children: JSX.Element;
}

//Picker Types
export interface IPickerLookupData {
  id: number;
  name: string;
  title: string;
  description: string;
  definition: { dropDownValues: { data: Array<Object> } };
}

//ChipNav Types
export interface IChipNav {
  key: number;
  name: string;
  url: string;
}

//Change Request row Props

export interface IChangeRequestRow {
  approval_date: string;
  cr_contact: string;
  fiscal_year: number;
  id: number;
  initiated_by: string;
  initiation_date: string;
  link_id: number;
  summary: string;
  version: string;
}

export interface IFormControls {
  handleEditMode: Function;
  handleOpen: Function;
  handleClose: Function;
  handleCurrentRowData: Function;
  open: boolean;
  editMode: boolean;
  currentRowData: { id };
  handleFormType: Function;
}

export interface IUseFormSubmitHandleSubmit {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changedValues: any;
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentRowData: any;
  apiUrl: string;
  handleEditMode?: Function;
  queryKeys?: string[];
  successMessage?: string;
  errorMessage?: string;
  tableName?: string;
}

export interface IUseFormSubmitHandlePost {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValues: any;
  apiUrl: string;
  handleEditMode?: Function;
  queryKeys?: string[];
  successMessage?: string;
  errorMessage?: string;
  handleClose?: Function;
}
export type IEditFieldsFieldType =
  | "select"
  | "multiselect"
  | "date"
  | "singleText"
  | "multiText"
  | "checkbox"
  | "number"
  | "readonly"
  | "money"
  | "autocompleteTable"
  | "percentage";

export type IWidth = "half" | "full";

export type IReturnValue =
  | string
  | number
  | boolean
  | string[]
  | IOption
  | (Key | null | undefined);

interface IGenerateValueButton {
  buttonTitle: string;
  buttonFunction: Function;
}

export interface IEditField {
  fieldName: string | number;
  fieldType: IEditFieldsFieldType;
  fieldLabel: string;
  width: IWidth;
  tableName?: string;
  projectId?: number | undefined;
  contractId?: number | undefined;
  pickerName?: string;
  required?: boolean;
  autocompleteTableColumns?: IAutocompleteTable[autocompleteTableColumns];
  customOnChange?: Function;
  generateValueButton?: IGenerateValueButton;
  multiple?: boolean;
  noOptionsMessage?: string;
}

export interface IReadField {
  width: IWidth;
  title: string;
  value: IReturnValue;
}

export interface IInitialValues {
  [key: string]: IReturnValue;
}

/**
 * Used for FormInput component.
 */
export interface IFormInput {
  errors?: FormikErrors;
  setFieldValue?: Function;
  fieldValue: string | number | boolean | IOption | IOption[] | date;
  fieldName: string | number;
  fieldType: IEditFieldsFieldType;
  fieldLabel: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  width: "half" | "full";
  tableName?: string;
  pickerName?: string;
  projectId?: number | undefined;
  contractId?: number | undefined;
  required?: boolean;
  touched: FormikTouched<FormikValues>;
  autocompleteTableColumns?: IAutocompleteTable[autocompleteTableColumns];
  customOnChange?: Function;
  generateValueButton?: IGenerateValueButton;
  multiple?: boolean;
  noOptionsMessage?: string;
}

export interface IRadioGroup {
  name: string;
  formLabel: string;
  defaultValue: string;
  options: {
    parent: string | null;
    value: string;
    label: string;
  }[];
}

export interface IRadioButton {
  parent: string | null;
  value: string;
  label: string;
}
[];

export interface ICheckbox {
  id: string;
  label: string;
  input: string;
  defaultValue: string;
  parents: string[];
  options: IOption[];
}

export interface IDate {
  parents: string[];
  id: string;
  label: string;
  input: string;
  defaultValue: string;
  options: IOption[];
}

export interface IOption {
  value: number | string;
  [key: string]: string;
}

export interface ISelect {
  id: string;
  label: string;
  input: string;
  defaultValue: string;
  parents: string[];
  options: IOption[];
}

export interface IDescription {
  name: string;
  formLabel: string;
  options: { id: number; value: string; parent: string }[];
}

export interface ICapability {
  getAll: string;
  getOne: string;
  updateOne: string;
  addOne: string;
  deleteOne?: string;
}

export interface ICurrentUser {
  id: number;
  name: string;
  email: string;
  role_id: {
    value: number;
    label: string;
  };
}

export interface IWhat {
  single: string;
  plural: string;
}
export interface IList {
  data: Array<{ [key: string]: number | string }>;
  title: string;
}

export interface IStandardRow {
  [key: string]: string | number;
}

export interface IBudget {
  fiscal: string;
  invoiced_expenses: number;
  invoiced_fees: number;
  invoiced_hours: number;
  remaining_expenses: number;
  remaining_fees: number;
  remaining_hours: number;
  total_expenses: number;
  total_fees: number;
  total_hours: number;
}

export interface IReportParamOptions {
  reportCategory: string;
  value: string;
  label: string;
  reportParamCategory: {
    field: IEditField;
    type: number;
    isRequired: boolean;
    hasXls: boolean;
  }[];
}

export interface IReportParams {
  name: string;
  formLabel: string;
}

export interface IModal {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
  modalTitle: string;
  handleEditMode: Function;
  editMode: boolean;
  handleDelete: Function;
  handleFormType: Function;
}

export interface IFormRenderer {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControls?: any;
  tableName: string;
  formConfig;
  formDataApiEndpoint: string;
  authorizedToEdit?: string;
}
export interface IDBRowlock {
  data: { data: { table: string } };
}

export interface ILockData {
  data: { locked: boolean; lockedBy: string };
}
export interface IContactRole {
  role_id: number;
  role_type: string;
  contacts: Array<IOption>;
}

export type YupSchema<T> = {
  [K in keyof T]: Schema<T[K]>;
};

export type TFormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  deleteUrl?: string;
  readFields: {
    width: string;
    title: string;
    value: string | number | boolean;
  }[];
  editFields: IEditField[];
  initialValues: {};
  rowsToLock: number[];
  postUrl: string;
  updateUrl: string;
  validationSchema?: YupSchema<{ [key]: Function }>;
  authorizedToEdit?: string;
  formTitle?: string;
};

export interface ITableWithModalData {
  data: {
    data: {
      data: {
        [key: string]: unknown;
      };
    };
  };
  isLoading: boolean;
}
export interface ITableWithModal {
  tableDataApiEndPoint: string;
  // todo: Need to update all table configs to be an object for this to be a good type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableConfig: any;
  formControls: IFormControls;
  formConfig: TFormConfig;
  tableName: string;
  formDataApiEndpoint: string;
  handleRowDoubleClick?: Function;
}

export interface IRowDoubleClickParams {
  row: { [key: string]: string | number | boolean };
}

export interface Irgb {
  rgb: { red: number; green: number; blue: number; health_name: string };
}

export type ConvertToStringItem =
  | {
      value: string | null;
    }
  | string;

export type UpdatedSearchParams = {
  templateType: string;
  [key: string]: string;
};

export type IReportCategoriesAndTypesParameters = { label: string; required: boolean };

export type IReportCategoriesAndTypes = {
  value: string;
  label: string;
  types: {
    value: string;
    label: string;
    description: string;
    parameters: IReportCategoriesAndTypesParameters[];
    exportPDF: boolean;
    exportXLSX: boolean;
  }[];
}[];

export interface IAutoNumericField {
  helperText?: string;
  error?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id: string;
  value: number;
  label: string;
  required?: boolean;
  disabled?: boolean;
  styles?: Object | null;
}

export interface IReadOnlyTableProps {
  apiEndPoint: string;
  tableName: string;
  title: string;
  mdSize?: number;
  lgSize?: number;
  xlSize?: number;
}

// For setting formic fields programmatically
export interface IFormikFieldValues {
  formikValues: FormikValues;
  setFieldValue: Function;
  newValue: { [key: string]: string };
}
