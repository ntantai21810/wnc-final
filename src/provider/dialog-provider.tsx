import * as React from 'react';
import DialogContainer, {
  IDialogContainerProps,
} from '../components/Dialog/DialogContainer';

export interface IDialogProviderProps {
  children: React.ReactNode;
}

export const DialogContext = React.createContext({
  createDialog: (
    _:
      | Pick<IDialogContainerProps, 'onAction' | 'type'>
      | Pick<IDialogContainerProps, 'children' | 'title'>
  ) => {},
  closeDialog: () => {},
});

export default function DialogProvider({ children }: IDialogProviderProps) {
  const [dialogs, setDialogs] = React.useState<IDialogContainerProps[]>([]);

  const createDialog = (
    option:
      | Pick<IDialogContainerProps, 'onAction' | 'type'>
      | Pick<IDialogContainerProps, 'children' | 'title'>
  ) => {
    const dialog = { ...option, onClose: closeDialog, open: true };
    setDialogs((dialogs) => [...dialogs, dialog]);
  };

  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop();
      if (!latestDialog) return dialogs;
      // if (latestDialog.onClose) latestDialog.onClose();
      return [...dialogs].concat({ ...latestDialog, open: false });
    });
  };

  const contextValue = React.useRef({ createDialog, closeDialog });

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => {
        return <DialogContainer key={i} {...dialog} />;
      })}
    </DialogContext.Provider>
  );
}
