const Notification = ({ msg, type }) => {
  if (msg === "") return null;
  return (
    <div className={`notification ${type === "error" ? "red" : "green"}`}>
      {msg}
    </div>
  );
};

export default Notification;
