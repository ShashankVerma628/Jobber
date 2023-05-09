import AddJobForm from "../Form/AddJobForm";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {
  const { jobFormData, displayAlert, addJob } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { position, jobDescription, skills, company, createdBy, jobType } =
      jobFormData;

    if (
      !position ||
      !jobDescription ||
      !skills ||
      !company ||
      !createdBy ||
      !jobType
    ) {
      displayAlert();
    } else {
      const newJob = jobFormData;
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
