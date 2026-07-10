const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderColor: type === "success" ? "green" : "red",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
