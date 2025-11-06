import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import OrderStatus from "./pages/OrderStatus";

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
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/order-status" element={<OrderStatus/>}/>
      </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
