import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  // ✅ Fetch menu items on load
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  // ✅ When “View 3D Model” button is clicked
  const handleViewModel = (modelUrl) => {
    console.log("3D Model Clicked:", modelUrl);
    setSelectedModel(modelUrl);
  };

  return (
    <div style={{ padding: "30px", background: "#000", color: "#fff" }}>
      <h1>🍽️ Our Menu</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>₹{item.price}</p>
              <button
                style={{
                  background: "orange",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
                onClick={() => handleViewModel(item.modelUrl)}
              >
                View 3D Model
              </button>
            </div>
          ))
        ) : (
          <p>No menu items found</p>
        )}
      </div>
      
      {/* ✅ 3D Model Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl relative">
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-2 right-3 text-black text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-2 text-center">3D Model Preview</h2>

            {/* ✅ 3D viewer */}
            <model-viewer
              src={selectedModel}
              alt="3D Model"
              camera-controls
              auto-rotate
              style={{ width: "100%", height: "400px" }}
            ></model-viewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
