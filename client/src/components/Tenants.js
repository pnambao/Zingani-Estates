import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTenant from "./AddTenant";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await fetch("http://localhost:8080/api/tenants");
      const data = await response.json();
      setTenants(data);
    };
    fetchTenants();
  }, []);

  const handleCreateTenant = (newTenant) => { setTenants([...tenants, newTenant]); };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Tenants</h1>
        <AddTenant onCreate={handleCreateTenant}  />
        {tenants.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Property</th>
                <th>Payment History</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant._id}>
                  <td>{tenant.name || "N/A"}</td>
                  <td>{tenant.email || "N/A"}</td>
                  <td>
                    {tenant.propertyId && tenant.propertyId.name
                      ? tenant.propertyId.name
                      : "Unassigned"}
                  </td>
                  <td>
                    {tenant.paymentHistory &&
                    tenant.paymentHistory.length > 0 ? (
                      <ul>
                        {tenant.paymentHistory.map((payment, index) => (
                          <li key={index}>Payment ID: {payment}</li>
                        ))}
                      </ul>
                    ) : (
                      "No payments made"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p> No tenants available</p>
        )}
      </div>
    </div>
  );
};

export default Tenants;
