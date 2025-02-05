import React from "react";
import { Link } from "react-router-dom";

const FloatBtn = () => {
  return (
    <>
      <Link
        to={
          "https://wa.me/+6289608400215?text=Hello,I+want+to+buy+your+product."
        }
        target="_blank"
        className="fixed bottom-4 right-4"
      >
        <button className="bg-green-500 text-white btn-circle hover:bg-green-600 transition">
          <img src="./wa.png" alt="" className="size-12" />
        </button>
      </Link>
    </>
  );
};

export default FloatBtn;
