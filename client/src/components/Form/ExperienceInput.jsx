import FormInput from "./FormInput";
import { useAppContext } from "../../context/appContext";
const ExperienceInput = ({ onInputChange, data }) => {
  const { setCandidateProfileData } = useAppContext();
  return (
    <div className="form-input-container experience-input-container">
      <div className="name-container">
        <FormInput
          width="half"
          labelText="Start Date"
          name="startDate"
          type="date"
          onInputChange={onInputChange}
          value={data?.startDate}
        />

        <FormInput
          width="half"
          labelText="End Date"
          name="startDate"
          type="date"
          onInputChange={onInputChange}
          value={data?.endDate}
        />
      </div>
      <FormInput
        placeholder="Company Name"
        labelText="Company Name"
        name="companyName"
        type="text"
        onInputChange={onInputChange}
        value={data?.companyName}
      />
      <FormInput
        type="text"
        labelText="Skills Used"
        name="skills"
        onInputChange={(e) =>
          setCandidateProfileData({
            ...data,
            languages: e.target.value.split(","),
          })
        }
        value={data?.skills}
      />
      <div className="form-input-container input-textarea">
        <label htmlFor="description">Job Description</label>
        <textarea
          className="description"
          onChange={onInputChange}
          id="description"
          name="description"
          value={data?.description}
          placeholder="Job Description"
        />
      </div>
    </div>
  );
};

export default ExperienceInput;
