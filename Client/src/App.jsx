import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
