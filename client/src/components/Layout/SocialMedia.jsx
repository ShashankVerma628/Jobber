import "../../styles/social-media.scss";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const SocialMedia = () => {
  return (
    <>
      <h1>Follow Us On Social Media</h1>
      <ul className="container">
        <a href="https://facebook.com" target="_blank" className="tab facebook">
          <div className="svg dark">
            <FaFacebook />
          </div>
          <div className="red">
            <FaFacebook />
          </div>
          <div className="content">
            <h2>Facebook</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, expedita.
            </p>
          </div>
        </a>
        <a href="https://twitter.com" target="_blank" className="tab twitter">
          <div className="svg dark">
            <FaTwitter />
          </div>
          <div className="red">
            <FaTwitter />
          </div>
          <div className="content">
            <h2>Twitter</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, expedita.
            </p>
          </div>
        </a>
        <a href="https://youtube.com" target="_blank" className="tab youtube">
          <div className="svg dark">
            <FaYoutube />
          </div>
          <div className="red">
            <FaYoutube />
          </div>
          <div className="content">
            <h2>YouTube</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, expedita.
            </p>
          </div>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          className="tab instagram"
        >
          <div className="svg dark">
            <FaInstagram />
          </div>
          <div className="red">
            <FaInstagram />
          </div>
          <div className="content">
            <h2>Instagram</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, expedita.
            </p>
          </div>
        </a>
        <a href="https://linkedin.com" target="_blank" className="tab linkedin">
          <div className="svg dark">
            <FaLinkedin />
          </div>
          <div className="red">
            <FaLinkedin />
          </div>
          <div className="content">
            <h2>LinkedIn</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, expedita.
            </p>
          </div>
        </a>
      </ul>
    </>
  );
};

export default SocialMedia;
