const key = "loggedBlogappUser";

export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(key);

  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON);
  }

  return null;
};

export const saveUser = (user) => {
  window.localStorage.setItem(key, JSON.stringify(user));
};

export const removeUser = () => {
  window.localStorage.removeItem(key);
};
