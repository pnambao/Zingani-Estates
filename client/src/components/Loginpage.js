import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import Slideshow from "./Slideshow";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("email:", email, "password:", password)
  };


  return (
    <div>
      <header className="container-fluid">
        <h1 className="display-1"> Zingani Ian Phiri Estates</h1>
        <h3> Rental payments made easy just for you!</h3>
        <hr />
      </header>

      <main>
        <div className="container">
          <div className="row">
            {/* slideshow*/}
            <div id="slideShow" className="col-md-6">
             <Slideshow/>
            </div>
            
            <div className="col-md-6">
                <h4> Login Here!</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="youremail" className="form-label"> Enter your email address </label>
                        <input
                        type="email"
                        className="form-control"
                        id="youremail"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yourpassword" className="form-label" >  Enter your password </label>
                        <input
                         type="password"
                         className="form-control"
                         id="yourpassword"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                    </div>
                    <button  type="submit" className="btn btn-primary" > Submit </button>
                    <p>Need to create an account? <a href="signUp.html">Sign up here!</a></p>
                </form>
            </div>
          </div>
        </div>
      </main>
      <hr/>
    <footer id="footer" className="container-fluid" >
    <p>&copy; 2024 by Panje Nambao all rights reserved</p>
        <p>
          Contact:{" "}
          <a href="mailto:panjenambao@gmail.com">Email me</a>
        </p>
    </footer>
    </div>
  );
};

export default LoginPage;