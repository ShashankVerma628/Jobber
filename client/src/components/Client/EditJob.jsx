import AddJobForm from "../Form/AddJobForm";
import { useAppContext } from "../../context/appContext";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { jobFormData, displayAlert, editJob } = useAppContext();

  const { jobId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { position, jobDescription, jobType, jobLocation } = jobFormData;
    let { skills, salary } = jobFormData;

    if (!position || !jobDescription || skills.length === 0 || !jobType) {
      displayAlert();
    } else {
      const job = {
        position,
        jobDescription,
        skills,
        jobType,
        salary,
        jobLocation,
      };
      editJob(jobId, job);

      setTimeout(() => {
        navigate("/client/dashboard/all-jobs");
      }, 4000);
    }
  };

  return (
    <div className="page-right-container">
      <h2 className="page-right-title">Edit Job</h2>
      <AddJobForm isEditJob={true} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditJob;
