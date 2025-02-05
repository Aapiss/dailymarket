import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal
import useFormatRupiah from "../hooks/useFormatRupiah";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";

const Card = ({
  key,
  title,
  image,
  description,
  price,
  amount,
  idProduct,
  hideAddToCart,
  isCartPage,
  onDelete,
}) => {
  const { formatRupiah } = useFormatRupiah();
  const { user } = useAuth();
  const { addToCart, fetchCart } = useCart();
  const [loading, setLoading] = useState(false);

  const toCart = async () => {
    setLoading(true);

    try {
      await addToCart({
        id_user: user.id,
        id_product: idProduct,
        product_name: title,
        amount: amount,
        price: price,
      });

      await fetchCart(); // Ambil data terbaru setelah menambah produk

      Swal.fire({
        title: "Berhasil!",
        text: "Produk berhasil ditambahkan ke keranjang.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menambahkan ke keranjang.",
        icon: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div
      className="card bg-base-100 shadow-xl transition-transform transform hover:scale-105"
      key={key}
    >
      <figure className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg text-black dark:text-white font-bold">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-white text-sm truncate">
          {description}
        </p>
        <p className="text-purple-500 font-bold mt-2">{amount}</p>
        <p className="text-purple-500 font-bold mt-2">{formatRupiah(price)}</p>

        {!hideAddToCart && (
          <div className="card-actions justify-end mt-4">
            {!user ? (
              <Link
                to={"/login"}
                className="btn bg-blue-300 text-black hover:bg-blue-400"
              >
                Add to Cart
              </Link>
            ) : (
              <button
                onClick={toCart}
                className="btn bg-blue-300 text-black hover:bg-blue-400 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            )}
          </div>
        )}
        {isCartPage && (
          <button
            onClick={() => onDelete(idProduct)}
            className="btn bg-red-500 text-white hover:bg-red-600 mt-2"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
