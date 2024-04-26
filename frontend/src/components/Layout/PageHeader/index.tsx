import { useContext } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { IPageHeader } from "../../../types";
import { SignoutButton } from "../../SignoutButton";
import { TitleContext } from "context/TitleContext";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { SubTitleContext } from "context";
const drawerWidth = 240;

const appBarStyles = {
  backgroundColor: "#fff",
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
};

const titleStyles = {
  color: "#000",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PageHeader = ({ handleDrawerToggle }: IPageHeader) => {
  const { title } = useContext(TitleContext);
  const { subTitle } = useContext(SubTitleContext);
  return (
    <div>
      <AppBar sx={appBarStyles} role="page-header">
        <Toolbar role="page-header-toolbar">
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            role="sidebar-toggle-button"
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={titleStyles}>
            {title} - {subTitle}
          </Typography>
          <SignoutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};
