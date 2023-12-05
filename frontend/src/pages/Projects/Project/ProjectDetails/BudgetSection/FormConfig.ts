import { object, string, number } from "yup";
import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import { FormikValues } from "formik";
import _ from "lodash";

// Utilities for this Form
/**
 * Converts a string representing money into a number.
 *
 * This function takes a string input that represents money (e.g., "$1,234.56")
 * and removes any currency symbols and commas before converting it into a
 * floating-point number.
 *
 * @param   {string} str - The money string to convert.
 * @returns {number}     The numeric value of the money string.
 */
const toNumber = (str = "") => _.toNumber(_.replace(str, /[,|$]/g, ""));

/*
 * Sums up Q1 - Q4 amounts and inserts them in the total field when inputs q1-q4 change.
 */
const onChangeQuarterlyAmount = (values: FormikValues, setFieldValue: Function) => {
  // get the quarterly values
  const { q1_amount: q1, q2_amount: q2, q3_amount: q3, q4_amount: q4 } = values;
  // set the value of total
  const quarterlyTotal = String(_.sum([q1, q2, q3, q4].map(toNumber)));

  setFieldValue("total", quarterlyTotal);
};

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();
  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Recovery Area",
          value: query?.data?.data?.data?.recovery_area.label,
        },
        {
          width: "half",
          title: "Deliverable Name",
          value: query?.data?.data?.data?.project_deliverable_id.deliverable_name,
        },
        {
          width: "full",
          title: "Detail Amount",
          value: query?.data?.data?.data?.detail_amount,
        },
        {
          width: "half",
          title: "Q1 Amount",
          value: query?.data?.data?.data?.q1_amount,
        },
        {
          width: "half",
          title: "Q1 Recovered",
          value: query?.data?.data?.data?.q1_recovered,
          type: "checkbox",
        },
        {
          width: "half",
          title: "Q2 Amount",
          value: query?.data?.data?.data?.q2_amount,
        },
        {
          width: "half",
          title: "Q2 Recovered",
          value: query?.data?.data?.data?.q2_recovered,
          type: "checkbox",
        },
        {
          width: "half",
          title: "Q3 Amount",
          value: query?.data?.data?.data?.q3_amount,
        },
        {
          width: "half",
          title: "Q3 Recovered",
          value: query?.data?.data?.data?.q3_recovered,
          type: "checkbox",
        },
        {
          width: "half",
          title: "Q4 Amount",
          value: query?.data?.data?.data?.q4_amount,
        },
        {
          width: "half",
          title: "Q4 Recovered",
          value: query?.data?.data?.data?.q4_recovered,
          type: "checkbox",
        },
        {
          width: "full",
          title: "Total",
          value: query?.data?.data?.data?.total,
        },
        {
          width: "half",
          title: "Resource Type",
          value: query?.data?.data?.data?.resource_type.label,
        },
        {
          width: "half",
          title: "STOB",
          value: query?.data?.data?.data?.stob,
        },
        {
          width: "half",
          title: "Responsibility",
          value: query?.data?.data?.data?.responsibility_centre,
        },
        {
          width: "half",
          title: "Service Line",
          value: query?.data?.data?.data?.service_line,
        },
        {
          width: "half",
          title: "Fiscal",
          value: query?.data?.data?.data?.fiscal_year.label,
        },
        {
          width: "half",
          title: "Program Area",
          value: query?.data?.data?.data?.program_area?.label,
        },
        {
          width: "half",
          title: "Contract",
          value: query?.data?.data?.data?.contract_id.label,
        },
        {
          width: "half",
          title: "Notes",
          value: query?.data?.data?.data?.notes,
        },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Recovery Area",
      fieldName: "recovery_area",
      fieldType: "select",
      pickerName: "recovery_area_option",
    },
    {
      fieldName: "project_deliverable_id",
      fieldLabel: "Deliverable Name",
      fieldType: "autocompleteTable",
      width: "half",
      pickerName: "project_budget_deliverables_option",
      autocompleteTableColumns: [
        { field: "deliverable_name", headerName: "Deliverable Name" },
        { field: "deliverable_id", headerName: "Deliverable ID" },
      ],
      required: true,
      projectId: Number(projectId),
    },

    {
      width: "half",
      fieldLabel: "Detail Amount",
      fieldName: "detail_amount",
      fieldType: "money",
    },
    {
      width: "half",
      fieldLabel: "Q1 Amount",
      fieldName: "q1_amount",
      fieldType: "money",
      onInputChange: onChangeQuarterlyAmount,
      disabled: true,
    },
    {
      width: "half",
      fieldLabel: "Q1 Recovered",
      fieldName: "q1_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q2 Amount",
      fieldName: "q2_amount",
      fieldType: "money",
      onInputChange: onChangeQuarterlyAmount,
    },
    {
      width: "half",
      fieldLabel: "Q2 Recovered",
      fieldName: "q2_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q3 Amount",
      fieldName: "q3_amount",
      fieldType: "money",
      onInputChange: onChangeQuarterlyAmount,
    },
    {
      width: "half",
      fieldLabel: "Q3 Recovered",
      fieldName: "q3_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q4 Amount",
      fieldName: "q4_amount",
      fieldType: "money",
      onInputChange: onChangeQuarterlyAmount,
    },
    {
      width: "half",
      fieldLabel: "Q4 Recovered",
      fieldName: "q4_recovered",
      fieldType: "checkbox",
    },
    {
      width: "full",
      fieldLabel: "Total",
      fieldName: "total",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Resource Type",
      fieldName: "resource_type",
      fieldType: "select",
      tableName: "project_budget",
      pickerName: "resource_type_option",
    },
    {
      width: "half",
      fieldLabel: "Responsibility Centre",
      fieldName: "responsibility_centre",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Service Line",
      fieldName: "service_line",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "STOB",
      fieldName: "stob",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Fiscal",
      fieldName: "fiscal_year",
      fieldType: "select",
      pickerName: "fiscal_year_option",
    },
    {
      width: "half",
      fieldLabel: "Notes",
      fieldName: "notes",
      fieldType: "multiText",
    },
    {
      width: "half",
      fieldLabel: "Program Area",
      fieldName: "program_area",
      fieldType: "select",
      pickerName: "client_coding_option",
      projectId: Number(projectId),
    },
    {
      width: "half",
      fieldLabel: "Contract",
      fieldName: "contract_id",
      fieldType: "select",
      pickerName: "budget_contract_option",
      projectId: Number(projectId),
    },
  ];

  const initialValues = {
    deliverable_name: "",
    recovery_area: null,
    detail_amount: "",
    q1_amount: "",
    q1_recovered: false,
    q2_amount: "",
    q2_recovered: false,
    q3_amount: "",
    q3_recovered: false,
    q4_amount: "",
    q4_recovered: false,
    total: "",
    resource_type: "",
    responsibility_centre: "",
    service_line: "",
    stob: "",
    fiscal_year: "",
    program_area: "",
    contract_id: null,
    notes: null,
  };

  const rowId = _.toNumber(query?.data?.data?.data?.id) ?? null;
  const rowsToLock = null === rowId ? [] : [rowId];
  const postUrl = `/projects/budget`;
  const updateUrl = `/projects/budget/${rowId}`;
  const deleteUrl = `/projects/budget/${query}`;

  // validates that the total field does not exceed the detail_amount field
  const validationSchema = object({
    // make sure the STOB is 4 alpha-numeric characters long
    stob: string()
      .min(4, "Must contain exactly 4 alphanumeric characters.")
      .max(4, "Must contain exactly 4 alphanumeric characters.")
      .matches(/^[A-Za-z0-9]{4}$/, "Must contain exactly 4 alphanumeric characters."),

    // make sure the detail amount is filled in, then convert money to number
    detail_amount: number()
      .transform((value, originalValue) => toNumber(originalValue))
      .required("Detail amount is required")
      .positive(),

    // make sure the total doesn't exceed the sum of the quarters
    total: number()
      .transform((value, originalValue) => toNumber(originalValue))
      .required("Total is required")
      .positive()
      .test("total", "Total should should not exceed the Detail Amount.", (value, { parent }) => {
        const detailAmount = toNumber(parent.detail_amount);
        return value <= detailAmount;
      })
      .test(
        "total",
        "Total should equal the sum of the Q1, Q2, Q3, and Q4 amount.",
        (value, { parent }) => {
          const sumOfQuarters = [
            parent.q1_amount,
            parent.q2_amount,
            parent.q3_amount,
            parent.q4_amount,
          ]
            .map((amount) => toNumber(amount))
            .reduce((acc, amount) => acc + amount);
          return sumOfQuarters === value;
        }
      ),
  });

  return {
    validationSchema,
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    deleteUrl,
  };
};
