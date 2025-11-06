import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/user");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        padding: "0",
      }}
    >
      {/* ✅ Navbar */}
      

      {/* ✅ Orders Header */}
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2 style={{ color: "orange", fontSize: "2rem", marginBottom: "10px" }}>
          My Orders 🧾
        </h2>
        <p style={{ color: "#aaa", fontSize: "1rem" }}>
          Track your recent orders and their status.
        </p>
      </div>

      {/* ✅ Orders Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          padding: "0 40px 60px",
        }}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#0d0d0d",
                borderRadius: "30px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(255, 255, 255, 0.05)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                maxWidth: "250px",
                margin: "0 auto",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* ✅ Order ID */}
              <h3
                style={{
                  color: "orange",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}
              >
                Order #{order._id.slice(-6).toUpperCase()}
              </h3>

              {/* ✅ Status */}
              <p
                style={{
                  color:
                    order.status === "Pending"
                      ? "yellow"
                      : order.status === "Cooking"
                      ? "orange"
                      : order.status === "Ready"
                      ? "skyblue"
                      : "lightgreen",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {order.status}
              </p>

              {/* ✅ Items */}
              {order.items?.map((item, i) => (
                <div key={i}>
                  <p style={{ color: "#fff", fontSize: "0.95rem" }}>
                    {item.name}
                  </p>
                  <p style={{ color: "orange", fontWeight: "bold" }}>
                    ₹{item.price} × {item.quantity}
                  </p>
                  <hr
                    style={{
                      border: "0.5px solid #222",
                      margin: "6px 0",
                    }}
                  />
                </div>
              ))}

              {/* ✅ Date */}
              <p style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "10px" }}>
                {new Date(order.createdAt).toLocaleString()}
              </p>

              {/* ✅ Total */}
              <h4
                style={{
                  color: "orange",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Total: ₹{order.totalAmount}
              </h4>
            </div>
          ))
        ) : (
          <p style={{ color: "#aaa", textAlign: "center" }}>
            You haven’t placed any orders yet 🍽️
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
