import React, { useState } from "react";

const Sidebar = ({ setShortBy, setCategory, setShortByClient }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShortBy(filter);
    setShortByClient(filter);
  };

  const handleResetFilter = () => {
    setSelectedFilter("");
    setShortBy("");
    setSelectedCategory([]);
    setCategory([]);
    setSortOrder(""); // Reset urutan sort jika diperlukan
  };

  const handleCategory = (category) => {
    const updateCategory = selectedCategory.includes(category)
      ? selectedCategory.filter((cat) => cat !== category)
      : [...selectedCategory, category];

    setSelectedCategory(updateCategory);
    setCategory(updateCategory);
  };

  return (
    <aside className="w-full md:w-1/5 p-4 md:p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-3 font-bold text-blue-500">
          Filter Product
        </h2>
        <label className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="radio-produk"
            className="radio radio-blue-500"
            checked={selectedFilter === "expensive"}
            onChange={() => handleFilterChange("expensive")}
          />
          <span className="text-blue-600">Expensive Product</span>
        </label>
        <label className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="radio-produk"
            className="radio radio-blue-500"
            checked={selectedFilter === "cheap"}
            onChange={() => handleFilterChange("cheap")}
          />
          <span className="text-blue-600">Cheap Product</span>
        </label>

        <div className="kategori mt-6 flex flex-col items-center">
          <h2 className="text-2xl mb-3 font-bold text-blue-500">
            Category Products
          </h2>
          <label className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              className="checkbox checkbox-blue-500"
              checked={selectedCategory.includes("food")}
              onChange={() => handleCategory("food")}
            />
            <span className="text-blue-600">Food</span>
          </label>
          <label className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              className="checkbox checkbox-blue-500"
              checked={selectedCategory.includes("drink")}
              onChange={() => handleCategory("drink")}
            />
            <span className="text-blue-600">Drink</span>
          </label>
        </div>

        <div className="text-center my-4">
          <button
            onClick={() => handleFilterChange("a")}
            className="btn mx-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
          >
            A-Z
          </button>
          <button
            onClick={() => handleFilterChange("z")}
            className="btn mx-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
          >
            Z-A
          </button>
        </div>

        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white mt-4"
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
