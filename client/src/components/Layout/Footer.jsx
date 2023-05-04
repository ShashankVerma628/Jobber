import LogoImage from "../../assets/favicon-32x32.png";
import { FaPhoneAlt } from "react-icons/fa";

import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <SocialMedia />
        <div className="support-container">
          <h3>Candidate Support</h3>
          <div className="contact-list-container">
            <a className="contact-link" href="tel:+7054654453">
              <FaPhoneAlt /> <span>+91 7017293453</span>
            </a>
            <a className="contact-link" href="tel:+70145543453">
              <FaPhoneAlt /> <span>+91 7017293453</span>
            </a>
            <a className="contact-link" href="tel:+701465465453">
              <FaPhoneAlt /> <span>+91 7017293453</span>
            </a>
          </div>
        </div>
        <div className="copyrights-container">
          <div className="logo">
            <img src={LogoImage} alt="" />
          </div>
          <div className="copyright-text">
            &copy; Copyright 2023 - Jobber.com. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
