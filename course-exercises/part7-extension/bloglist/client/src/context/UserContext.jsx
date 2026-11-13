import { createContext, useReducer, useContext } from "react";

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        user: action.payload,
      };

    case "LOG_OUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => useContext(UserContext)[0].user;

export const useUserDispatch = () => useContext(UserContext)[1];
