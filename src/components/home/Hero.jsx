import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  // Typing Effect
  const text = "DailyMarket 🚀🚀";
  const [displayedText, setDisplayedText] = React.useState("");
  const [i, setI] = React.useState(0);

  //   Multi Slide Effect
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  React.useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i]);

  return (
    <section id="home" className="md:mt-16">
      <div className="bg-blue-200 rounded-md h-auto md:h-[500px] p-6 md:p-14 flex flex-col md:flex-row items-center">
        {/* Sect 1 */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl dark:text-black font-bold">
            Welcome to <br />
            <span className="text-blue-600">
              {displayedText ? displayedText : "DailyMarket 🚀🚀"}
            </span>
          </h2>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={MULTIDIRECTION_SLIDE_VARIANTS}
              transition={{ duration: 1 }}
              className="mt-4 text-lg md:text-xl dark:text-blackqq tracking-[-0.02em] drop-shadow-sm dark:text-black"
            >
              Discover top products from various categories for your daily
              needs. Start shopping easily, safely, and comfortably at
              DailyMarket!
            </motion.p>

            <motion.div
              initial="right"
              animate="visible"
              variants={MULTIDIRECTION_SLIDE_VARIANTS}
              transition={{ duration: 1 }}
            >
              <Link
                to="/shop"
                className="mt-6 inline-block px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                Start Shopping
              </Link>
            </motion.div>
          </div>
          <p className="mt-4 text-lg md:text-xl"></p>
        </div>

        {/* Sect Image */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <motion.img
            initial="hidden"
            animate="visible"
            src={"./img-hero.svg"}
            transition={{ duration: 1 }}
            variants={variants1}
            className="w-full h-auto md:h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
