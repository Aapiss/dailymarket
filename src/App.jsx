import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DetailProducts from "./pages/DetailProducts";
import CounterApp from "./pages/ConterApp";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisPage";
import AuthRoute from "./auth/AuthRoute";
import UserRoute from "./auth/UserRoute";
import ProductPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import HistoryPayment from "./pages/HistoryPayment";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<DetailProducts />} />
        <Route element={<UserRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/history" element={<HistoryPayment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
