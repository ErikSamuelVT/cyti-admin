import { Alert, AlertColor, Snackbar as MuiSnackbar } from '@mui/material';

type SnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
};

export default function Snackbar({ open, message, severity, onClose }: SnackbarProps) {
  return (
    <MuiSnackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
