import { useNavigate } from "react-router";
import { useField, useAnecdotes } from "../hooks";

const CreateNew = () => {
  const { reset: resetContent, ...contentProps } = useField("text");
  const { reset: resetAuthor, ...authorProps } = useField("text");
  const { reset: resetInfo, ...infoProps } = useField("text");
  const { addAnecdote: addAnecdote } = useAnecdotes();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAnecdote({
        content: contentProps.value,
        author: authorProps.value,
        info: infoProps.value,
        votes: 0,
      });

      navigate("/");
    } catch (error) {
      console.error("Could not create anecdote:", error);
    }
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentProps} />
        </div>

        <div>
          author
          <input name="author" {...authorProps} />
        </div>

        <div>
          url for more info
          <input name="info" {...infoProps} />
        </div>

        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
