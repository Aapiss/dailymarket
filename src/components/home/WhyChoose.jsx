import React from "react";
import CardChoose from "../daisy/CardChoose";

const WhyChooseUs = () => {
  return (
    <div className="py-12">
      <h2 className="text-5xl font-bold text-center mb-10 text-black dark:text-white">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <CardChoose
          title="High Quality"
          description="We ensure top-notch quality in every product we deliver."
          image="/img-hero.svg"
          bgColor="bg-blue-500"
        />
        <CardChoose
          title="Affordable Prices"
          description="Get the best value for your money with our competitive pricing."
          image="/img-hero.svg"
          bgColor="bg-green-500"
        />
        <CardChoose
          title="Fast Delivery"
          description="Experience swift and reliable delivery services."
          image="/img-hero.svg"
          bgColor="bg-yellow-500"
        />
        <CardChoose
          title="Customer Support"
          description="Our team is always ready to assist you 24/7."
          image="/img-hero.svg"
          bgColor="bg-red-500"
        />
        <CardChoose
          title="Sustainability"
          description="We care about the environment and practice sustainability."
          image="/img-hero.svg"
          bgColor="bg-purple-500"
        />
        <CardChoose
          title="Trusted Brand"
          description="We are a trusted name with years of excellence."
          image="/img-hero.svg"
          bgColor="bg-indigo-500"
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
