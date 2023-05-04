import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="logo header-logo" to="/">
      Jobber<span>.com</span>
    </Link>
  );
};

export default Logo;
