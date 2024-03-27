import { Autocomplete, TextField } from "@mui/material";
import { ListItem } from "@mui/material";
import SidebarMenuItemComponent from "../SidebarMenuItem/SidebarMenuItemComponent";

export const PickerOptionsMenu = () => {
  const menuItems = [
    {
      label: "Billing Period Option",
      link: "/admin/billing-period-option",
    },
    {
      label: "Contract Status Option",
      link: "/admin/contract-status-option",
    },
    {
      label: "Contacts",
      link: "/admin/contacts",
    },
    {
      label: "Ministries / Org Name",
      link: "/admin/ministries",
    },
    {
      label: "Project Agreement Types",
      link: "/admin/project-agreement-types",
    },
    {
      label: "Resources",
      link: "/admin/resources",
    },
    {
      label: "Suppliers",
      link: "/admin/suppliers",
    },
    {
      label: "Subcontractors",
      link: "/admin/subcontractors",
    },
    { label: "Yes/No Option", link: "/admin/yes-no-option" },
  ];

  return (
    <ListItem>
      <Autocomplete
        disablePortal
        options={menuItems}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Picker Options" />}
        renderOption={(props, option) => {
          const { label, link } = option;
          return (
            <SidebarMenuItemComponent url={link}>
              <span>{label}</span>
            </SidebarMenuItemComponent>
          );
        }}
      />
    </ListItem>
  );
};
