import React from "react";

const CardChoose = ({ title, description, image, bgColor }) => {
  return (
    <div
      className={`${bgColor} dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 max-w-xs w-full mx-auto`}
      style={{ height: "300px", minHeight: "300px" }}
    >
      <img src={image} alt={title} className="h-24 w-24 object-contain mb-4" />
      <h3 className="text-black dark:text-white text-xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-black dark:text-white line-clamp-3">{description}</p>
    </div>
  );
};

export default CardChoose;
