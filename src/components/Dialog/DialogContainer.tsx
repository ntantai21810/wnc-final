import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const DIALOG_TYPE = {
  delete: {
    title: "Warning",
    message: "Are you sure you want to delete? This action cannot be undone.",
    buttonText: "Delete",
  },
  reset_password: {
    title: "Warning",
    message: `Are you sure you want to reset the user's password? It will be set to 12341234.`,
    buttonText: "Reset",
  },
  deploy_contract: {
    title: "Confirm",
    message: `Are you sure you want to deploy this contract?`,
    buttonText: "Deploy",
  },
  mint_token: {
    title: "Confirm",
    message: `Are you sure you want to mint this token?`,
    buttonText: "Mint",
  },
  cancel_request: {
    title: "Confirm",
    message: `Are you sure you want to cancel this request?`,
    buttonText: "Cancel",
  },
  save_recipient: {
    title: "Info",
    message: `Do you want to save this account to recipient list?`,
    buttonText: "Save",
  },
};

export interface IDialogContainerProps {
  open: boolean;
  type?: keyof typeof DIALOG_TYPE;
  children?: React.ReactNode;
  title?: string;
  onClose: () => void;
  onAction?: () => void;
  onCancel?: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogContainer(props: IDialogContainerProps) {
  const {
    open,
    type = "delete",
    children,
    title,
    onClose,
    onAction,
    onCancel,
  } = props;

  const _getButtonColor = (type: string) => {
    if (type.startsWith("delete") || type.startsWith("cancel")) return "error";

    return "info";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth={false}
    >
      {children ? (
        <>
          {onClose && (
            <DialogTitle>
              {title}
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
          )}
          <DialogContent>{children}</DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>
            {DIALOG_TYPE[type].title}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>{DIALOG_TYPE[type].message}</DialogContent>
          <DialogActions>
            <Button onClick={onCancel || onClose}>Close</Button>
            <Button
              variant="contained"
              color={_getButtonColor(type)}
              onClick={onAction}
            >
              {DIALOG_TYPE[type].buttonText}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
