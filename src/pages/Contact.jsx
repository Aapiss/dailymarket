import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import FloatBtn from "../components/FloatBtn";

const Contact = () => {
  return (
    <div className="bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-100 min-h-screen">
      <Header />
      <FloatBtn />
      <section className="relative bg-blue-200 dark:bg-blue-800 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-300">
              Contact{" "}
              <span className="text-blue-500 dark:text-blue-400">Us</span>
            </h1>
            <p className="text-lg leading-relaxed">
              Have any questions, feedback, or need assistance? We are here to
              help! Reach out to us through the form below or via our contact
              details.
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="./img-hero.svg"
              alt="Contact Us"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-300">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6 text-center">
              <img
                src="./telephone.svg"
                alt="Phone"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                Phone
              </h3>
              <p className="mt-2 text-blue-800 dark:text-blue-200">
                +62 896 0840 0215
              </p>
            </div>
            {/* Email */}
            <div className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6 text-center">
              <img
                src="./email.svg"
                alt="Email"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                Email
              </h3>
              <p className="mt-2 text-blue-800 dark:text-blue-200">
                pidaweb@go.com
              </p>
            </div>
            {/* Location */}
            <div className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6 text-center">
              <img
                src="./location.svg"
                alt="Location"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                Location
              </h3>
              <p className="mt-2 text-blue-800 dark:text-blue-200">
                Jatirejax, Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-blue-100 dark:bg-blue-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-300">
            Send Us a Message
          </h2>
          <div className="bg-white dark:bg-blue-700 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-blue-800 dark:text-blue-200 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-blue-800 dark:text-blue-200 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-blue-800 dark:text-blue-200 font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                />
              </div>
              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-blue-800 dark:text-blue-200 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
