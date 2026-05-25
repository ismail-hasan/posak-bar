import React from 'react';

import {
      ChevronLeft,
      ChevronRight,
      Phone,
      MessageCircle,
} from "lucide-react";

import {
      FaFacebookF,
      FaInstagram,
      FaYoutube,
      FaFacebookMessenger,
      FaWhatsapp,
} from "react-icons/fa";


const Footer = () => {
      return (
            <div>
                  <footer className="bg-[#001b82] py-8">

                        <div className="flex items-center justify-center gap-2 flex-wrap">

                              {/* FACEBOOK */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-blue-600 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaFacebookF className="text-white text-xl" />
                              </a>

                              {/* MESSENGER */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-cyan-500 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaFacebookMessenger className="text-white text-xl" />
                              </a>
                              {/* WHATSAPP */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-green-500 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaWhatsapp className="text-white text-xl" />
                              </a>

                              {/* INSTAGRAM */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-pink-500 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaInstagram className="text-white text-xl" />
                              </a>



                              {/* YOUTUBE */}
                              <a
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-red-600 hover:scale-110 duration-300 flex items-center justify-center shadow-xl"
                              >
                                    <FaYoutube className="text-white text-xl" />
                              </a>

                        </div>

                  </footer>
            </div>
      );
};

export default Footer;