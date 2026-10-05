import { Alert, Box } from "@mui/material";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={type === "success" ? "success" : "error"}>{message}</Alert>
    </Box>
  );
};

export default Notification;
