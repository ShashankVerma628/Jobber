import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const AllJobs = () => {
  const { getJobs, clientJobs, clientJobsCount } = useAppContext();

  useEffect(() => {
    console.log("hello");
    getJobs();
  }, []);

  return <div>all jobs</div>;
};

export default AllJobs;
