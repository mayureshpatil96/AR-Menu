import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // ✅ Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${id}/status`, {
        status: newStatus,
      });
      fetchOrders(); // refresh list
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // ✅ Delete completed order
  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to remove this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders(); // refresh list
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      style={{
        background: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
        padding: "30px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        🍽️ Admin Dashboard
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: "#bbb" }}>No active orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "#1a1a1a",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 0 15px rgba(255,255,255,0.05)",
            }}
          >
            <h3 style={{ color: "orange", marginBottom: "10px" }}>
              🪑 Table {order.tableNumber || "N/A"}
            </h3>

            <div style={{ marginBottom: "12px" }}>
              <strong>Order ID:</strong> <span style={{ color: "#bbb" }}>{order._id}</span>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <strong>Items:</strong>
              <ul style={{ marginTop: "5px", color: "#ccc" }}>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <strong>Total Amount:</strong>{" "}
              <span style={{ color: "lightgreen" }}>₹{order.totalAmount}</span>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    order.status === "Completed"
                      ? "lightgreen"
                      : order.status === "Cooking"
                      ? "orange"
                      : "#ff4444",
                  fontWeight: "600",
                }}
              >
                {order.status}
              </span>
            </div>

            <div style={{ marginTop: "12px" }}>
              {order.status !== "Completed" ? (
                <button
                  onClick={() => updateStatus(order._id, "Completed")}
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  ✅ Mark as Completed
                </button>
              ) : (
                <button
                  onClick={() => deleteOrder(order._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Remove Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
