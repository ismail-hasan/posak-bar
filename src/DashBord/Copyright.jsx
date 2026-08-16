import React from "react";

const Copyright = () => {
      return (
            <footer className="w-full border-t border-gray-200 bg-[#f8f8f8] px-4 py-4">
                  <p className="text-center text-sm font-medium text-gray-600 sm:text-base">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-bold text-[#9c00ed]">
                              পোশাক বাড়ি
                        </span>
                        . সর্বস্বত্ব সংরক্ষিত।
                  </p>
            </footer>
      );
};

export default Copyright;