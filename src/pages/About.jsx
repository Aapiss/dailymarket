import React from "react";
import Footer from "../components/tailus/Footer";
import FloatBtn from "../components/FloatBtn";
import { Helmet } from "react-helmet-async";
import Header from "../components/tailus/Header";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="About" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div>
        <FloatBtn />
        {/* Hero Section */}
        <section className="relative bg-blue-200">
          <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
            <div className="text-center md:text-left md:w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold text-blue-700">
                About <span className="text-blue-500">Us</span>
              </h1>
              <p className="text-lg leading-relaxed dark:text-black">
                We are passionate about providing high-quality products and
                services to meet your needs. Our goal is to ensure your
                satisfaction and bring innovation to everything we do.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src="./img-hero.svg"
                alt="Team"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="py-16 bg-blue-50 dark:bg-black">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-10 text-blue-600">
              Our Mission, Vision, and Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <img
                  src="./mision.png"
                  alt="Mission"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-3 text-blue-700">
                  Our Mission
                </h3>
                <p>
                  To empower our customers with quality and innovative solutions
                  that improve their lives and businesses.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <img src="./vision.png" alt="Vision" className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-blue-700">
                  Our Vision
                </h3>
                <p>
                  To be a trusted and innovative leader in our industry,
                  building long-lasting relationships with our customers.
                </p>
              </div>

              {/* Values */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <img src="./values.png" alt="Values" className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-blue-700">
                  Our Values
                </h3>
                <p>
                  We are guided by integrity, innovation, and excellence in all
                  our actions and interactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
