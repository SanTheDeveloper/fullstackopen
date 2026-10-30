import { createContext, useState, useEffect, useRef } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null);

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const notify = (message) => {
    setNotification(message);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setNotification(null);
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
