import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PropertyCard = ({ property, onDetailsClick}) => {
    return(
        <div className=" card mb-3">
            <div className=" card-body">
                <h5 className="card-title">{property.name}</h5>
                <p className="card-text">
                    price: ${property.rent} <br/>
                    status: {property.isBooked ? "Occupied" : "Vacant"}
                </p>
                <button className=" btn btn-primary" onClick={()=> onDetailsClick(property.id)} >
                    Details
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;