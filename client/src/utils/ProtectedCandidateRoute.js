import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedClientRoute = ({ children }) => {
    const { user, token, logoutUser } = useAppContext();

    if (!user || user.userRole !== "candidate" || !token) {
        logoutUser();
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedClientRoute;
