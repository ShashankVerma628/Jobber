import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedClientRoute = ({ children }) => {
    const { user } = useAppContext();

    if (!user && user !== "candidate") {
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedClientRoute;
