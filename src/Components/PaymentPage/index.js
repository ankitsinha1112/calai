import { useState } from "react";
import { Navbar } from "../Navbar";
import "./payment.css";

export default function PaymentPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const makePayment = async () => {
    setIsLoading(true);
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      setIsLoading(false); 
      return;
    }

    // Make API call to the backend
    const data = await fetch("https://calai-bk.onrender.com/create-order", { method: "POST" }).then((response) =>
      response.json()
    );
    console.log(data);
    var options = {
      key: "rzp_test_2n6ppe8SunQpbi",
      name: "Ankit Sinha Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://source.unsplash.com/1600x900/?payment",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Ankit Sinha",
        email: "ankitsinha111200@gmail.com",
        contact: "1234567890",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setIsLoading(false);
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div>
      <Navbar userName={props?.userName} />
      <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
        <Hero onClick={makePayment} isLoading={isLoading} />
      </main>
    </div>
  );
}

const Hero = ({ onClick, isLoading }) => {
  return (
    <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
      <div className="md:w-1/3 mb-20 md:mb-0 mx-10" style={{marginTop:"10rem"}}>
        <h1 className=" text-white font-bold text-5xl mb-10">
          Support{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            our cause
          </span>{" "}
          by making a donation and help us make a difference in the world!
        </h1>
        <p className="text-sm text-gray-300 font-light tracking-wide w-[300px] mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4">
        <button
            onClick={onClick}
            className={`bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-4 shadow-xl drop-shadow-2xl text-gray-300 font-bold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoadingIcon /> : "Donate Now!"}
          </button>
        </div>
      </div>
      <img
        className="w-full md:w-[36rem] h-full"
        alt="test payment"
        src="https://source.unsplash.com/1600x900/?payment"
      />
    </div>
  );
};

const LoadingIcon = () => {
  return (
    <div className="flex items-center justify-center">
    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0117.373 6H20c0 6.627-5.373 12-12 12v-3.627z"
      ></path>
    </svg>
  </div>
  );
};