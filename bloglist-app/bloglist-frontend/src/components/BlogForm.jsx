import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Box component="section" sx={{ my: 2 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        create new
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "min(100%, 380px)" }}
      >
        <TextField
          label="title:"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="author:"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="url:"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          create
        </Button>
      </Box>
    </Box>
  );
};

export default BlogForm;
