import { useState } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Alert from "../Alert";
import FormSelect from "./FormSelect";
import { options } from "../../assets/options";

import { useAppContext } from "../../context/appContext";

const AddJobForm = ({ handleSubmit }) => {
  const [jobType, setJobType] = useState("remote");

  const { jobFormData, setJobFormData, isEditJob, user } = useAppContext();

  const handleSelectChange = (e) => {
    setJobType(e.target.value);
    setJobFormData({ ...jobFormData, jobType });
  };

  const handleInputChange = (e) => {
    setJobFormData({ ...jobFormData, [e.target.name]: e.target.value });
  };
  return (
    <div className="form-wrapper">
      <Alert />
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput
          labelText="Job Title"
          name="position"
          type="position"
          onInputChange={handleInputChange}
          value={jobFormData?.position}
        />
        <FormInput
          type="skills"
          labelText="Skills"
          name="skills"
          onInputChange={handleInputChange}
          value={jobFormData?.skills}
        />
        <FormSelect
          label="Job Type"
          options={options}
          onChange={handleSelectChange}
          value={jobFormData?.jobType}
        />
        <div className="form-input-container input-textarea">
          <label htmlFor="job-desc">Job Description</label>
          <textarea
            className="job-desc"
            onChange={handleInputChange}
            id="job-desc"
            name="jobDescription"
            value={jobFormData?.jobDescription}
            placeholder="Job Description"
          />
        </div>
        <FormButton type="submit" text={isEditJob ? "Edit Job" : "Add Job"} />
      </form>
    </div>
  );
};

export default AddJobForm;
