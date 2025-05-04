import React from "react";
import { TbError404 } from "react-icons/tb";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Error = () => {
  return (
    <>
      <Header />
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <TbError404 size={300} color="white" />
        <p className="text-white mt-[-30px] ">Page Not Found</p>
      </div>
      <Footer />
    </>
  );
};

export default Error;
