import { useSelector } from "react-redux";

const Notification = () => {
  let style = {};
  const notification = useSelector((state) => state.notification);

  if (notification) {
    style = {
      border: "solid",
      padding: 10,
      borderWidth: 1,
    };
  } else {
    style = {
      display: "none",
    };
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
