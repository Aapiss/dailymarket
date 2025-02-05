import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DetailProducts from "./pages/DetailProducts";
import ProductsPage from "./pages/ProductsPage";
import CounterApp from "./pages/ConterApp";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisPage";
import Profile from "./pages/Profile";
import { useAuth } from "./utils/store/useAuth";
import AuthRoute from "./auth/AuthRoute";
import UserRoute from "./auth/UserRoute";
import CartPage from "./pages/CartPage";
import { useCart } from "./utils/store/useCart";
const App = () => {
  const { fetchUser, loading } = useAuth();
  const { fetchCart } = useCart();

  useEffect(() => {
    fetchUser();
    fetchCart();
  }, [fetchUser, fetchCart]);

  if (loading) {
    return (
      <h2 className="text-center h-screen flex justify-center items-center">
        Loading...
      </h2>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<DetailProducts />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route element={<UserRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
