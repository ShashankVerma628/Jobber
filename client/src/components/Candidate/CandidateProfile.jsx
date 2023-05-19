import FormInput from "../Form/FormInput";
import FormButton from "../Form/FormButton";
import Alert from "../Alert";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";

const CandidateProfile = () => {
  const {
    isLoading,
    user,
    editCandidateProfile,
    candidateProfileData,
    setCandidateProfileData,
  } = useAppContext();

  const handleInputChange = (e) => {
    setCandidateProfileData({
      ...candidateProfileData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editCandidateProfile(user?._id, candidateProfileData);
  };

  if (isLoading) {
    return (
      <div
        className="page-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="page-right-container">
        <h2 className="page-right-title">Edit Profile</h2>
        <Link to={`/profile/${user?._id}`} className="view-profile-link">
          View Profile
        </Link>
        <div className="form-wrapper">
          <Alert />
          <form className="form-container" onSubmit={handleSubmit}>
            <FormInput
              labelText="Full Name"
              name="name"
              type="text"
              onInputChange={handleInputChange}
              value={candidateProfileData?.name}
            />
            <FormInput
              labelText="Email"
              name="email"
              type="email"
              onInputChange={handleInputChange}
              value={candidateProfileData?.email}
              disabled={true}
            />
            <FormInput
              labelText="Job Title"
              name="position"
              type="text"
              onInputChange={handleInputChange}
              value={candidateProfileData?.title}
            />
            <FormInput
              type="skills"
              labelText="Skills"
              name="skills"
              onInputChange={(e) =>
                setCandidateProfileData({
                  ...candidateProfileData,
                  skills: e.target.value.split(","),
                })
              }
              value={candidateProfileData?.skills}
            />
            <FormInput
              type="text"
              labelText="Address"
              name="address"
              onInputChange={handleInputChange}
              value={candidateProfileData?.address}
            />
            <FormInput
              type="text"
              labelText="Contact Number"
              name="contactNumber"
              onInputChange={handleInputChange}
              value={candidateProfileData?.contactNumber}
            />
            <FormInput
              type="text"
              labelText="Languages"
              name="languages"
              onInputChange={(e) =>
                setCandidateProfileData({
                  ...candidateProfileData,
                  languages: e.target.value.split(","),
                })
              }
              value={candidateProfileData?.languages}
            />
            <div className="name-container">
              <FormInput
                width="small"
                type="text"
                labelText="Github"
                name="githubLink"
                onInputChange={handleInputChange}
                value={candidateProfileData?.githubLink}
              />
              <FormInput
                type="text"
                width="small"
                labelText="Linkedin"
                name="linkedinLink"
                onInputChange={handleInputChange}
                value={candidateProfileData?.linkedinLink}
              />
              <FormInput
                type="text"
                width="small"
                labelText="Twitter"
                name="twitterLink"
                onInputChange={handleInputChange}
                value={candidateProfileData?.twitterLink}
              />
            </div>
            <FormButton type="submit" text="Submit" />
          </form>
        </div>
      </div>
    );
  }
};
export default CandidateProfile;
