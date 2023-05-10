import JobHeadline from "./JobHeadline";

const JobsList = ({ jobs }) => {
  return (
    <div className="jobs-list-container">
      {jobs.map((job) => (
        <JobHeadline key={job?._id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;
