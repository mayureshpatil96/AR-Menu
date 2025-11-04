import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:5000/api/cart/${id}`)
      .then(() => setCartItems(cartItems.filter((item) => item._id !== id)))
      .catch((err) => console.error("Error deleting item:", err));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        paddingBottom: "40px",
      }}
    >
        <Navbar />
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400 flex items-center justify-center gap-2">
        Your Cart <FaShoppingCart />
      </h1>
    

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px' }} 
                />
                  <div>
                    <h2 className="text-xl font-semibold text-yellow-300">
                      {item.name}
                    </h2>
                    <p className="text-gray-400">₹{item.price}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Total section */}
          <div className="mt-10 bg-gray-900 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
              Total Amount
            </h3>
            <p className="text-3xl font-bold text-white">₹{totalAmount}</p>
            <button className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
