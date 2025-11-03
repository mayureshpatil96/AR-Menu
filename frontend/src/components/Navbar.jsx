import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 16, display: "flex", justifyContent: "space-between", background: "#fff6ea", alignItems: "center" }}>
      <div style={{ fontWeight: 700 }}>🍽️ FoodAR</div>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/order">Orders</Link>
        <Link to="/account">My Account</Link>
        <Link to="/login">Login</Link>
        <div>🛒</div>
      </div>
    </nav>
  );
}
