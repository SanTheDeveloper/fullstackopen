import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const appendUniqueBook = (existingBooks, bookToAdd) => {
  const alreadyExists = existingBooks.some((b) => b.id === bookToAdd.id);
  return alreadyExists ? existingBooks : existingBooks.concat(bookToAdd);
};

export const addBookToCache = (cache, bookToAdd) => {
  cache.updateQuery({ query: ALL_BOOKS }, (data) => {
    if (!data) {
      return;
    }

    return {
      allBooks: appendUniqueBook(data.allBooks, bookToAdd),
    };
  });

  const genresToUpdate = [null, ...(bookToAdd.genres || [])];

  genresToUpdate.forEach((genre) => {
    cache.updateQuery(
      { query: BOOKS_BY_GENRE, variables: { genre } },
      (data) => {
        if (!data) {
          return;
        }

        return {
          allBooks: appendUniqueBook(data.allBooks, bookToAdd),
        };
      },
    );
  });
};
