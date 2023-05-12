import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Alert from "../Alert";
import FormSelect from "./FormSelect";
import { options } from "../../assets/options";

import { useAppContext } from "../../context/appContext";

const AddJobForm = ({ handleSubmit, isEditJob }) => {
  const { jobFormData, setJobFormData, user } = useAppContext();

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
          onInputChange={(e) =>
            setJobFormData({
              ...jobFormData,
              skills: e.target.value.split(","),
            })
          }
          value={jobFormData?.skills}
        />
        <FormInput
          type="jobLocation"
          labelText="Job Location"
          name="jobLocation"
          onInputChange={handleInputChange}
          value={jobFormData?.jobLocation}
        />
        <FormInput
          type="salary"
          labelText="Salary"
          name="salary"
          onInputChange={handleInputChange}
          value={jobFormData?.salary}
          placeholderText="Please enter salary in LPA"
        />
        <FormSelect
          label="Job Type"
          options={options}
          name="jobType"
          onChange={handleInputChange}
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
