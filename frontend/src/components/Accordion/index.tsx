import * as React from "react";
import { Accordion as MUIAccordion } from "@mui/material/";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";
import bcgovTheme from "../../bcgovTheme";
// delete this comment

export const Accordion = ({
  children,
  sectionTitle,
}: {
  children: JSX.Element | JSX.Element[];
  sectionTitle: string;
}) => {
  const StyledAccordionSummary = styled(AccordionSummary)({
    backgroundColor: "#f3f3f3",
  });

  const StyledTypography = styled(Typography)({
    color: bcgovTheme.palette.primary.main,
    fontWeight: "bold",
  });

  return (
    <MUIAccordion defaultExpanded>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        aria-label="button"
      >
        <StyledTypography>{sectionTitle}</StyledTypography>
      </StyledAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MUIAccordion>
  );
};
