import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { categoriesAndTypes } from "./reportSelectorConfig";
import Grid from "@mui/material/Unstable_Grid2";
import { ReportParameters } from "./ReportParameters";
import { ReportTypes } from "./ReportTypes";
import { handleReportExport } from "../../utils/handleReportExport";

const ReportSelector = () => {
  const [typeDescription, setTypeDescription] = useState<string | undefined>("");
  const initialValues = {
    date: null,
    category: null,
    type: null,
    exportType: "pdf",
    templateType: "docx",
  };
  const [PDFExportButtonDisabled, setExportButtonDisabled] = useState<boolean | undefined>(true);
  const [XLSXExportButtonDisabled, setXLSXExportButtonDisabled] = useState<boolean | undefined>(
    true
  );

  const formik = useFormik({
    onSubmit: (values) => {
      handleReportExport(values);
    },
    initialValues: initialValues,
    // TODO Fix this in future PR
    // validationSchema: object().shape({
    //   fiscalFrom: object({ value: number(), label: string() }),
    //   fiscalTo: object({ value: number().required(), label: string().required() })
    //     .required()
    //     .test(
    //       "fiscalTo-greater-than-fiscalFrom",
    //       "Fiscal To must be greater than Fiscal From",
    //       (value, { parent }) => {
    //         const fiscalFrom = parent.fiscalFrom.label;
    //         const fiscalTo = value.label;

    //         if (!fiscalTo) return;

    //         // Extract the year from the fiscal period (e.g. "14-15" -> 14)
    //         const fiscalFromYear = parseInt(fiscalFrom.split("-")[0], 10);
    //         const fiscalToYear = parseInt(fiscalTo.split("-")[0], 10);
    //         // Check if fiscalTo is greater than or equal to fiscalFrom

    //         return fiscalToYear >= fiscalFromYear;
    //       }
    //     ),
    // }),
  });

  const resetAllParameters = () => {
    setFieldValue("fiscal", null);
    setFieldValue("portfolio", []);
    setFieldValue("contract", null);
    setFieldValue("date", null);
    setFieldValue("quarter", null);
    setFieldValue("project", null);
    setFieldValue("project_type", null);
  };

  const { setFieldValue, values, handleSubmit, touched, errors } = formik;

  const handleCategoryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setFieldValue("category", event.target.value);
    setFieldValue("type", "");
    setTypeDescription("");
  };

  const handleTypeChange = (event: { target: { value: string } }) => {
    resetAllParameters();
    setFieldValue("type", event.target.value);
    const selectedCategory = categoriesAndTypes.find((item: { value: string }) => {
      return item.value === values.category;
    });

    const selectedType = selectedCategory?.types.find((item: { value: string }) => {
      return item.value === event.target.value;
    });
    setXLSXExportButtonDisabled(selectedType?.exportXLSX);
    setExportButtonDisabled(selectedType?.exportPDF);
    setTypeDescription(selectedType?.description);
  };

  const handleExportType = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    templateType: string,
    exportType: string
  ) => {
    setFieldValue("templateType", templateType);
    setFieldValue("exportType", exportType);
    //This triggers the formik on submit function defined above
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Category
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="category"
                    value={values.category}
                    onChange={handleCategoryChange}
                  >
                    {categoriesAndTypes.map((category: { value: string; label: string }) => {
                      return (
                        <FormControlLabel
                          value={category.value}
                          control={<Radio />}
                          label={category.label}
                          key={category.label}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            {values.category && (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Type
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup name="type" value={values.type} onChange={handleTypeChange}>
                      <ReportTypes values={values} categoriesAndTypes={categoriesAndTypes} />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {typeDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            {values.type && (
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Parameters
                  </Typography>
                  <ReportParameters
                    values={values}
                    setFieldValue={setFieldValue}
                    categoriesAndTypes={categoriesAndTypes}
                    touched={touched}
                    errors={errors}
                  />
                  <CardActions>
                    <Button
                      variant="contained"
                      disabled={!XLSXExportButtonDisabled}
                      onClick={(event) => {
                        handleExportType(event, "xlsx", "xlsx");
                      }}
                      type="submit"
                    >
                      Export xls
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!PDFExportButtonDisabled}
                      onClick={(event) => {
                        handleExportType(event, "docx", "pdf");
                      }}
                      type="submit"
                    >
                      Export pdf
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  );
};

export default ReportSelector;
