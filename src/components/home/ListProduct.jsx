import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/SupaClient";
import Card from "../daisy/Card";

const ListProduct = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const {
    data: product = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("item").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading products</h2>;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center dark:text-white">
        List Product
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {product.slice(0, visibleCount).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.item_name}
            image={item.image_item}
            price={item.item_price}
            description={item.description}
          />
        ))}
      </div>
      {visibleCount < product.length && (
        <div className="flex justify-center mt-8">
          <button onClick={handleLoadMore} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
