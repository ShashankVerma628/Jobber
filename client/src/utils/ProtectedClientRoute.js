import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedClientRoute = ({ children }) => {
    const { user, logoutUser } = useAppContext();

    if (!user || user.userRole !== "client") {
        logoutUser();
        return <Navigate to="/client/login" />
    }

    return children;
}

export default ProtectedClientRoute;
