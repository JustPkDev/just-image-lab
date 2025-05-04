import React, { useEffect } from "react";
import { Link } from "react-router";

// images
import pencil from "../assets/pencil.png";
import converter from '../assets/converter.png';
import layout from '../assets/layout.png';
import free from '../assets/free.png';
import upload from '../assets/upload.png';

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Just Image Lab - Home";
  }, [])

  return (
    <>
      <Header />
      {/* main */}
      <div className="w-full h-[750px] flex justify-center items-center bg-linear-[15deg] from-[#bb5ee600] to-[#ae00ff4d]">
        <div className="w-[1480px] h-full flex justify-center items-center flex-col ">
          <h1 className="text-white font-mono text-[35px] text-center w-[70%] max-lg:text-[28px] max-sm:text-[20px] max-sm:w-[100%] max-sm:px-3 ">
            The Ultimate Visual Toolbox
            for <span className="text-gradient">Image</span> Editing, Format Conversion,
            Quality Enhancement, and Seamless Creative Transformation.
          </h1>
          <Link to='/editor' className="text-white rounded-full cursor-pointer 
                            text-[12px] px-9 py-[9px] bg-linear-65 from-[#7e36a0] to-[#d101fa]
                            mt-14 ">
            UPLOAD NOW
          </Link>
        </div>
      </div>
      {/* features */}
      <div className="w-full h-auto flex justify-center items-center mb-25" id="features">
        <div className="w-[1480px] h-full flex justify-center items-center flex-col ">
          <h1 className="text-white font-mono text-[28px] mt-10 mb-13 ">Features</h1>
          <div className="w-full h-auto flex justify-center items-start max-sm:px-3 max-lg:gap-10 gap-25 flex-wrap ">
            <div className="w-[20%] max-lg:w-[40%] max-sm:w-[100%] h-[250px] flex justify-center p-5 rounded-md items-center flex-col bg-[#0c0e26] ">
              <img src={pencil} alt="edit" className="w-[50px] h-[50px] " />
              <p className="text-center mt-10 text-white ">Effortlessly crop, resize, rotate, and adjust your images with our intuitive editor.</p>
            </div>
            <div className="w-[20%] max-lg:w-[40%] max-sm:w-[100%] h-[250px] flex justify-center p-5 rounded-md items-center flex-col bg-[#0c0e26] ">
              <img src={converter} alt="converter" className="w-[50px] h-[50px] " />
              <p className="text-center mt-10 text-white ">Convert images between formats like JPG, PNG, WebP, and more in just a click.</p>
            </div>
            <div className="w-[20%] max-lg:w-[40%] max-sm:w-[100%] h-[250px] flex justify-center p-5 rounded-md items-center flex-col bg-[#0c0e26] ">
              <img src={upload} alt="more" className="w-[50px] h-[50px] " />
              <p className="text-center mt-10 text-white ">Upload and edit multiple images at once and save time</p>
            </div>
            <div className="w-[20%] max-lg:w-[40%] max-sm:w-[100%] h-[250px] flex justify-center p-5 rounded-md items-center flex-col bg-[#0c0e26] ">
              <img src={free} alt="more" className="w-[50px] h-[50px] " />
              <p className="text-center mt-10 text-white ">All features, no cost and forever free.</p>
            </div>
            <div className="w-[20%] max-lg:w-[40%] max-sm:w-[100%] h-[250px] flex justify-center p-5 rounded-md items-center flex-col bg-[#0c0e26] ">
              <img src={layout} alt="more" className="w-[50px] h-[50px] " />
              <p className="text-center mt-10 text-white ">Unlock a complete toolkit for all your image needs</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
