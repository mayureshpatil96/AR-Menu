import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <h2 style={{ textAlign: "center", color: "orange", padding: "20px" }}>
        Your Orders
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              width: "280px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "orange" }}>Order #{order._id.slice(-5)}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
