import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Order from "./pages/Order";
import ModelViewer from "./components/ModelViewer"; // ✅ import this

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/model-viewer" element={<ModelViewer />} /> {/* ✅ ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;
