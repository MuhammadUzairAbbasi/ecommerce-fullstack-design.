import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductsList" element={<ProductListing />} />
        <Route path="/ProductDetail/:Id" element={<ProductDetails />} />
        <Route path="/MyCart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
