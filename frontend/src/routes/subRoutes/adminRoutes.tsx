import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Admin } from "../../pages";
import { Contacts } from "../../pages/Admin/Contacts";
import { Subcontractors } from "../../pages/Admin/Subcontractors";
import { Suppliers } from "../../pages/Admin/Suppliers";
import { Ministries } from "../../pages/Admin/Ministries";
import { Resources } from "../../pages/Admin/Resources";
import { Glossary } from "pages/Admin/Glossary";
import { Users } from "pages/Admin/Users";
import { Logs } from "pages/Admin/Logs";
import { ProjectAgreementTypeOptions } from "pages/Admin/ProjectAgreementTypes";
import { YesNoOptions } from "pages/Admin/PickerOptions/YesNoOption";
import { BillingPeriodOption } from "pages/Admin/PickerOptions/BillingPeriodOption";
import { ContractStatusOption } from "pages/Admin/PickerOptions/ContractStatusOption";
import { ContractTypeOption } from "pages/Admin/PickerOptions/ContractTypeOption";
import { ProjectStatusOption } from "pages/Admin/PickerOptions/ProjectStatusOption";
import { ProjectTypeOption } from "pages/Admin/PickerOptions/ProjectTypeOption";
import { ProjectFundingOption } from "pages/Admin/PickerOptions/ProjectFundingOption";
import { ProjectRecoverableOption } from "pages/Admin/PickerOptions/ProjectRecoverableOption";
import { InitiatedByOption } from "pages/Admin/PickerOptions/InitiatedByOption";
import { DeliverableStatusOption } from "pages/Admin/PickerOptions/DeliverableStatusOption";
import { QuarterOption } from "pages/Admin/PickerOptions/QuarterOption";
import { ProjectBudgetResourceTypeOption } from "pages/Admin/PickerOptions/ProjectBillingResourceTypeOption";

/*
 * Routes for Admin pages.
 */
const routes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    }
  >
    ,
    <Route key="contacts" path="contacts" element={<Contacts />} />
    <Route key="suppliers" path="suppliers" element={<Suppliers />} />
    <Route key="subcontractors" path="subcontractors" element={<Subcontractors />} />
    <Route key="resources" path="resources" element={<Resources />} />
    <Route key="ministries" path="ministries" element={<Ministries />} />
    <Route key="glossary" path="glossary" element={<Glossary />} />
    <Route key="users" path="users" element={<Users />} />
    <Route key="logs" path="logs" element={<Logs />} />
    <Route
      key="project-agreement-types"
      path="project-agreement-types"
      element={<ProjectAgreementTypeOptions />}
    />
    <Route key="yes-no-option" path="yes-no-option" element={<YesNoOptions />} />
    <Route
      key="billing-period-option"
      path="billing-period-option"
      element={<BillingPeriodOption />}
    />
    <Route
      key="contract-status-option"
      path="contract-status-option"
      element={<ContractStatusOption />}
    />
    <Route
      key="contract-type-option"
      path="contract-type-option"
      element={<ContractTypeOption />}
    />
    <Route
      key="project-status-option"
      path="project-status-option"
      element={<ProjectStatusOption />}
    />
    <Route key="project-type-option" path="project-type-option" element={<ProjectTypeOption />} />
    <Route
      key="project-funding-option"
      path="project-funding-option"
      element={<ProjectFundingOption />}
    />
    <Route
      key="project-recoverable-option"
      path="project-recoverable-option"
      element={<ProjectRecoverableOption />}
    />
    <Route key="initiated-by-option" path="initiated-by-option" element={<InitiatedByOption />} />
    <Route
      key="deliverable-status-option"
      path="deliverable-status-option"
      element={<DeliverableStatusOption />}
    />
    <Route key="quarter-option" path="quarter-option" element={<QuarterOption />} />
    <Route
      key="project-budget-resource-type-option"
      path="project-budget-resource-type-option"
      element={<ProjectBudgetResourceTypeOption />}
    />
  </Route>,
];

export default routes;
