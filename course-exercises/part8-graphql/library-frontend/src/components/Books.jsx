import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";
import { useState } from "react";

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch all books to generate the available genre buttons
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    skip: !show,
  });

  // Fetch books filtered by the selected genre
  const {
    data: resultData,
    loading: resultLoading,
    error: resultError,
  } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !show,
    fetchPolicy: "cache-and-network",
  });

  if (!show) {
    return null;
  }

  if ((loading && !data) || (resultLoading && !resultData)) {
    return <p>Loading books...</p>;
  }

  if (error || resultError) {
    return <p>Error loading books: {error?.message || resultError?.message}</p>;
  }

  const books = data?.allBooks ?? [];
  const genres = [...new Set(books.flatMap((book) => book.genres))];

  // The backend already filters these books
  const filteredBooks = resultData?.allBooks ?? [];

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <strong>{selectedGenre || "all genres"}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}

        <button type="button" onClick={() => setSelectedGenre(null)}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
