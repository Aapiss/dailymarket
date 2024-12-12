import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaClient";
import useFormatRupiah from "../components/hooks/useFormatRupiah";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";

const DetailProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatRupiah } = useFormatRupiah();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("item")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error.message}
      </div>
    );
  if (!product)
    return <div className="text-center mt-4">Product not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <Header />

      {/* Konten */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded mb-4"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Gambar Produk */}
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src={product.image_item || "/path/to/default-image.jpg"}
              alt={product.item_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informasi Produk */}
          <div className="p-4 w-full md:w-1/2">
            <h2 className="text-2xl font-bold">{product.item_name}</h2>
            <p className="text-sm mt-2">{product.description}</p>
            <p className="text-xl font-semibold mt-4 text-purple-600 dark:text-purple-400">
              {formatRupiah(product.item_price)}
            </p>
            <button className="bg-blue-300 text-black hover:bg-blue-400 px-4 py-2 rounded mt-6">
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailProducts;
