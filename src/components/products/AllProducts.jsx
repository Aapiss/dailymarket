import React, { useState } from "react";
import Card from "../daisy/Card";
import truncateText from "../hooks/useTruncateText";

const AllProducts = ({ products, searchProduct, setSearchProduct = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Jumlah produk per halaman

  // Filter produk berdasarkan kata kunci pencarian
  const filteredProducts = Array.isArray(products)
    ? products.filter((item) =>
        item.item_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Hitung total halaman
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Tentukan item yang akan ditampilkan berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Fungsi untuk berpindah halaman
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="product" className="w-full md:w-4/5 mx-auto">
      {/* Input Search */}
      <div className="mb-4 px-2">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cari barang..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset ke halaman 1 saat pencarian
            setSearchProduct(e.target.value);
          }}
        />
      </div>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <div key={item.id} className="rounded-lg bg-white shadow">
              <Card
                idProduct={item.id}
                title={item.item_name}
                image={item.image_item}
                price={item.price}
                type={item.item_type}
                description={truncateText(item.description)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Barang tidak ditemukan.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AllProducts;
