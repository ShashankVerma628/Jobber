import { FaBriefcase, FaUserAlt, FaUserCheck } from "react-icons/fa";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Layout/Loader";
import Stats from "../Stats";

const ClientStats = () => {
  const {
    isLoading,
    getJobs,
    clientJobs,
    clientJobsCount,
    totalApplicantsCount,
    totalAcceptedApplicantsCount,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [clientJobsCount]);

  if (isLoading) {
    return (
      <div
        className="page-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="page-wrapper client-stats-page-wrapper">
        <div className="client-stats-page-header">
          <div className="stats-wrapper">
            <Stats
              icon={<FaBriefcase />}
              text="Total Jobs"
              value={clientJobsCount}
            />
            <Stats
              icon={<FaUserAlt />}
              text="Total Applicants"
              value={totalApplicantsCount}
            />
            <Stats
              icon={<FaUserCheck />}
              text="Total Selected Applicants"
              value={totalAcceptedApplicantsCount}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ClientStats;
