import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { Accordion } from "../../../../components/Accordion";
import { AgreementSection } from "./AgreementSection";
import { BudgetSection } from "./BudgetSection";
import { ClientCodingSection } from "./ClientCodingSection";
import { ContactsSection } from "./ContactsSection";
import { DeliverablesSection } from "./Deliverables";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";

/* This code exports a functional component called `ProjectDetails` that renders a series of
`Accordion` components, each containing a different section of information related to a project. */
export const ProjectDetails = () => {
  const { updateSubTitle } = useTitle();

  useEffect(() => {
    updateSubTitle("Project Details");
  }, [updateSubTitle]);
  return (
    <>
      <Accordion sectionTitle="Project Registration">
        <ProjectRegistrationSection />
      </Accordion>
      <Accordion sectionTitle="Agreement">
        <AgreementSection />
      </Accordion>
      <Accordion sectionTitle="Contacts">
        <ContactsSection />
      </Accordion>
      <Accordion sectionTitle="Deliverables">
        <DeliverablesSection />
      </Accordion>
      <Accordion sectionTitle="Client Coding">
        <ClientCodingSection />
      </Accordion>
      <Accordion sectionTitle="Budget">
        <BudgetSection />
      </Accordion>
    </>
  );
};
