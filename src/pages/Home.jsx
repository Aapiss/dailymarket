import React from "react";
import Hero from "../components/home/Hero";
import ProductList from "../components/home/ProductList";
import WhyChoose from "../components/home/WhyChoose";
import SupportPayment from "../components/home/SupportPayments";
import CTA from "../components/home/CTA";
import Footer from "../components/tailus/Footer";
import FloatBtn from "../components/FloatBtn";
import { Helmet } from "react-helmet-async";
import Header from "../components/tailus/Header";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>My Toko Online</title>
        <meta name="description" content="My Toko Online" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div className="m-5 overflow-x-hidden">
        <Hero />
        <ProductList />
        <WhyChoose />
        <SupportPayment />
        <CTA />
        <FloatBtn />
      </div>
      <Footer />
    </>
  );
};

export default Home;
