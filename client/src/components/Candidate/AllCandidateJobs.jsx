import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Layout/Loader";
import JobsList from "../JobsList";

const AllCandidateJobs = () => {
  const {
    isLoading,
    user,
    getCandidateJobs,
    candidateJobs,
    candidateJobsCount,
  } = useAppContext();

  useEffect(() => {
    getCandidateJobs(user?._id);
  }, [candidateJobsCount]);

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
      <div className="job-search-page-wrapper">
        <h2 className="total-jobs">{candidateJobsCount} Jobs Found</h2>
        <JobsList jobs={candidateJobs} />
      </div>
    );
  }
};

export default AllCandidateJobs;
