import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddTenant = ({ onCreate, properties }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTenant = { name, email, propertyId: propertyId || null };

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

      // If a property is selected, assign the tenant to the property
      if (propertyId) {
        await fetch("http://localhost:8080/api/tenants/assign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tenantId: createdTenant._id, propertyId }),
        });
      }

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
      <h2>Add Tenant</h2>
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
          <label>Assign Property:</label>
          {properties.map((property) => (
            <div key={property._id} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={property._id}
                name="propertyId"
                value={property._id}
                onChange={(e) => setPropertyId(e.target.value)}
              />
              <label className="form-check-label" htmlFor={property._id}>
                {property.name}
              </label>
            </div>
          ))}
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="unassigned"
              name="propertyId"
              value=""
              onChange={(e) => setPropertyId("")}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="unassigned">
              Unassigned
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Tenant
        </button>
      </form>
    </div>
  );
};

export default AddTenant;
