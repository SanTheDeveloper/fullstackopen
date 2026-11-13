import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import userService from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      setUser(null);

      try {
        const returnedUsers = await userService.getAll();

        const returnedUser = returnedUsers.find((user) => user.id === id);

        if (!cancelled) {
          setUser(returnedUser);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <Typography>Loading user...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!user) {
    return <Alert severity="warning">User not found</Alert>;
  }

  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0" }}>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Username: {user.username}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        Added blogs
      </Typography>

      {user.blogs.length === 0 ? (
        <Typography color="text.secondary">
          This user has not added any blogs yet.
        </Typography>
      ) : (
        <List disablePadding>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id} divider disableGutters>
              <ListItemText
                primary={blog.title}
                secondary={`${blog.author} · ${blog.likes} likes`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default User;
