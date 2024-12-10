import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

const LoginPage = () => {
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
              <div className="slideNumber">
                <img src="../assets/images/placekitten.webp" alt="a cat" />
              </div>
              <div className="slideNumber">
                <img src="../assets/images/placebear-1280x720.webp" alt="bears" />
              </div>
              <div className="slideNumber">
                <img
                  src="../assets/images/bacon-mockup-1280x720.webp" alt="meat"/>
              </div>
              <div className="slideNumber">
                <img
                  src="../assets/images/lorem-picsum-1280x720.webp"alt="place"/>
              </div>
            </div>
            
            <div className="col-md-6">
                <h4> Login Here!</h4>
                <form>
                    <div className="mb-3">
                        <label htmlFor="youremail" className="form-label"> Enter your email address </label>
                        <input
                        type="email"
                        className="form-control"
                        id="youremail"
                        aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yourpassword" className="form-label" >  Enter your password </label>
                        <input
                         type="password"
                         className="form-control"
                         id="yourpassword"
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