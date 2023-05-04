import { useAppContext } from "../context/appContext";

const Alert = () => {
  const { showAlert, alertType, alertText } = useAppContext();
  return (
    <div
      className={`alert-container ${showAlert ? "active" : ""} ${alertType}`}
    >
      {alertText}
    </div>
  );
};

export default Alert;
