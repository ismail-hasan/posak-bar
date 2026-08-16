import {
      FaFacebookF,
      FaYoutube,
      FaInstagram,
      FaPhoneAlt,
      FaEnvelope,
      FaMapMarkerAlt,
} from "react-icons/fa";
import weAccept from "../assets/weAccept.png";
import logo from "../assets/newLogo2.png";

const NewFooter = () => {
      return (
            <div className="bg-[#222222] text-gray-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

                              {/* Quick Link */}
                              <div>
                                    <h3 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-5">
                                          গুরুত্বপূর্ণ লিংক
                                    </h3>

                                    <ul className="space-y-2 text-xs sm:text-sm">
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      User Profile
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      Job/Career with us
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      About Us
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      Contact Us
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      Track Your Order
                                                </a>
                                          </li>
                                    </ul>

                                    <img
                                          src={logo}
                                          alt="Google Play"
                                          className="mt-5 sm:mt-6 w-28 sm:w-40 cursor-pointer"
                                    />
                              </div>

                              {/* Policy */}
                              <div>
                                    <h3 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-5">
                                          আমাদের নীতিমালা
                                    </h3>

                                    <ul className="space-y-2 text-xs sm:text-sm">
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      Terms & Condition
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      Privacy Policy
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      Refund & Return policy
                                                </a>
                                          </li>
                                          <li>
                                                <a href="#" className="hover:text-white duration-200">
                                                      F.A.Q
                                                </a>
                                          </li>
                                    </ul>
                              </div>

                              {/* Contact */}
                              <div>
                                    <h3 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-5">
                                          যোগাযোগ করুন
                                    </h3>

                                    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                                          <div className="flex items-start gap-2 sm:gap-3">
                                                <FaPhoneAlt className="mt-1 text-gray-400 flex-shrink-0" />
                                                <span>+8801305506395</span>
                                          </div>

                                          <div className="flex items-start gap-2 sm:gap-3">
                                                <FaEnvelope className="mt-1 text-gray-400 flex-shrink-0" />
                                                <span className="break-all">posakbari4u@gmail.com</span>
                                          </div>

                                          <div className="flex items-start gap-2 sm:gap-3">
                                                <FaMapMarkerAlt className="mt-1 text-gray-400 flex-shrink-0" />
                                                <span>
                                                      অফিস:  মির্জাপুর, ঘোড়াধাপ, সদর, জামালপুর।
                                                      <br />
                                                      ফ্যাক্টরী: স্কয়ার মাস্টার বাড়ি, ভালুকা, ময়মনসিংহ।
                                                </span>
                                          </div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                                          <a
                                                href="https://www.facebook.com/Posakbari4u"
                                                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#3b5998] rounded flex items-center justify-center hover:scale-110 duration-300"
                                          >
                                                <FaFacebookF className="text-white text-xs sm:text-sm" />
                                          </a>

                                          <a
                                                href="https://www.youtube.com/watch?v=BxFPRJM2858"
                                                className="w-8 h-8 sm:w-9 sm:h-9 bg-red-600 rounded flex items-center justify-center hover:scale-110 duration-300"
                                          >
                                                <FaYoutube className="text-white text-xs sm:text-sm" />
                                          </a>

                                          <a
                                                href="#"
                                                className="w-8 h-8 sm:w-9 sm:h-9 rounded flex items-center justify-center hover:scale-110 duration-300 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"
                                          >
                                                <FaInstagram className="text-white text-xs sm:text-sm" />
                                          </a>
                                    </div>
                              </div>

                              {/* Payment */}
                              <div>
                                    <h3 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-5">
                                          আমরা যা গ্রহণ করি
                                    </h3>

                                    <img
                                          src={weAccept}
                                          alt="Payment Methods"
                                          className="w-full max-w-[180px] sm:max-w-[220px]"
                                    />
                              </div>

                        </div>
                  </div>
            </div>
      );
};

export default NewFooter;