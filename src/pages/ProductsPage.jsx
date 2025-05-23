import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../utils/store/usecart";
import Header from "../components/tailus/Header";
import Swal from "sweetalert2";
import { supabase } from "../utils/SupaClient.js";
import { Helmet } from "react-helmet-async";

export default function ProductPage() {
  const navigate = useNavigate();
  const { cartCount, fetchCart, addToCart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceSort, setSelectedPriceSort] = useState("");
  const [selectedStockSort, setSelectedStockSort] = useState("");
  const [addingProduct, setAddingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("barang").select("*");
      if (!error) {
        setProducts(data);
        setFilteredProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTypes.includes(product.jenis_barang)
      );
    }

    if (selectedPriceSort) {
      filtered.sort((a, b) =>
        selectedPriceSort === "highest-price"
          ? b.harga - a.harga
          : a.harga - b.harga
      );
    }

    setFilteredProducts(filtered);
  }, [selectedTypes, selectedPriceSort, products]);

  const handleAddToCart = async (product) => {
    console.log(product.id);

    const { success, message } = await addToCart(product.id); // Menunggu hasil dari addToCart

    if (!success) {
      // Menampilkan peringatan jika gagal (belum login)
      Swal.fire({
        icon: "warning",
        title: "You must login first!",
        text: message, // Pesan dari addToCart
        showConfirmButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#007BFF",
        toast: true,
        background: "#fff",
        color: "black",
      }).then(() => {
        navigate("/login"); // Arahkan pengguna ke halaman login setelah menekan tombol
      });
      return; // Hentikan eksekusi jika pengguna belum login
    }

    setAddingProduct(product);

    Swal.fire({
      icon: "success",
      title: "Product successfully added to cart!",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top",
      background: "#007BFF",
      color: "white",
    }).then(() => {
      window.location.reload(); // Reload halaman setelah SweetAlert selesai
    });
  };

  const handleCheckboxChange = (
    value,
    stateSetter,
    state,
    exclusive = false
  ) => {
    if (exclusive) {
      stateSetter(value === state ? "" : value);
    } else {
      stateSetter((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedPriceSort("");
    setSelectedStockSort("");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handler untuk perubahan halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Online Shop | Product</title>
      </Helmet>
      <Header cartCount={cartCount} />
      <div className=" mt-24 px-0 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-1/4 xl:w-1/5 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Product Filter
            </h3>

            {/* Jenis Barang */}
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Type Product
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                {["drink", "food"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg  dark:bg-gray-700 cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() =>
                        handleCheckboxChange(
                          type,
                          setSelectedTypes,
                          selectedTypes
                        )
                      }
                      className="checkbox checkbox-primary"
                    />
                    <span className="text-gray-800 dark:text-gray-200">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Urutkan Harga */}
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Price
              </p>
              <div className="flex flex-col gap-2">
                {["highest-price", "lowest-price"].map((sort) => (
                  <label
                    key={sort}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg  dark:bg-gray-700 cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <input
                      type="radio"
                      name="priceSort"
                      checked={selectedPriceSort === sort}
                      onChange={() =>
                        handleCheckboxChange(
                          sort,
                          setSelectedPriceSort,
                          selectedPriceSort,
                          true
                        )
                      }
                      className="radio radio-primary"
                    />
                    <span className="text-gray-800 dark:text-gray-200 capitalize">
                      {sort.replace("-", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tombol Reset */}
            <button
              onClick={resetFilters}
              className="w-full py-3 mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-medium rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none transition-all duration-300"
            >
              Reset Filter
            </button>
          </aside>

          <div className="w-full ">
            <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800 dark:text-white">
              List Product
            </h2>
            {loading ? (
              <div className="h-screen flex items-center justify-center">
                <h2>Loading...</h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 
                 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    {/* Gambar Produk */}
                    <div className="relative">
                      <img
                        src={product.foto_barang}
                        alt={product.nama_barang}
                        className="w-full h-44 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Nama & Harga */}
                    <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-1">
                      {product.nama_barang}
                    </h3>
                    <p className="text-gray-500 text-sm dark:text-gray-300">
                      Rp {product.harga.toLocaleString()}
                    </p>

                    {/* Deskripsi (agar mengisi ruang kosong) */}
                    <div className="flex-grow">
                      <p className="text-gray-600 text-sm dark:text-gray-400 line-clamp-2">
                        {product.deskripsi}
                      </p>
                    </div>

                    {/* Tombol Add to Cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full py-1.5 px-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md 
                   hover:from-blue-600 hover:to-blue-800 transition-all duration-300 mt-4 text-xs sm:text-sm shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
