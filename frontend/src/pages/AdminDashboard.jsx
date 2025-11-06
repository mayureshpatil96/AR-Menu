import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

// connect
const socket = io("http://localhost:5000");

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // initial fetch
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));

    // new incoming order
    socket.on("newOrder", (order) => {
      setOrders(prev => [order, ...prev]);
    });

    // status updated
    socket.on("orderStatusUpdated", (updated) => {
      setOrders(prev => prev.map(o => (o._id === updated._id ? updated : o)));
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderStatusUpdated");
      socket.disconnect();
    };
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status });
      // backend emits orderStatusUpdated; we update via socket event
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div style={{ padding: 20, background: "#000", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ color: "orange" }}>Live Orders (Admin / Cook)</h1>
      {orders.map(order => (
        <div key={order._id} style={{ background: "#111", padding: 16, margin: "12px 0", borderRadius: 8 }}>
          <div><strong>ID:</strong> {order._id}</div>
          <div><strong>Total:</strong> ₹{order.total}</div>
          <div><strong>Status:</strong> {order.status}</div>
          <div>
            {order.items.map((it, i) => (
              <div key={i}>{it.name} x {it.quantity}</div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            {["Pending","Preparing","Ready","Delivered"].map(s => (
              <button key={s} onClick={() => updateStatus(order._id, s)} style={{ marginRight: 8 }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
