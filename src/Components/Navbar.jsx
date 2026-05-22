import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Left - Logo */}
          <div className="text-xl font-bold text-blue-600">
            MyLogo
          </div>

          {/* Right - Email */}
          <div className="text-sm sm:text-base text-gray-700">
            <a
              href="mailto:example@gmail.com"
              className="hover:text-blue-600 transition"
            >
              example@gmail.com
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;