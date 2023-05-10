import {
  FaSave,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaSuitcase,
} from "react-icons/fa";
import moment from "moment";

const JobDetails = ({ job }) => {
  let date = moment(job?.createdAt);
  date = date.format("MMM Do, YYYY");

  const jobDescription = job?.jobDescription
    .split("\\n")
    .map(function (line, n) {
      return n == 0 ? [line] : [<br />, line];
    });

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
                onClick={() => {}}
              >
                <FaSave />
                {/* save the job if it a candidate is logged in */}
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
          <div className="job-created-at">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;