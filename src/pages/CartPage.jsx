import React, { useEffect, useState } from "react";
import { useCart } from "../utils/store/useCart";
import Card from "../components/daisy/Card";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { fetchCart, cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleDelete = async (idProduct) => {
    await removeFromCart(idProduct);
    setCartItems(cartItems.filter((item) => item.id_product !== idProduct));
  };

  // 🔹 Hitung Total Harga
  const totalPrice =
    cartItems?.reduce((acc, item) => acc + item.price * item.amount, 0) || 0;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Tombol Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
      >
        Back
      </button>

      {/* Judul Halaman */}
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      {/* Konten Keranjang */}
      {cartItems?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                idProduct={item.id_product}
                title={item.product_name}
                image={item.item?.image_item}
                amount={item.amount}
                price={item.price}
                hideAddToCart={true}
                isCartPage={true}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Total Harga & Tombol Checkout */}
          <div className="flex justify-end items-center mt-6 gap-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total:{" "}
              <span className="text-green-600">
                Rp {totalPrice.toLocaleString()}
              </span>
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 focus:outline-none"
            >
              Check Out
            </button>
          </div>
        </>
      ) : (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
