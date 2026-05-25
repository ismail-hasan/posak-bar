import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";


const Navbar = () => {
  return (

    <div className="bg-[#001eff] py-4 px-3 fixed top-0 left-0 w-full z-50">

      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">

        {/* LOGO */}
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[110px] md:w-[200px] object-contain"
          />
        </Link>

        {/* EMAIL */}
        <p className="text-white text-[14px] md:text-[15px] font-semibold text-right break-all">
          posakbari4u@gmail.com
        </p>

      </div>

    </div>
  );
};

export default Navbar;