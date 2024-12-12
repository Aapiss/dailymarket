import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useFormatRupiah from "../hooks/useFormatRupiah";

const Card = ({ id, title, image, description, price }) => {
  const { formatRupiah } = useFormatRupiah();
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  const handleBuyNow = () => {
    navigate(`/detail/${id}`); // Arahkan ke halaman detail dengan ID produk
  };

  return (
    <div className="card bg-base-100 shadow-xl transition-transform transform hover:scale-105">
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
        <p className="text-purple-500 font-bold mt-2">{formatRupiah(price)}</p>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={handleBuyNow} // Panggil fungsi navigasi saat tombol diklik
            className="btn bg-blue-300 text-black hover:bg-blue-400"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
