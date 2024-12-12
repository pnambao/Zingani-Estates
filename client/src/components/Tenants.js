import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddTenant from "./AddTenant";
import "bootstrap/dist/css/bootstrap.min.css";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tenants");
        if (!response.ok) {
          throw new Error("Failed to fetch tenants");
        }
        const data = await response.json();
        setTenants(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTenants();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/payments");
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPayments();
  }, []);

  // Merge payments into tenants
  const mergedTenants = tenants.map(tenant => {
    const tenantPayments = payments.filter(payment => payment.tenantId === tenant._id);
    return { ...tenant, paymentHistory: tenantPayments };
  });

  const handleCreateTenant = (newTenant) => {
    setTenants([...tenants, newTenant]);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Tenants</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AddTenant onCreate={handleCreateTenant} />
            </div>
            <div className="col-md-9 table-responsive">
              {mergedTenants.length > 0 ? (
                <table className="table table-hover table-bordered mt-4">
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Property</th>
                      <th>Payment History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergedTenants.map((tenant) => (
                      <tr key={tenant._id}>
                        <td>{tenant.name || "N/A"}</td>
                        <td>{tenant.email || "N/A"}</td>
                        <td>
                          {tenant.propertyId && tenant.propertyId.name
                            ? tenant.propertyId.name
                            : "Unassigned"}
                        </td>
                        <td>
                          {tenant.paymentHistory && tenant.paymentHistory.length > 0 ? (
                            <ul>
                              {tenant.paymentHistory.map((payment, index) => (
                                <li key={index}>
                                  Amount: {payment.amount}, Status: {payment.status}, Date: {new Date(payment.date).toLocaleDateString()}
                                </li>
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
                <p>No tenants available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenants;