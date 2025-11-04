import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  // ✅ Fetch menu items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu"); // replace if needed
        console.log("Fetched Menu Items:", response.data);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  const handleViewModel = (modelUrl) => {
    setSelectedModel(modelUrl);
  };

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
      <Navbar />

      {/* ✅ Menu Header */}
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2 style={{ color: "orange", fontSize: "2rem", marginBottom: "10px" }}>
          Our Delicious Menu
        </h2>
        <p style={{ color: "#aaa", fontSize: "1rem" }}>
          Discover our handpicked dishes with stunning 3D previews.
        </p>
      </div>

      {/* ✅ Dish Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "0 40px 60px",
        }}
      >
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
                  height: "160px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>
                {item.name}
              </h3>
              <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{item.description}</p>
              <p style={{ color: "orange", fontWeight: "bold" }}>₹{item.price}</p>

              <button
                onClick={() => handleViewModel(item.modelUrl)}
                style={{
                  background: "orange",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "600",
                }}
              >
                View 3D Model
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#aaa" }}>No dishes available</p>
        )}
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
            backgroundColor: "rgba(0,0,0,0.9)",
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

export default Menu;
