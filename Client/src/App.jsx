import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import { AuthStore } from "./store/AuthStore";
import AdminDashboard from "./pages/AdminDashboard";

// New Application

function App() {
  const { user } = AuthStore();
  const location = useLocation();
  const hideHeader = ["/admin", "/login", "/signup"].includes(
    location.pathname
  );

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/ProductsList"
          element={user ? <ProductListing /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/ProductDetail/:Id"
          element={user ? <ProductDetails /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/mycart"
          element={user ? <CartPage /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
