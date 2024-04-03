import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Button,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useQueryClient } from "@tanstack/react-query";

/**
 * A dialog component that renders a Material UI Dialog component.
 *
 * @param   {React.ReactNode} children     - The content of the dialog.
 * @param   {boolean}         open         - Whether the dialog is open or not.
 * @param   {Function}        handleClose  - The function to call when the user clicks the close button.
 * @param   {Function}        handleDelete - The function to call when the user confirms deletion.
 * @param   {Function}        formConfig   - Returns a form configuration, including the form Title.
 * @param   {string}          deleteUrl    - The URL to call when the user confirms deletion.
 * @returns {React.ReactNode}              - The rendered component.
 */
interface FormDialogProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: Function;
  handleDelete: (options: { apiUrl: string }) => Promise<void>; // Update the function signature
  deleteUrl: string;
  formTitle: string;
}

const FormDialog: React.FC<FormDialogProps> = ({
  children,
  open,
  handleClose,
  handleDelete,
  deleteUrl,
  formTitle,
}) => {
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteResponse = async () => {
    await handleDelete({ apiUrl: deleteUrl }).then(() => {
      setOpenDeletePrompt(false);
      handleClose();
      queryClient.invalidateQueries();
    });
  };
  return (
    <>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e9e9e9",
          }}
        >
          {formTitle}
          {deleteUrl && (
            <Button
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              color="error"
              onClick={() => {
                setOpenDeletePrompt(true);
              }}
            >
              Delete
            </Button>
          )}
          <IconButton sx={{ ml: "auto" }} onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>

      <Dialog
        open={openDeletePrompt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete this item? There is no way to restore this item
            once it has been deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeletePrompt(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteResponse} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
