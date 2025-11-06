import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:5000/api/orders");
    setOrders(response.data);
  };

  const updateStatus = async (id, newStatus) => {
    await axios.patch(`http://localhost:5000/api/orders/${id}/status`, {
      status: newStatus,
    });
    fetchOrders(); // refresh
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🍽️ Admin Dashboard</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded-lg mb-3">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Status:</b> {order.status}</p>
          <div className="flex gap-2 mt-2">
            {["Pending", "Cooking", "Ready", "Delivered"].map((status) => (
              <button
                key={status}
                onClick={() => updateStatus(order._id, status)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
