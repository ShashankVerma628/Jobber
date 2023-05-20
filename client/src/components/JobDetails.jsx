import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaSuitcase,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import moment from "moment";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Applicant from "./Applicant";

const JobDetails = ({ job }) => {
  const { user, token, logoutUser, applyForJob, saveJob } = useAppContext();
  const isApplied = job?.applicants?.findIndex((id) => id === user?._id);
  const isSelected = job?.acceptedCandidates?.findIndex(
    (id) => id === user?._id
  );
  const isSaved = job?.likes.findIndex((id) => id === user?._id);
  console.log(job);

  let date = moment(job?.createdAt);
  date = date.format("MMM Do, YYYY");

  const navigate = useNavigate();

  const jobDescription = job?.jobDescription
    .split("\\n")
    .map(function (line, n) {
      return n == 0 ? [line] : [<br />, line];
    });

  const handleApply = () => {
    if (!user || !token || user?.userRole !== "candidate") {
      logoutUser();
      navigate("/login");
    } else {
      applyForJob(job?._id);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleJobSave = () => {
    if (!user || !token || user?.userRole !== "candidate") {
      logoutUser();
      navigate("/login");
    } else {
      saveJob(job?._id);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="job-details-wrapper">
      <div className="job-details-container">
        <div className="job-headline-container">
          <div className="job-header">
            <div className="job-heading">
              <div className="company-icon">
                {job?.company.toString().charAt(0)}
              </div>
              <div className="job-column-heading">
                <h3 className="job-position">{job?.position}</h3>
                <h4 className="company-name">{job?.company}</h4>
              </div>
            </div>

            <div className="action-btn-container">
              <button
                className="action-btn"
                type="button"
                title="save for later"
                onClick={handleJobSave}
              >
                {isSaved === -1 ? <FaRegHeart /> : <FaHeart />}
              </button>
            </div>
          </div>
          <div className="job-details-container">
            <div className="job-location">
              <FaMapMarkerAlt />
              <span>{job?.jobLocation}</span>
            </div>
            <div className="job-type">
              <FaSuitcase />
              <span>{job?.jobType}</span>
            </div>
            <div className="salary">
              <FaRupeeSign />
              <span>{job?.salary}</span>
            </div>
          </div>
          <div className="skills-container">
            {job?.skills.map((skill) => (
              <span key={skill} className="skill">
                {skill}
              </span>
            ))}
          </div>
          <div className="job-description">
            <h4 className="job-desc-heading">Job Description:</h4>
            <div className="job-desc-content">
              <div className="job-desc">{jobDescription}</div>
            </div>
          </div>
          {user?.userRole === "client" ? null : (
            <div className="action-btn">
              <button
                className={
                  isApplied < 0 && isSelected < 0
                    ? "apply-btn btn"
                    : "apply-btn btn disabled"
                }
                type="button"
                disabled={isApplied < 0 && isSelected < 0 ? false : true}
                onClick={handleApply}
              >
                {isApplied < 0 && isSelected < 0 ? "Apply" : "Applied"}
              </button>
            </div>
          )}
          <div className="job-created-at">{date}</div>
          {user?.userRole === "client" && (
            <>
              <div className="applicants-list-container">
                {job?.applicants?.length === 0 ? (
                  <h3>No applicants yet</h3>
                ) : (
                  <h3>Applicants List</h3>
                )}
                {job?.applicants?.map((id) => (
                  <Applicant
                    showButton={true}
                    key={id}
                    jobId={job?._id}
                    applicantId={id}
                  />
                ))}
              </div>
              <div
                className="applicants-list-container"
                style={{ marginTop: "2em" }}
              >
                {job?.acceptedCandidates?.length === 0 ? (
                  <h3>No Accepted Applicants yet</h3>
                ) : (
                  <h3>Accepted Applicants</h3>
                )}
                {job?.acceptedCandidates?.map((id) => (
                  <Applicant
                    key={id}
                    jobId={job?._id}
                    applicantId={id}
                    showButton={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
