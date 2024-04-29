import { FormRenderer } from "components/Forms/FormRenderer";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { IFormControls } from "types";
import { useFormControls } from "hooks";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import keycloak from "../../../../keycloak";
import { Notify } from "./Notify";

export const CloseOut = () => {
  const { updateSubTitle } = useTitle();

  useEffect(() => {
    updateSubTitle("Close Out");
  }, [updateSubTitle]);

  const { projectId } = useParams();

  const isReadOnly = keycloak.tokenParsed.client_roles.includes("PMO-Admin-Edit-Capability");

  const formControls: IFormControls = useFormControls();
  return (
    <>
      {isReadOnly && <Notify projectId={projectId} />}
      <FormRenderer
        formControls={formControls}
        tableName="projects"
        formConfig={FormConfig}
        formDataApiEndpoint={`/projects/${projectId}/close-out`}
      />
    </>
  );
};
