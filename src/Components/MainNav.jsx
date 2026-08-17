import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
      Search,
      ShoppingCart,
      Flame,
      Truck,
      MapPin,
      Menu,
      X,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import newLogo from '../assets/newLogo.png';

const MainNav = () => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

      const [searchText, setSearchText] = useState("");
      const navigate = useNavigate();

      const { user, logOut } = use(AuthContext);

      const dashBordMail = user?.email === 'posakbari4u@gmail.com';

      // TanStack Query দিয়ে ইউজারের ইমেইল অনুযায়ী ডেটা ফেচ করা
      const { data: cart = [] } = useQuery({
            queryKey: ["cart", user?.email],
            queryFn: async () => {
                  const res = await axios.get(`https://posak-bari-backend.vercel.app/ceheckout?email=${user?.email}`);
                  return res.data;
            },
            enabled: !!user,
      });

      const activeOrdersCount = cart.filter(item => item.order === false).length;

      const handleLogOut = () => {
            logOut()
                  .then(() => { })
                  .catch(error => console.error(error));
      };

      const handleSearch = (e) => {
            e.preventDefault();
            if (searchText.trim()) {
                  navigate(`/product?search=${encodeURIComponent(searchText)}`);
                  setMobileSearchOpen(false);
            }
      };

      const menuItems = [
            { label: "HOME", url: "/" },
            { label: "SHOP", url: "/product" },
            { label: "PRODUCT", url: "/product" },
            { label: "MANUFACTURE", url: "/manufacturer" },
      ];

      return (
            <header className="w-full bg-white relative shadow-sm">
                  {/* Top Row */}
                  <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-4 py-3 lg:py-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-1 shrink-0">

                              <img
                                    src={newLogo}
                                    alt="Posak Bari"
                                    className="md:h-9 h-8 object-contain"
                              />
                        </Link>

                        {/* Search Bar - Desktop */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 items-center border border-gray-300 rounded overflow-hidden max-w-xl focus-within:border-purple-600">
                              <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Enter your keyword"
                                    className="w-full px-4 py-2.5 text-sm text-gray-600 placeholder-gray-400 outline-none min-w-0"
                              />
                              <button type="submit" className="px-4 py-2.5 text-gray-500 hover:text-amber-500 shrink-0 cursor-pointer">
                                    <Search className="w-4 h-4" />
                              </button>
                        </form>

                        {/* Right Actions: Auth, Cart & Hamburger */}
                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
                              {/* Mobile search toggle */}
                              <button
                                    className="md:hidden text-gray-800 cursor-pointer"
                                    onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                                    aria-label="Toggle search"
                              >
                                    <Search className="w-5 h-5" />
                              </button>

                              {/* Conditional Auth Buttons */}
                              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold">
                                    {user ? (
                                          <div className="flex items-center">
                                                {dashBordMail && (
                                                      <Link to="/dashboard/statistics">
                                                            <button className="px-3 mr-3 py-1.5 border border-purple-700 text-purple-700 rounded hover:bg-purple-50 transition-colors cursor-pointer">
                                                                  Dashboard
                                                            </button>
                                                      </Link>
                                                )}
                                                <Link to={'/myoder'}>
                                                      <button
                                                            className="px-3 mr-3 py-1.5 border border-yellow-600 text-yellow-600 rounded hover:bg-purple-50 transition-colors cursor-pointer"
                                                      >
                                                            My Order
                                                      </button>
                                                </Link>
                                                <button
                                                      onClick={handleLogOut}
                                                      className="px-3 py-1.5 border border-purple-700 text-purple-700 rounded hover:bg-purple-50 transition-colors cursor-pointer"
                                                >
                                                      Log Out
                                                </button>
                                          </div>
                                    ) : (
                                          <>
                                                <Link
                                                      to="/login"
                                                      className="px-3 py-1.5 border border-purple-700 text-purple-700 rounded hover:bg-purple-50 transition-colors"
                                                >
                                                      Login
                                                </Link>
                                                <Link
                                                      to="/register"
                                                      className="px-3 py-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                                                >
                                                      Register
                                                </Link>
                                          </>
                                    )}
                              </div>

                              {/* Cart */}
                              <Link to="/checkout" className="relative flex items-center gap-1">
                                    <ShoppingCart className="w-5 h-5 text-gray-800" />
                                    {user && activeOrdersCount > 0 && (
                                          <span className="absolute -top-2 -left-2 bg-purple-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                                {activeOrdersCount}
                                          </span>
                                    )}
                              </Link>

                              {/* Mobile hamburger */}
                              <button
                                    className="lg:hidden text-gray-900 cursor-pointer"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    aria-label="Toggle menu"
                              >
                                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                              </button>
                        </div>
                  </div>

                  {/* Mobile Search Bar */}
                  {mobileSearchOpen && (
                        <div className="md:hidden px-4 pb-3">
                              <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded overflow-hidden">
                                    <input
                                          type="text"
                                          value={searchText}
                                          onChange={(e) => setSearchText(e.target.value)}
                                          placeholder="Enter your keyword"
                                          className="w-full px-4 py-2.5 text-sm text-gray-600 placeholder-gray-400 outline-none min-w-0"
                                    />
                                    <button type="submit" className="px-4 py-2.5 text-gray-500 hover:text-amber-500 shrink-0 cursor-pointer">
                                          <Search className="w-4 h-4" />
                                    </button>
                              </form>
                        </div>
                  )}

                  {/* Bottom Nav - Desktop */}
                  <div className="border-t border-gray-200">
                        <div className="max-w-7xl mx-auto hidden lg:flex items-center justify-between px-4">
                              <nav className="flex items-center">
                                    {menuItems.map((item) => (
                                          <Link
                                                key={item.label}
                                                to={item.url}
                                                className="flex items-center gap-1 px-3 xl:px-4 py-4 text-sm font-bold text-gray-900 hover:text-purple-700 transition-colors"
                                          >
                                                {item.label}
                                          </Link>
                                    ))}
                              </nav>

                              <div className="hidden xl:flex items-center gap-6">
                                    <Link to="/shop" className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-[#3E0259]">
                                          <Flame className="w-4 h-4 text-[#3E0259]" />
                                          Hot Deals
                                    </Link>
                                    <Link to="/pages" className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-[#3E0259]">
                                          <MapPin className="w-4 h-4 text-[#3E0259]" />
                                          Store Locator
                                    </Link>
                              </div>
                        </div>
                  </div>

                  {/* Mobile Menu (collapsible) */}
                  {mobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 bg-white">
                              <nav className="flex flex-col">
                                    {menuItems.map((item) => (
                                          <div key={item.label} className="border-b border-gray-100">
                                                <Link
                                                      to={item.url}
                                                      onClick={() => setMobileMenuOpen(false)}
                                                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-900 hover:bg-purple-50"
                                                >
                                                      {item.label}
                                                </Link>
                                          </div>
                                    ))}
                              </nav>

                              <div className="flex flex-col gap-2 px-4 py-3 border-t border-gray-100">
                                    {user ? (
                                          <>
                                                {dashBordMail && (
                                                      <Link
                                                            to="/dashboard"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="w-full text-center py-2 border border-purple-700 text-purple-700 rounded text-sm font-semibold"
                                                      >
                                                            Dashboard
                                                      </Link>
                                                )}
                                                <button
                                                      onClick={() => {
                                                            handleLogOut();
                                                            setMobileMenuOpen(false);
                                                      }}
                                                      className="w-full text-center py-2 border border-purple-700 text-purple-700 rounded text-sm font-semibold cursor-pointer"
                                                >
                                                      Log Out
                                                </button>
                                          </>
                                    ) : (
                                          <div className="flex gap-2">
                                                <Link
                                                      to="/login"
                                                      onClick={() => setMobileMenuOpen(false)}
                                                      className="flex-1 text-center py-2 border border-purple-700 text-purple-700 rounded text-sm font-semibold"
                                                >
                                                      Login
                                                </Link>
                                                <Link
                                                      to="/register"
                                                      onClick={() => setMobileMenuOpen(false)}
                                                      className="flex-1 text-center py-2 bg-amber-500 text-white rounded text-sm font-semibold"
                                                >
                                                      Register
                                                </Link>
                                          </div>
                                    )}
                              </div>

                              <div className="flex flex-col gap-3 px-4 py-3 border-t border-gray-100">
                                    <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                                          <Flame className="w-4 h-4 text-amber-500" />
                                          Hot Deals
                                    </Link>
                                    <Link to="/pages" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                                          <Truck className="w-4 h-4 text-purple-700" />
                                          Track Your Order
                                    </Link>
                                    <Link to="/pages" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                                          <MapPin className="w-4 h-4 text-[#3E0259]" />
                                          Store Locator
                                    </Link>
                              </div>
                        </div>
                  )}
            </header>
      );
};

export default MainNav;