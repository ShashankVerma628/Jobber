import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Layout/Loader";
import JobsList from "../JobsList";

const SavedJobs = () => {
  const { isLoading, user, getSavedJobs, savedJobsCount, savedJobs } =
    useAppContext();

  useEffect(() => {
    getSavedJobs(user?._id);
  }, [savedJobsCount]);

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
        <h2 className="total-jobs">{savedJobsCount} Jobs Found</h2>
        <JobsList jobs={savedJobs} />
      </div>
    );
  }
};

export default SavedJobs;
