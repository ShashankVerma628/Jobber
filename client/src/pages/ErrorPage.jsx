import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="page-wrapper error-page-wrapper">
      <div className="error-page-container">
        <h1 className="main-heading">Oops!</h1>
        <h2 className="main-text">404 - PAGE NOT FOUND</h2>
        <p className="error-text">
          The page you're looking for might have been removed or changed it's
          name temporarily.
        </p>
        <Link className="homepage-link" to="/">
          GO TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
