import {
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaSuitcase,
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAppContext } from "../context/appContext";

const JobHeadline = ({ job }) => {
  let date = moment(job?.createdAt);
  date = date.format("MMM Do, YYYY");
  const { user, deleteJob, setJobFormData } = useAppContext();

  const navigate = useNavigate();

  const handleJobEdit = () => {
    setJobFormData(job);
    navigate(`/client/dashboard/edit-job/${job?._id}`);
  };

  return (
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
          {user?.userRole === "client" && user?._id === job?.createdBy ? (
            <button
              title="edit job"
              className="action-btn"
              onClick={handleJobEdit}
            >
              <FaEdit />
            </button>
          ) : null}
          {user?.userRole === "client" && user?._id === job?.createdBy ? (
            <button
              title="delete job"
              onClick={() => deleteJob(job?._id)}
              className="action-btn"
            >
              <FaTrash />
            </button>
          ) : null}
          <Link
            to={`/jobs/${job?._id}`}
            className="action-btn"
            title="See more"
          >
            <FaExternalLinkAlt />
          </Link>
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
      <div className="job-created-at">{date}</div>
    </div>
  );
};

export default JobHeadline;
