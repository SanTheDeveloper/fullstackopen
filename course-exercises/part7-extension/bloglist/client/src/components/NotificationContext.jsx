import { Alert, Box } from "@mui/material";
import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification.message === "") {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={notification.type === "success" ? "success" : "error"}>
        {notification.message}
      </Alert>
    </Box>
  );
};

export default Notification;
