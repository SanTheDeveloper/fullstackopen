import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = ({ show, isLoggedIn }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const { data, loading, error } = useQuery(ALL_AUTHORS, {
    skip: !show,
  });
  const [editBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    awaitRefetchQueries: true,
  });

  if (!show) {
    return null;
  }

  if (loading) {
    return <p>Loading authors...</p>;
  }

  if (error) {
    return <p>Error loading authors: {error.message}</p>;
  }

  const authors = data?.allAuthors ?? [];

  const submit = async (event) => {
    event.preventDefault();

    await editBirthYear({
      variables: { name, setBornTo: Number(born) },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoggedIn && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <label htmlFor="name">name</label>
              <select
                id="name"
                name="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                required
              >
                <option value="" disabled>
                  Select an author
                </option>
                {authors.map((author) => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="born">born</label>
              <input
                id="born"
                type="number"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
                required
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
