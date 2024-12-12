import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddTenant from "./AddTenant";
import "bootstrap/dist/css/bootstrap.min.css";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [properties, setProperties] = useState([]);

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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProperties();
  }, []);

  // Merge payments into tenants
  const mergedTenants = tenants.map(tenant => {
    const tenantPayments = payments.filter(payment => payment.tenantId === tenant._id);
    return { ...tenant, paymentHistory: tenantPayments };
  });

  const handleCreateTenant = (newTenant) => {
    setTenants([...tenants, newTenant]);
  };

  const handleDeleteTenant = async (tenantId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tenants/${tenantId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTenants(tenants.filter(tenant => tenant._id !== tenantId));
      } else {
        console.error("Failed to delete tenant");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Tenants</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AddTenant onCreate={handleCreateTenant} properties={properties} />
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
                      <th>Actions</th>
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
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTenant(tenant._id)}
                          >
                            Delete
                          </button>
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