import AddJobForm from "../Form/AddJobForm";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const { jobFormData, displayAlert, addJob, clearJobForm } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { position, jobDescription, jobType, jobLocation } = jobFormData;
    let { skills, salary } = jobFormData;
    salary = `${salary} Lakh/Year INR`;

    if (!position || !jobDescription || skills.length === 0 || !jobType) {
      displayAlert();
    } else {
      const newJob = {
        position,
        jobDescription,
        skills,
        jobType,
        salary,
        jobLocation,
      };
      addJob(newJob);
    }
  };

  return (
    <div className="page-right-container">
      <h2 className="page-right-title">Add Job</h2>
      <AddJobForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddJob;
