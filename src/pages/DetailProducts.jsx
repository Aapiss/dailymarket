import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaClient";
import useFormatRupiah from "../components/hooks/useFormatRupiah";
import Footer from "../components/tailus/Footer";
import { Helmet } from "react-helmet-async";
import Header from "../components/tailus/Header";

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
        .from("barang")
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-16">
      {/* Header */}
      <Helmet>
        <title>{`Online Shop - ${product.nama_barang}`}</title>
      </Helmet>
      <Header />

      {/* Konten */}
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Gambar Produk */}
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src={product.foto_barang || "/path/to/default-image.jpg"}
              alt={product.nama_barang}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informasi Produk */}
          <div className="p-4 w-full md:w-1/2">
            {/* Nama Barang */}
            <h2 className="text-3xl font-bold">{product.nama_barang}</h2>

            {/* Deskripsi */}
            <p className="text-lg mt-2">{product.deskripsi}</p>

            {/* Jenis Barang */}
            <p className="text-lg mt-2 font-medium text-gray-700 dark:text-gray-300">
              Type:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {product.jenis_barang}
              </span>
            </p>

            {/* Stok Barang */}
            <p className="text-lg mt-2 font-medium text-gray-700 dark:text-gray-300">
              Stock:{" "}
              <span
                className={`font-semibold ${
                  product.stok > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {product.stok > 0
                  ? `${product.item_stock} Available`
                  : "Out of Stock"}
              </span>
            </p>

            {/* Harga */}
            <p className="text-xl font-semibold mt-4 text-purple-600 dark:text-purple-400">
              {formatRupiah(product.harga)}
            </p>

            {/* Tombol Tambah ke Keranjang + Back */}
            <div className="flex flex-col">
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded mt-6"
                disabled={product.stok === 0}
              >
                {product.stok > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={() => navigate("/product")}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded mt-4"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailProducts;
