import { useApolloClient, useSubscription } from "@apollo/client/react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendedBooks from "./components/RecommendedBooks";
import { BOOK_ADDED } from "./queries";
import { addBookToCache } from "./utils/apolloCache";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(
        `New book added: "${addedBook.title}" by ${addedBook.author.name}`,
      );
      addBookToCache(client.cache, addedBook);
    },
  });

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    setPage("authors");
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors show={page === "authors"} isLoggedIn={Boolean(token)} />

        <Books show={page === "books"} />

        <LoginForm
          show={page === "login"}
          setPage={setPage}
          setToken={setToken}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={onLogout}>logout</button>
      </div>

      <Authors show={page === "authors"} isLoggedIn={Boolean(token)} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <RecommendedBooks show={page === "recommend"} />
    </div>
  );
};

export default App;
