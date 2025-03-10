import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/SupaClient";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("barang")
    .select("id, nama_barang, harga, deskripsi, foto_barang");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const ProductList = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Loading...</h2>
      </div>
    );

  if (isError) return <p>Error: {error.message}</p>;

  // Menampilkan jumlah produk sesuai dengan visibleCount
  const displayedProducts = products.slice(0, visibleCount);

  return (
    <div className="my-16 text-gray-900 dark:text-white">
      <h2 className="text-4xl font-extrabold text-center relative pb-3">
        Our Product
        <span className="block w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-2">
        {displayedProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={item.foto_barang}
              alt={item.nama_barang}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{item.nama_barang}</h3>
            <p className="text-blue-500 font-bold">
              {formatRupiah(item.harga)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
              {item.deskripsi}
            </p>
          </div>
        ))}
      </div>

      {/* Tombol Load More jika masih ada produk yang belum ditampilkan */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount(visibleCount + 4)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
