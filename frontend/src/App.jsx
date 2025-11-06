import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AdminOrder from "./pages/AdminOrder";
import OrderStatus from "./pages/OrderStatus";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ add if not already

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="pt-16 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin" element={<AdminDashboard />} /> {/* ✅ keep one */}
            <Route path="/admin/orders" element={<AdminOrder />} /> {/* ✅ new route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
