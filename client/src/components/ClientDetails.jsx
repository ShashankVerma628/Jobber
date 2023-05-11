import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loader from "./Layout/Loader";

const ClientDetails = () => {
  const { isLoading, singleJob, getClientDetails, clientDetails } =
    useAppContext();

  useEffect(() => {
    if (singleJob != null && clientDetails == null) {
      getClientDetails(singleJob?.createdBy);
    }
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
          <div className="client-details-header">
            <div className="profile-container">
              <div className="icon">{clientDetails?.name.charAt(0)}</div>
              <div className="details">
                <p className="client-name">{clientDetails?.name}</p>
                <p className="client-company">{clientDetails?.company}</p>
              </div>
            </div>
            <div className="bio">
              <p>{clientDetails?.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ClientDetails;
