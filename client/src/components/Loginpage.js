import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import Slideshow from "./Slideshow";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("email:", email, "password:", password);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("login successful", data);
        navigate("/dashboard");
      } else {
        setError(data.message || "An error occured");
      }

    } catch (error) {
      setError(" Failed to connect to server");
      console.error("Login error:", error);
    }
  };


  return (
    <div>
      <header className="container-fluid">
        <h1 className="display-1"> Zingani Ian Phiri Estates</h1>
        <h3> Rental management made easy just for you!</h3>
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
    <footer id="footer" >
    <p>&copy; 2024 by Zingani Estates</p>
    </footer>
    </div>
  );
};

export default LoginPage;