import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedClientRoute = ({ children }) => {
    const { user, token, logoutUser } = useAppContext();

    if (!user || user.userRole !== "client" || !token) {
        logoutUser();
        return <Navigate to="/client/login" />
    }

    return children;
}

export default ProtectedClientRoute;
