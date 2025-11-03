const API_URL = "http://localhost:5000/api/menu";

export const getMenuItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};
