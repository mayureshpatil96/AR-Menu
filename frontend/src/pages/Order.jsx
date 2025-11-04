import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    // ✅ auto-refresh every 5s for live updates
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">
        🔥 Live Orders
      </h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order #{order._id.slice(-4).toUpperCase()}
              </h2>
              <p className="text-gray-400 mb-3">
                Customer: <span className="text-orange-400">{order.customerName}</span>
              </p>
              <ul className="text-sm text-gray-300 mb-4">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-orange-400">₹{order.total}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No live orders yet...</p>
      )}
    </div>
  );
};

export default Orders;
