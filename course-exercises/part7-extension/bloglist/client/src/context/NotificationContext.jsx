import { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  message: "",
  type: null,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return {
        message: "",
        type: null,
      };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  useEffect(() => {
    if (notification.message === "") {
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [notification, dispatch]);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => useContext(NotificationContext)[0];
export const useNotificationDispatch = () => useContext(NotificationContext)[1];
