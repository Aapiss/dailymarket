import React from "react";

const SupportPayment = () => {
  return (
    <div>
      <section id="support-payment" className="my-20">
        <h2 className="text-center text-4xl font-bold text-black dark:text-white">
          Support Payment
        </h2>
        <div className="flex justify-center flex-wrap px-56 gap-5 bg-white mt-8 max-lg:px-2">
          <LogoSupportPayment
            logo={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9GhNwf2lw9sqrY94_kejAofwpBgKrX5krew&s"
            }
          />
          <LogoSupportPayment
            logo={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTICzxhKU2Q1RVIgU-ZbtQPmvRmG0oclKCXkQ&s"
            }
          />
          <LogoSupportPayment
            logo={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eXStWVAQ9Qtplrp11xZfmj7DQS4KlRQpFA&s"
            }
          />
          <LogoSupportPayment
            logo={
              "https://dretail.id/asset/img/image/features/payment/qris.png"
            }
          />
        </div>
      </section>
    </div>
  );
};

const LogoSupportPayment = ({ logo }) => {
  return (
    <div className="logoSupportPayment">
      <img
        src={logo}
        alt="Logo"
        className="size-24 object-contain mix-blend-multiply"
      />
    </div>
  );
};
export default SupportPayment;
