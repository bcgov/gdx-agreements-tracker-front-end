import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { TableData } from "components/TableData";
/**
 * The Amendments page
 *
 * @returns {JSX.Element} Amendments
 */

export const Billing: FC = (): JSX.Element => {
  /**
   * returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
   * reference: https://reactrouter.com/docs/en/v6/hooks/use-params
   *
   * @returns {string} contractId
   */

  const { projectId } = useParams();

  return (
    <>
      <TableData
        itemName="Journal Voucher"
        tableName="jv"
        getOneUrl={`jv/{id}`}
        getAllUrl={`projects/${projectId}/jv`}
        createFormInitialValues={{}}
        readFields={readFields}
        editFields={editFields}
      />
    </>
  );
};
