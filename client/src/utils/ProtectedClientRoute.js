import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedClientRoute = ({ children }) => {
    const { user } = useAppContext();

    if (!user && user !== "client") {
        return <Navigate to="/client/login" />
    }

    return children;
}

export default ProtectedClientRoute;
