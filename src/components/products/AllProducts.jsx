import React, { useState } from "react";
import Card from "../daisy/Card";
import truncateText from "../hooks/useTruncateText";

const AllProducts = ({ products = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter produk berdasarkan kata kunci pencarian
  const filteredProducts = Array.isArray(products)
    ? products.filter((item) =>
        item.item_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <section id="product" className="w-full md:w-4/5 mx-auto">
      {/* Input Search */}
      <div className="mb-4 px-2">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Cari barang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="rounded-lg bg-white shadow">
              <Card
                id={item.id}
                title={item.item_name}
                image={item.image_item}
                price={item.item_price}
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
    </section>
  );
};

export default AllProducts;
