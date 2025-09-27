import { Link } from "react-router-dom";
//import "../styles/createAccOptions.css"; (optional CSS file)

function CreateAccOptions() {
  return (

    <div className="create-acc-options">
      <Link to="/CreateAccDoctor" className="link-button">
        Sign Up as Doctor
      </Link>
      <br />
      <Link to="/CreateAccPatient" className="link-button">
        Sign Up as Patient
      </Link>
    </div>


  );
}

export default CreateAccOptions;
