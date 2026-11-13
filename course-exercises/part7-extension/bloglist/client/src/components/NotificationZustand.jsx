import { Alert, Box } from "@mui/material";
import useNotificationStore from "../store/notification";

const Notification = () => {
  const message = useNotificationStore((state) => state.message);
  const type = useNotificationStore((state) => state.type);

  if (message === "") {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={type === "success" ? "success" : "error"}>
        {message}
      </Alert>
    </Box>
  );
};

export default Notification;
