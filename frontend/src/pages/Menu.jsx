import React, { useEffect, useState } from "react";
import { getMenuItems } from "../services/api";
import ModelViewer from "../components/ModelViewer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems();
      setMenuItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="border rounded-xl p-4 shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-1">₹{item.price}</p>

            {/* 👇 Only show AR Model if URL exists */}
            {item.modelURL && (
              <div className="mt-4">
                <ModelViewer modelPath={item.modelURL} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
