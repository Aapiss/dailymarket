import React, { useState } from "react";
import Header from "../components/tailus/Header";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaClient";
import Sidebar from "../components/products/Sidebar";
import AllProducts from "../components/products/AllProducts";
import Footer from "../components/tailus/Footer";

const ProductsPage = () => {
  const [shortby, setShortBy] = useState();
  const [category, setCategory] = useState([]);
  const [shortbyclient, setShortByClient] = useState();
  const { data: products } = useQuery({
    queryKey: ["products", shortby, category],
    queryFn: async () => {
      let query = supabase.from("item").select("*");

      if (shortby === "expensive") {
        query = query.order("item_price", { ascending: false });
      } else if (shortby === "cheap") {
        query = query.order("item_price", { ascending: true });
      }

      if (category.length > 0) {
        query = query.in("item_type", category);
      }

      if (shortbyclient === "a") {
        query = query.order("item_name", { ascending: true });
      } else if (shortbyclient === "z") {
        query = query.order("item_name", { ascending: false });
      }

      const res = await query;
      return res.data;
    },
  });
  return (
    <>
      <Header />
      <main className="m-4 flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <Sidebar
          setShortBy={setShortBy}
          setCategory={setCategory}
          setShortByClient={setShortByClient}
          className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 rounded"
        />

        {/* Konten Produk */}
        <AllProducts
          products={products}
          className="flex-grow bg-white dark:bg-gray-900 p-4 rounded shadow"
        />
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
