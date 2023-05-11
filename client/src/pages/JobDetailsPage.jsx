import { useAppContext } from "../context/appContext";
import { JobDetails, Loader, ClientDetails } from "../components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetailsPage = () => {
  const { isLoading, singleJob, getSingleJob } = useAppContext();

  const { jobId } = useParams();

  useEffect(() => {
    getSingleJob(jobId);
  }, []);

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
      <div className="page-wrapper">
        <div className="job-details-page-wrapper">
          <JobDetails job={singleJob} />
          <ClientDetails />
        </div>
      </div>
    );
  }
};

export default JobDetailsPage;
