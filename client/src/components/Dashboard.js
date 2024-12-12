import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import PropertyCard from "./PropertyCard";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {

    const [properties, setProperties] = useState([]);

    useEffect(()=> {
      
        const fetchProperties = async() =>{
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
          <h1 className="mb-4">Dashboard</h1>
          <div className="row">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div className="col-md-4" key={property.id}>
                  <PropertyCard
                    property={property}
                    onDetailsClick={(id) => console.log("Details clicked for property ID:", id)}
                  />
                </div>
              ))
            ) : (
              <p>No properties available</p>
            )}
          </div>
        </div>
      </div>
  
    );
};

export default Dashboard;