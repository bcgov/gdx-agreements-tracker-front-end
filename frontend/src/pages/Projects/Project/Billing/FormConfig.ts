import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField, IBillingAmountValidationContext } from "types";
import { useParams } from "react-router-dom";
import formatDate from "utils/formatDate";
import { object, string } from "yup";
import { apiAxios } from "utils";

/**
 * Updates the values in the `recoveredQuarterAmounts` object with the values from the `newValue` object.
 *
 * @param {number | { value: number }} quarter                - The quarter value or an object containing a 'value' property.
 * @param {object}                     fiscal_year_id         - The fiscal year ID object.
 * @param {number}                     fiscal_year_id.value   - The fiscal year ID value.
 * @param {object}                     client_coding_id       - The client coding ID object.
 * @param {number}                     client_coding_id.value - The client coding ID value.
 * @param {string}                     projectId              - The project ID.
 */

const getRecoveredTotalsByQuarter = async (
  quarter: { value: number } | number,
  fiscal_year_id: { value: number },
  client_coding_id: { value: number },
  projectId: string
) => {
  return await apiAxios()
    .get(`/projects/${projectId}/budget/recovered`, {
      params: {
        quarter: "object" === typeof quarter ? quarter.value : quarter,
        fiscal_year_id: fiscal_year_id.value,
        client_coding_id: client_coding_id.value,
      },
    })
    .then((recoveredBudgetSum) => {
      return recoveredBudgetSum?.data?.data?.sum;
    });
};

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Fiscal Year",
          value: query?.data?.data?.data?.fiscal_year_id.label,
        },
        {
          width: "half",
          title: "Quarter",
          value: query?.data?.data?.data?.quarter,
        },
        {
          width: "half",
          title: "Program Area",
          value: query?.data?.data?.data?.client_coding_id?.program_area,
        },
        {
          width: "full",
          title: "Journal Voucher Number",
          value: query?.data?.data?.data?.jv_number,
        },
        {
          width: "full",
          title: "Billed Date",
          value: formatDate(query?.data?.data?.data?.billed_date),
        },
        {
          width: "full",
          title: "Amount",
          value: query?.data?.data?.data?.amount,
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "fiscal_year_id",
      fieldLabel: "Fiscal Year",
      fieldType: "select",
      pickerName: "fiscal_year_option",
      width: "half",
      required: true,
    },
    {
      fieldName: "quarter",
      fieldLabel: "Quarter",
      fieldType: "select",
      width: "half",
      required: true,
      pickerName: "quarter_option",
    },
    {
      fieldName: "client_coding_id",
      fieldLabel: "Program Area",
      fieldType: "autocompleteTable",
      pickerName: "billing_program_area_option",
      autocompleteTableColumns: [
        { field: "program_area", headerName: "Program Area" },
        { field: "client", headerName: "Client" },
        { field: "responsibility_centre", headerName: "Responsibility Centre" },
        { field: "service_line", headerName: "Service Line" },
        { field: "stob", headerName: "STOB" },
        { field: "project_code", headerName: "Project Code" },
        { field: "client_amount", headerName: "Client Amount" },
      ],
      width: "full",
      required: true,
      projectId: Number(projectId),
      noOptionsMessage: `There are no Program Area options available.
      Please confirm that you have entered a Client Coding entry in Project Details > Client Coding.`,
    },
    {
      fieldName: "jv_number",
      fieldLabel: "Journal Voucher Number",
      fieldType: "singleText",
      width: "full",
      required: true,
    },
    {
      fieldName: "billed_date",
      fieldLabel: "Billed Date",
      fieldType: "date",
      width: "full",
      required: true,
    },
    {
      fieldName: "amount",
      fieldLabel: "Amount",
      fieldType: "money",
      width: "full",
      required: true,
    },
  ];

  const initialValues = {
    jv_number: null,
    billed_date: null,
    amount: "$0",
    fiscal_year_id: null,
    client_coding_id: null,
    quarter: null,
    project_id: projectId,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/jv`;
  const updateUrl = `/jv/${query?.data?.data?.data?.id}`;

  // validates that the total field does not exceed the detail_amount field

  const validationSchema = object({
    amount: string().test({
      name: "billing amount validation",
      message: `Amount should be less than the recovered budget or the recovered budget based on your selections may be empty`,
      test: async (value, context: IBillingAmountValidationContext) => {
        const { quarter, fiscal_year_id, client_coding_id } = context.parent;

        if (fiscal_year_id && client_coding_id && quarter && value) {
          const recoveredBudget = await getRecoveredTotalsByQuarter(
            quarter,
            fiscal_year_id,
            client_coding_id,
            projectId as string
          );
          return (
            //parseFloat with regex converts the money formatted string "$100.00" to a number like "100.00.  This is required to do a compare."

            parseFloat(
              recoveredBudget !== "" ? (recoveredBudget as string).replace(/[^0-9.]/g, "") : "0"
            ) <= parseFloat((value as string).replace(/[^0-9.]/g, ""))
          );
        }
        return true;
      },
    }),
    fiscal: object()
      .shape({
        value: string(),
        label: string(),
      })
      .nullable()
      .required("Fiscal is required."),
    quarter: object()
      .shape({
        value: string(),
        label: string(),
      })
      .nullable()
      .required("quarter is required."),
    client_coding_id: object()
      .shape({
        value: string(),
        label: string(),
      })
      .nullable()
      .required("Program Area is required."),
    jv_number: string().nullable().required("Journal Voucher is required."),
    billed_date: string().nullable().required("Billed date is required."),
  });

  const formTitle = "Project Billing";

  return {
    validationSchema,
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    formTitle,
  };
};
