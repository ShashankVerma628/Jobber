import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Layout/Loader";
import JobsList from "../JobsList";

const AllJobs = () => {
  const { isLoading, getJobs, clientJobs, clientJobsCount } = useAppContext();

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
      <div className="job-search-page-wrapper">
        <h2 className="total-jobs">{clientJobsCount} Jobs Found</h2>
        <JobsList jobs={clientJobs} />
      </div>
    );
  }
};

export default AllJobs;
