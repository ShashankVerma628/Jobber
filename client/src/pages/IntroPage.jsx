import { Link } from "react-router-dom";

const IntroPage = () => {
  return (
    <div className="page-wrapper intro-page-wrapper">
      <div className="intro-page-container">
        <h1 className="page-heading">
          Jobber<span>.com</span>
        </h1>
        <h3 className="page-sub-heading">Want to know about us?</h3>
        <p className="page-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          saepe vero commodi vel, corrupti perspiciatis ex assumenda pariatur
          omnis perferendis quod ab nobis iste temporibus! Ipsum ipsa vero
          inventore distinctio vel velit sit? Pariatur. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Ipsum velit quas in ullam? Natus
          quasi, ipsam deleniti iusto autem perferendis.
        </p>
        <p className="page-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          vero. Molestiae fugit vel culpa commodi saepe iusto provident ipsum
          non ea alias a velit sunt ipsam blanditiis excepturi facilis, voluptas
          enim. Vel itaque ab voluptates obcaecati dicta eos harum non fuga
          deleniti incidunt. Omnis, magni? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Qui, voluptatum sit sapiente itaque
          pariatur minus, esse voluptates ratione illo nihil corporis. Quisquam
          quam earum odio officia consequuntur perspiciatis, debitis adipisci?
        </p>
        <div className="homepage-link-container">
          <Link className="homepage-link" to="/">
            Start Your Journey with us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
