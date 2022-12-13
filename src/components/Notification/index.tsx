import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeNotification } from '../../redux/notificationSlice';

export interface INotificationProps {}

export default function Notification(props: INotificationProps) {
  const notification = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const _handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.duration}
      onClose={_handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={_handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert
        onClose={_handleClose}
        severity={notification.type}
        sx={{ width: '100%' }}
      >
        {notification.message}

        {notification.description.length > 0 &&
          notification.description.map((item, index) => (
            <div key={index}>
              <br /> {item}
            </div>
          ))}
      </Alert>
    </Snackbar>
  );
}
