import { Box, List, styled, Typography } from "@mui/material";

import bcgovTheme from "../../../bcgovTheme";
import { sidebarMenuLinks } from "./sidebarMenuLinks";
import { SidebarMenuItem } from "./SidebarMenuItem";

const StyledSidebarImageFooter = styled("img")({
  marginTop: "auto",
  width: "80%",
});

const StyledSidebarHorizontalRule = styled("hr")({
  width: "100%",
  borderTop: bcgovTheme?.customSettings?.BCGovAccentLine,
});

const StyledSidebarBox = styled(Box)({
  flexFlow: "column",
  display: "flex",
  height: "100%",
  width: "100%",
});

export const SidebarMenu: React.FC = () => {
  return (
    <StyledSidebarBox>
      <Box p="12px">
        <Typography variant="h6" color="primary.contrastText">
          GDX Agreements Tracker
        </Typography>
      </Box>
      <StyledSidebarHorizontalRule />
      <List component="nav" disablePadding>
        {sidebarMenuLinks.map((item, index) => (
          <SidebarMenuItem {...item} key={index} color={"#fff"} />
        ))}
      </List>

      <StyledSidebarBox p="12px">
        <StyledSidebarImageFooter role="sidebar-logo" alt="bcgov_logo" src="../gov_bc_logo.svg" />
      </StyledSidebarBox>
    </StyledSidebarBox>
  );
};
