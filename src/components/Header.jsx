import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [open, setOpen] = useState(false);
  onscroll = () => {
    const header = document.querySelector("#header");
    if (window.scrollY > 0) {
      header.classList.add("bg-main");
      header.classList.add("top-0");
      header.classList.add("shadow-lg");
      header.classList.remove("top-2");
    } else {
      header.classList.remove("bg-main");
      header.classList.remove("top-0");
      header.classList.remove("shadow-lg");
      header.classList.add("top-2");
    }
  }
  return (
    <>
      {/* header */}
      <div className="w-full z-50 h-[75px] fixed top-2 flex justify-center items-center shadow-[#0b0d2b] transition-all duration-300 ease-in-out" id="header">
        <div className="w-[1480px] px-3 h-full flex justify-between items-center ">
          <div className="w-[30%] max-[450px]:w-[50%] h-full flex justify-start items-center">
            <Link to="/" className="flex justify-center items-center">
              <img
                src="/favicon.png"
                alt="logo"
                className="w-[35px] h-[35px] "
                draggable="false"
              />
              <h1 className="text-white font-mono ms-2 text-[17px] ">
                Just Image Lab
              </h1>
            </Link>
          </div>
          <div className="w-full max-[960px]:hidden h-full flex justify-center items-center">
            <ul className="flex justify-center items-center gap-10">
              <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
                <Link
                  to="https://justpkdev.vercel.app/?about=1"
                  target="_blank"
                >
                  About Me
                </Link>
              </li>
              <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
                <HashLink to="/#features">Features</HashLink>
              </li>
              <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
                <Link
                  to="https://justpkdev.vercel.app/projects"
                  target="_blank"
                >
                  My Projects
                </Link>
              </li>
              <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
                <Link to="https://justpkdev.vercel.app/blogs" target="_blank">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[30%] h-full flex justify-end items-center">
            <Link
              to="https://justpkdev.vercel.app/?msg=1"
              target="_blank"
              className="text-white max-[960px]:hidden rounded-full text-[12px] px-6 py-[8px] bg-linear-65 from-[#bc5ee6] to-[#d101fa] "
            >
              Contact ME
            </Link>
            <button className="min-[960px]:hidden cursor-pointer" onClick={() => setOpen(!open)}>
              <HiMenuAlt3 size={35} color="white" />
            </button>
          </div>
        </div>
      </div>
      {/* sidebar */}
      <div className="w-[300px] z-50 h-full fixed top-0 right-[-500px] bg-[#0c0e26] rounded-l-lg flex justify-center items-start shadow-lg shadow-[#0b0d2b] transition-all duration-300 ease-in-out"
        style={{ right: open ? "0px" : "-500px" }}>
        <button className="absolute top-2 left-2 cursor-pointer" onClick={() => setOpen(false)}>
          <IoClose size={30} color="white" />
        </button>
        <div className="w-full h-auto flex justify-center items-center flex-col mt-36">
          <ul className="flex flex-col justify-center items-center gap-5 mt-10">
            <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
              <Link
                to="https://justpkdev.vercel.app/?about=1"
                target="_blank"
              >
                About Me
              </Link>
            </li>
            <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
              <HashLink to="/#features">Features</HashLink>
            </li>
            <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
              <Link
                to="https://justpkdev.vercel.app/projects"
                target="_blank"
              >
                My Projects
              </Link>
            </li>
            <li className="text-white text-[14px] font-mono hover:text-[#d101fa] cursor-pointer">
              <Link to="https://justpkdev.vercel.app/blogs" target="_blank">
                Blogs
              </Link>
            </li>
          </ul>
          <Link
            to="https://justpkdev.vercel.app/?msg=1"
            target="_blank"
            className="text-white rounded-full text-[12px] px-6 py-[8px] mt-10 bg-linear-65 from-[#bc5ee6] to-[#d101fa] ">
            Contact Me
          </Link>
        </div>
      </div >
    </>
  );
};

export default Header;
