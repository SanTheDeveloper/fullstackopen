import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const RecommendedBooks = ({ show }) => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(ME, {
    skip: !show,
  });

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(ALL_BOOKS, {
    skip: !show,
  });

  if (!show) {
    return null;
  }

  if (userLoading || booksLoading) {
    return <p>Loading recommendations...</p>;
  }

  if (userError || booksError) {
    return (
      <p>
        Error loading recommendations:{" "}
        {userError?.message || booksError?.message}
      </p>
    );
  }

  const user = userData?.me;

  if (!user) {
    return <p>Unable to identify the logged-in user. Please log in again.</p>;
  }

  const books = booksData?.allBooks ?? [];
  const favoriteGenre = user.favoriteGenre;

  const favoriteBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre),
  );

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {favoriteBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedBooks;
