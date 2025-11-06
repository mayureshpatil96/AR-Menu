
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  // ✅ Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart");
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  // ✅ Remove item from cart
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  // inside your Cart component:

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartItems,
        totalAmount,
      };
  
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
  
      if (response.status === 201) {
        alert("✅ Order placed successfully!");
        navigate("/my-orders");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("❌ Failed to place order");
    }
  };
  
  

  // ✅ Calculate total
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
        padding: "0",
      }}
    >
      {/* ✅ Navbar */}
      

      {/* ✅ Cart Header */}
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2 style={{ color: "orange", fontSize: "2rem", marginBottom: "10px" }}>
          Your Cart 🛒
        </h2>
        <p style={{ color: "#aaa", fontSize: "1rem" }}>
          Review your selected dishes before checkout.
        </p>
      </div>

      {/* ✅ Cart Items */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          padding: "0 40px 60px",
        }}
      >
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
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
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "160px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h3
                style={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}
              >
                {item.name}
              </h3>
              <p style={{ color: "orange", fontWeight: "bold" }}>
                ₹{item.price}
              </p>
              <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
                Qty: {item.quantity}
              </p>

              <button
                onClick={() => handleRemove(item._id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#aaa", textAlign: "center" }}>
            Your cart is empty 🛒
          </p>
        )}
      </div>

      {/* ✅ Total Section */}
      {cartItems.length > 0 && (
        <div
          style={{
            background: "#0d0d0d",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(255, 255, 255, 0.05)",
            textAlign: "center",
            maxWidth: "400px",
            margin: "0 auto 60px",
          }}
        >
          <h3
            style={{
              color: "orange",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Total Amount
          </h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            ₹{totalAmount}
          </p>
          <button
            onClick={handlePlaceOrder}
            style={{
              background: "orange",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "600",
              marginTop: "15px",
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
