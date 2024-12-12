import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

const AddTenant = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTenant = { name, email, propertyId };

    const response = await fetch("http://localhost:8080/api/tenants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTenant),
    });

    if (response.ok) {
      const createdTenant = await response.json();
      onCreate(createdTenant);
      // Reset form
      setName("");
      setEmail("");
      setPropertyId("");
    } else {
      console.error("Failed to create tenant");
    }
  };

  return (
    <div>
    <Navbar/>
    <h1 className="mb-4">Add Tenant</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="propertyId">Property ID:</label>
          <input
            type="text"
            id="propertyId"
            className="form-control"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Tenant
        </button>
      </form>
    </div>
  );
};

export default AddTenant;
