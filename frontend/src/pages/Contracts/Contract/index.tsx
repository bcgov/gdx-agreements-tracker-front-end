import { BudgetDisplay } from "components/BudgetDisplay";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IChipNav } from "types";
import { ChipNav } from "../../../components/ChipNav";
import { useEffect } from "react";
import useTitle from "hooks/useTitle";
import { useAxios } from "hooks/useAxios";

/**
 * This reusable component renders the contracts component
 *
 * @param   {object}             query React query that contains all contracts
 * @returns {React.ReactElement}       The contract component
 */

export const Contract = () => {
  const { contractId } = useParams();
  // Queries
  const { axiosAll } = useAxios();
  const { updateTitle } = useTitle();

  const getContract = async () => {
    return await axiosAll()
      .get(`contracts/${contractId}`)
      .then((contractData) => {
        updateTitle(contractData?.data?.data?.contract_number);
      });
  };

  useEffect(() => {
    getContract();
  }, [contractId]);

  const chipNavLinks: IChipNav[] = [
    {
      key: 0,
      name: "Contract Details",
      url: `/contracts/${contractId}`,
    },
    {
      key: 1,
      name: "Resources",
      url: `/contracts/${contractId}/resources`,
    },
    {
      key: 2,
      name: "Deliverables",
      url: `/contracts/${contractId}/deliverables`,
    },
    {
      key: 3,
      name: "GDX Internal Coding",
      url: `/contracts/${contractId}/internal-coding`,
    },
    {
      key: 4,
      name: "Invoice Processing",
      url: `/contracts/${contractId}/invoice-processing`,
    },
    {
      key: 5,
      name: "Amendments",
      url: `/contracts/${contractId}/amendments`,
    },
  ];

  return (
    <>
      {"new" !== contractId && <ChipNav navLinks={chipNavLinks} />}
      <Outlet />
      <BudgetDisplay apiUrl={`/contracts/${contractId}/budgets`} />
    </>
  );
};
