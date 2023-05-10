import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loader from "./Layout/Loader";

const ClientDetails = ({ clientId }) => {
  const { isLoading, getClientDetails, clientDetails } = useAppContext();

  useEffect(() => {
    getClientDetails(clientId);
  }, []);

  if (isLoading) {
    <div className="client-details-wrapper">
      <Loader />
    </div>;
  } else {
    return (
      <div className="client-details-wrapper">
        <p>Posted By</p>
        <div className="client-details-container">
          <div className="client-details-header"></div>
        </div>
      </div>
    );
  }
};

export default ClientDetails;
