import { FormRenderer } from "components/Forms/FormRenderer";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { TotalsDisplay } from "components/TotalsDisplay";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `AgreementSection` component is being returned.
 */

export const AgreementSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <>
      <FormRenderer
        formControls={formControls}
        tableName={"projects"}
        formConfig={FormConfig}
        formDataApiEndpoint={`/projects/${projectId}/agreement`}
      />
      <TotalsDisplay
        apiEndPoint={`/projects/${projectId}/budget/recoverablesbreakdown`}
        tableName="budget"
      />
    </>
  );
};
