import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/home/Hero";
import ListProduct from "../components/home/ListProduct";
import WhyChoose from "../components/home/WhyChoose";
import SupportPayment from "../components/home/SupportPayments";
import CTA from "../components/home/CTA";
import Footer from "../components/tailus/Footer";
import FloatBtn from "../components/FloatBtn";

const Home = () => {
  return (
    <>
      <Header />
      <div className="m-5 overflow-x-hidden">
        <Hero />
        <ListProduct />
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
