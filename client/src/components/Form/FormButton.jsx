import { useAppContext } from "../../context/appContext";

const FormButton = ({ type, text }) => {
  const { isLoading } = useAppContext();
  return (
    <button
      type={type}
      className={`btn btn-secondary ${isLoading ? "disabled" : "active"}`}
      disabled={isLoading}
    >
      {text}
    </button>
  );
};

export default FormButton;
