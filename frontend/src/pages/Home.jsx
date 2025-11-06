import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";// ✅ if using React Router
import Navbar from "../components/Navbar";
 

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  // ✅ Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        console.log("Fetched items:", response.data);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  const handleViewModel = (modelUrl) => {
    console.log("3D Model Clicked:", modelUrl);
    setSelectedModel(modelUrl);
  };

const handleAddToCart = async (item) => {
  try {
    await axios.post("http://localhost:5000/api/cart", {
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    alert(`${item.name} added to cart!`);
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Failed to add item to cart");
  }
};

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
      {/* ✅ Navbar */}
      

      {/* ✅ Banner Section */}
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/055/741/940/non_2x/welcome-to-our-restaurant-sign-illustration-free-vector.jpg"
          alt="Restaurant Banner"
          style={{
            width: "100%",
            display: "block",
            height:"500px",
            borderRadius: "0px",
            boxShadow: "0 0 15px rgba(255,255,255,0.1)",
          }}
        />
      </div>

      {/* ✅ Most Ordered Dishes Section */}
      <div style={{ padding: "20px 40px" }}>
        <h2 style={{ color: "orange", fontSize: "1.5rem", marginBottom: "20px" }}>
          Most Ordered Dishes
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#0d0d0d",
                  borderRadius: "15px",
                  padding: "20px",
                  width: "230px",
                  textAlign: "center",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>{item.name}</h3>
                <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{item.description}</p>
                <p style={{ color: "orange", fontWeight: "bold" }}>₹{item.price}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
  <button
    onClick={() => handleViewModel(item.modelUrl)}
    style={{
      background: "orange",
      color: "#000",
      border: "none",
      borderRadius: "5px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    View 3D Model
  </button>

  <button
  onClick={() => handleAddToCart(item)}
  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
>
  Add to Cart
</button>

</div>

              </div>
            ))
          ) : (
            <p style={{ color: "#aaa" }}>No dishes available</p>
          )}
        </div>
      </div>

      {/* ✅ 3D Model Modal */}
      {selectedModel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#111",
              borderRadius: "20px",
              padding: "20px",
              width: "90%",
              maxWidth: "700px",
              textAlign: "center",
              boxShadow: "0 0 25px rgba(255,255,255,0.1)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedModel(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                background: "transparent",
                color: "#fff",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h2 style={{ color: "orange", marginBottom: "15px" }}>3D Model Preview</h2>

            <model-viewer
              src={selectedModel}
              alt="3D Model"
              camera-controls
              auto-rotate
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px",
                backgroundColor: "#000",
              }}
            ></model-viewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
