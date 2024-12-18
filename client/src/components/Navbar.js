import React from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className=" container-fluid " >
                <Link className="navbar-brand" to="/dashboard">
                Zingani Estates
                </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav" >
                <ul className="navbar-nav m1-auto" >
                    <li className="nav-item" >
                        <Link className="nav-link" to="/dashboard" >Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/properties" >Properties</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tenants" >Tenants</Link>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/" >Logout</Link>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
};

export default Navbar;