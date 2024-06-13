import { FormInput } from "components/Forms/Fields";
import { IReportCategoriesAndTypesParameters } from "types";

// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReportParameters = ({
  values,
  setFieldValue,
  categoriesAndTypes,
  touched,
  errors,
}: // todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const renderComponent = (parameter: IReportCategoriesAndTypesParameters) => {
    const { label, required } = parameter;

    // each form input has a unique value added to the key to force a re-render when the value changes
    // this is necessary because the form input component is a controlled component
    switch (label) {
      case "fiscal":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.fiscal}`}
            fieldName="fiscal"
            fieldType={"select"}
            fieldLabel="Fiscal"
            width={"half"}
            pickerName="fiscal_year_option"
            fieldValue={values.fiscal}
            setFieldValue={setFieldValue}
            required={required}
          />
        );

      case "multiFiscal":
        return (
          <>
            <FormInput
              touched={touched}
              key={`${label}`}
              fieldName="fiscalFrom"
              fieldType={"select"}
              fieldLabel="Fiscal From"
              width={"half"}
              pickerName="fiscal_year_option"
              fieldValue={values.fiscalFrom}
              setFieldValue={setFieldValue}
              required={required}
              errors={errors}
            />
            <FormInput
              touched={touched}
              key={`${label}`}
              fieldName="fiscalTo"
              fieldType={"select"}
              fieldLabel="Fiscal To"
              width={"half"}
              pickerName="fiscal_year_option"
              fieldValue={values.fiscalTo}
              setFieldValue={setFieldValue}
              required={required}
              errors={errors}
            />
          </>
        );

      case "portfolio":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.portfolio}`}
            fieldName="portfolio"
            fieldType={"multiselect"}
            fieldLabel="Portfolio"
            width={"half"}
            pickerName="portfolio_option"
            fieldValue={values.portfolio}
            setFieldValue={setFieldValue}
            required={required}
          />
        );

      case "resource":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.resource}`}
            fieldName="resource"
            fieldType={"select"}
            fieldLabel="Contractor Name"
            width={"half"}
            pickerName="resource_option"
            fieldValue={values.resource}
            setFieldValue={setFieldValue}
            required={required}
          />
        );

      case "contract":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.contract}`}
            fieldName="contract"
            fieldType={"select"}
            fieldLabel="Contract"
            width={"half"}
            pickerName="contract_option"
            fieldValue={values.contract}
            setFieldValue={setFieldValue}
            required={required}
          />
        );
      case "date":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.date}`}
            fieldName="date"
            fieldType={"date"}
            fieldLabel="Date"
            width={"half"}
            fieldValue={values.date}
            setFieldValue={setFieldValue}
            required={required}
          />
        );

      case "quarter":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.quarter}`}
            fieldName="quarter"
            fieldType={"select"}
            fieldLabel="Quarter"
            width={"half"}
            tableName="generic"
            fieldValue={values.quarter}
            setFieldValue={setFieldValue}
            required={required}
          />
        );

      case "project_type":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.project_type}`}
            fieldName="project_type"
            fieldType={"select"}
            fieldLabel="Project Type"
            width={"half"}
            tableName="generic"
            fieldValue={values.project_type}
            setFieldValue={setFieldValue}
            required={required}
          />
        );

      case "project":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.project}`}
            fieldName="project"
            fieldType={"select"}
            fieldLabel="Project"
            width={"half"}
            pickerName="project_option"
            fieldValue={values.project}
            setFieldValue={setFieldValue}
            required={required}
          />
        );
      case "subcontractor":
        return (
          <FormInput
            touched={touched}
            key={`${label}-${values.subcontractor}`}
            fieldName="subcontractor"
            fieldType={"select"}
            fieldLabel="Subcontractor"
            width={"half"}
            pickerName="subcontractor_option"
            fieldValue={values.subcontractor}
            setFieldValue={setFieldValue}
            required={required}
          />
        );
    }
  };

  const selectedCategory = categoriesAndTypes.find((item: { value: string }) => {
    return item.value === values.category;
  });

  const selectedType = selectedCategory?.types.find((item: { value: string }) => {
    return item.value === values.type;
  });

  return selectedType.parameters.map((parameter: IReportCategoriesAndTypesParameters) => {
    return renderComponent(parameter);
  });
};
