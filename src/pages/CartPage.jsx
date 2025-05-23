import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaArrowLeft,
  FaBoxOpen,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Header from "../components/tailus/Header";
import { Helmet } from "react-helmet-async";
import CheckoutButton from "../components/CheckoutButton";
import QuantitySelector from "../components/QuantitySelector";
import { supabase } from "../utils/SupaClient";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("keranjang")
        .select(
          "id, barang_id, quantity, barang(nama_barang, foto_barang, harga, stok)"
        )
        .eq("profile_id", user.user.id);

      if (error) {
        console.error(error);
      } else {
        const groupedCart = data.reduce((acc, item) => {
          const foundItem = acc.find(
            (cartItem) => cartItem.barang_id === item.barang_id
          );
          if (foundItem) {
            foundItem.quantity += item.quantity;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
        setCart(groupedCart);
      }
    };

    fetchCart();
  }, []);

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  const totalHarga = cart.reduce(
    (total, item) => total + item.barang.harga * item.quantity,
    0
  );

  const handleDelete = async (barang_id) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "Product will be removed from cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const { error } = await supabase
        .from("keranjang")
        .delete()
        .eq("profile_id", user.user.id)
        .eq("barang_id", barang_id);

      if (error) {
        Swal.fire("Terjadi kesalahan", error.message, "error");
      } else {
        setCart(cart.filter((item) => item.barang_id !== barang_id));
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: "Product removed from cart!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#007BFF",
          color: "#fff",
          customClass: {
            popup: "shadow-md",
          },
        });
      }
    }
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.barang_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.barang_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.barang_id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-blue-900 relative pt-16">
      <Helmet>
        <title>{`Online Shop | Cart (${
          cart.length > 0
            ? cart.reduce((acc, item) => acc + item.quantity, 0)
            : 0
        })`}</title>
      </Helmet>

      <Header />

      {/* Tombol Back di pojok kiri atas */}
      <button
        onClick={() => navigate("/product")}
        className="absolute left-4 top-[72px] text-black dark:text-blue-200 text-xl hover:text-gray-800 dark:hover:text-blue-400 transition-colors"
      >
        <FaArrowLeft />
      </button>

      <div className="p-4 sm:p-6 flex-grow max-w-7xl mx-auto">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-2xl sm:text-3xl font-bold  dark:text-blue-200 mb-4">
              Cart
            </h1>
            <p className=" dark:text-blue-300 text-lg mb-6">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daftar Produk */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.barang_id}
                  className="flex items-center justify-between p-5 bg-white dark:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-blue-200 dark:border-blue-700"
                >
                  {/* Gambar Produk */}
                  <div className="flex items-center">
                    <img
                      src={item.barang.foto_barang}
                      alt={item.barang.nama_barang}
                      className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />

                    {/* Detail Produk */}
                    <div className="ml-5">
                      <h2 className="text-base font-semibold text-blue-800 dark:text-blue-200">
                        {item.barang.nama_barang}
                      </h2>
                      <p className="text-sm text-blue-500 dark:text-blue-300">
                        {formatHarga(item.barang.harga)}
                      </p>
                    </div>
                  </div>

                  {/* QuantitySelector & Hapus */}
                  <div className="flex items-center space-x-4">
                    <QuantitySelector
                      quantity={item.quantity}
                      stock={item.barang.stok}
                      onIncrease={() => handleIncreaseQuantity(item.barang_id)}
                      onDecrease={() => handleDecreaseQuantity(item.barang_id)}
                      onChange={(newQty) =>
                        handleQuantityChange(item.barang_id, newQty)
                      }
                    />

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => handleDelete(item.barang_id)}
                      className="text-red-600 dark:text-red-400 text-lg hover:text-red-800 dark:hover:text-red-500 transition-all"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Belanja */}
            <div className="bg-white dark:bg-blue-800 p-6 rounded-2xl shadow-lg border border-blue-300 dark:border-blue-700 h-fit">
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <span className="mr-2 text-blue-500">
                  <FaShoppingCart />
                </span>
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-blue-600 dark:text-blue-300">
                  <span className="flex items-center">
                    <FaBoxOpen className="mr-2 text-lg text-blue-500" />
                    Total Items:
                  </span>
                  <span className="font-medium">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-blue-800 dark:text-blue-200 text-lg font-semibold border-t pt-3">
                  <span className="flex items-center">
                    <FaMoneyBillWave className="mr-2 text-lg text-green-500" />
                    Total Price:
                  </span>
                  <span>{formatHarga(totalHarga)}</span>
                </div>
              </div>

              <CheckoutButton
                cart={cart}
                totalHarga={totalHarga}
                navigate={navigate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
