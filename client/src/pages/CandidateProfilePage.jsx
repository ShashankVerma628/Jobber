import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import {
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const CandidateProfilePage = () => {
  const { getCandidateProfileData, candidateData } = useAppContext();

  const { candidateId } = useParams();

  useEffect(() => {
    getCandidateProfileData(candidateId);
  }, []);
  return (
    <div className="page-wrapper wrapper">
      <div className="resume-container">
        <div className="box-shadow resume-cover">
          <div className="profile-container">
            <div className="profile-image">{candidateData?.name.charAt(0)}</div>
            <div className="profile-name">{candidateData?.name}</div>
          </div>
          <div className="resume-cover-details">
            <div className="details">
              <div>
                <FaBriefcase />
                <span className="details-data">{candidateData?.title}</span>
              </div>
              <div>
                <FaHome />
                <span className="details-data">{candidateData?.address}</span>
              </div>
              <div>
                <FaEnvelope />
                <span className="details-data">{candidateData?.email}</span>
              </div>
              <div>
                <FaPhone />
                <span className="details-data">
                  {candidateData?.contactNumber}
                </span>
              </div>
            </div>
            <div className="perks-container">
              <h3>Skills</h3>
              <ul className="perks-list">
                {candidateData?.skills.map((skill) => (
                  <span className="perk">{skill}</span>
                ))}
              </ul>
            </div>
            <div className="perks-container">
              <h3>Languages</h3>
              <ul className="perks-list">
                {candidateData?.languages.map((lang) => (
                  <li className="perk lang">{lang}</li>
                ))}
              </ul>
            </div>
            <div className="social-links-container">
              <h3>Social Links</h3>
              <ul className="social-list">
                <li className="social-item">
                  <a
                    className="social-link"
                    href={candidateData?.linkedinLink}
                    target="_blank"
                  >
                    <FaLinkedin size={40} />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    className="social-link"
                    href={candidateData?.githubLink}
                    target="_blank"
                  >
                    <FaGithub size={40} />
                  </a>
                </li>
                <li className="social-item">
                  <a
                    className="social-link"
                    href={candidateData?.twitterLink}
                    target="_blank"
                  >
                    <FaTwitter size={40} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="resume-detailed">
          <div className="box-shadow resume-exp">
            <div className="header">
              <h1>
                <i className="fas fa-briefcase"></i>Work Experience
              </h1>
            </div>
            <div className="work">
              <h2>Front End Developer / w3schools.com</h2>
              <div className="date">
                <p>
                  {" "}
                  <i className="fas fa-calendar-alt"></i> Jan 2015-{" "}
                  <span className="current">current</span>
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                quo nam ipsam eum odit quod at, doloremque est similique veniam.
              </p>
            </div>

            <div className="work">
              <h2>Graphic Developer | anything.com</h2>
              <div className="date">
                <p>
                  {" "}
                  <i className="fas fa-calendar-alt"></i> Mar 2012 - Dec 2014
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                quo nam ipsam eum odit quod at, doloremque est similique veniam.
              </p>
            </div>

            <div className="work">
              <h2>Graphic Designer /something.com</h2>
              <div className="date">
                <p>
                  <i className="fas fa-calendar-alt"></i>Jun 2010 - Mar 2012
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                quo nam ipsam eum odit quod at, doloremque est similique veniam.
              </p>
            </div>
          </div>
          <div className="box-shadow resume-edu">
            <h1>
              <i className="fas fa-ribbon"></i>Education
            </h1>

            <div className="edu">
              <h2>W3schools.com</h2>
              <p>
                <i className="fas fa-calendar-alt"></i>Forever
              </p>
              <p>Web Development! All need to know in one place</p>
            </div>
            <div className="edu">
              <h2>IEC CET</h2>
              <p>
                <i className="fas fa-calendar-alt"></i>2017-2021
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                reiciendis.
              </p>
            </div>

            <div className="edu">
              <h2>Kendriya Vidyalaya</h2>
              <p>
                <i className="fas fa-calendar-alt"></i>2015-2017
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                reiciendis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
