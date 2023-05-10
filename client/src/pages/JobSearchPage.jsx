import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { JobsList, Loader } from "../components";

const JobSearchPage = () => {
  const { getAllJobs, isLoading, allJobs, allJobsCount } = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [allJobsCount]);

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
        <div className="job-search-page-wrapper">
          <JobsList jobs={allJobs} />
        </div>
      </div>
    );
  }
};

export default JobSearchPage;
