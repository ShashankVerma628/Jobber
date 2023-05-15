import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Loader from "./Layout/Loader";
import { Link } from "react-router-dom";

const Applicant = ({ applicantId }) => {
  const { isLoading, getApplicant } = useAppContext();
  const [applicant, setApplicant] = useState(null);

  const getApplicantDetails = (id) => {
    (async () => {
      setApplicant(await getApplicant(id.toString()));
    })();
  };

  useEffect(() => {
    getApplicantDetails(applicantId);
  }, []);

  console.log(applicant);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="applicant-container">
        <div className="applicant-details-container">
          <div className="applicant-profile">
            <div className="applicant-profile-icon">
              {applicant?.name.charAt(0)}
            </div>
            <div className="applicant-details">
              <p className="applicant-name">{applicant?.name}</p>
              <p className="applicant-title">{applicant?.title}</p>
              <Link className="profile-link" to={`/profile/${applicantId}`}>
                View Profile
              </Link>
            </div>
          </div>
          <div className="action-btn-container">
            <button className="btn action-btn accept-btn">Accept</button>
            <button className="btn action-btn reject-btn">Reject</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Applicant;
