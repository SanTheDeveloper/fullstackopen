import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    handleLogin({ username, password });

    setUsername("");
    setPassword("");
  };

  return (
    <Box component="section" sx={{ my: 2 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Log in to application
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 1, width: 260, ml: 2 }}
      >
        <TextField
          label="username"
          variant="standard"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="password"
          type="password"
          variant="standard"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
