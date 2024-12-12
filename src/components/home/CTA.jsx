import React from "react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="mb-20 bg-gray-600 rounded-lg "
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),url('https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center gap-4 p-20 max-lg:p-10 max-lg:h-50 max-lg:text-center">
        <h2 className="text-white text-4xl font-bold">
          Interested in shopping here?
        </h2>
        <p className="text-white">please click the button below!</p>

        <button className="btn bg-white hover:bg-blue-400 border-none text-black">
          Shopping Now
        </button>
      </div>
    </section>
  );
};

export default CTA;
