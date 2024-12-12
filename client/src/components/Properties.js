import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("http://localhost:8080/api/properties");
      const data = await response.json();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4"> Properties</h1>
        <div className="row">
          {properties.map((property) => (
            <div className="col-md-4 mb-3" key={property._id}>
              <div className="card">
                <img className="card-img-top" src={`/assets/properties/${property.image}`} alt={property.name}/>
                <div className="card-body">
                  <h5 className="card-title"> {property.name} </h5>
                  <p className="card-text"> Rent:  <b>$ {property.rent}</b></p>
                  <p className="card-text"> Status: <b> {property.isBooked ? `Occupied by ${property.tenantId?.name}` : "Vacant"}</b></p>
                  {/*buttons to assign tenant*/}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
