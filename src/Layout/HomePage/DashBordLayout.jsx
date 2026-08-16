import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
      RxDashboard,
      RxLayers,
      RxFileText,
      RxExit,
      RxChevronDown,
      RxHamburgerMenu,
      RxCross2,
} from "react-icons/rx";
import { FaPlusSquare, FaBolt, FaIndustry, FaChartLine } from "react-icons/fa";
import { MdCampaign, MdLocalOffer, MdCategory } from "react-icons/md";

const DashBordLayout = () => {
      const navigate = useNavigate();
      const [sidebarOpen, setSidebarOpen] = useState(false);

      // ================= NAV LINK STYLE =================
      const navLinkStyle = ({ isActive }) => {
            return `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`;
      };

      // ================= SIDEBAR =================
      const Sidebar = () => {
            return (
                  <aside
                        className="
                              w-64
                              h-screen
                              shrink-0
                              bg-slate-900
                              text-gray-300
                              flex
                              flex-col
                              justify-between
                              border-r
                              border-slate-800
                        "
                  >
                        <div>
                              {/* ================= LOGO ================= */}
                              <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">

                                    <h1 className="text-xl font-black text-purple-500 tracking-wider">
                                          POSAK{" "}
                                          <span className="text-white">
                                                BARI
                                          </span>
                                    </h1>

                                    {/* Mobile Close Button */}
                                    <button
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className="
                                                md:hidden
                                                text-gray-400
                                                hover:text-white
                                                text-2xl
                                          "
                                    >
                                          <RxCross2 />
                                    </button>
                              </div>

                              {/* ================= MENU ================= */}
                              <nav className="p-4 space-y-1">
                                    <NavLink
                                          to="/dashboard/statistics"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <FaChartLine className="text-x shrink-0" />

                                          <span>
                                                Statistics
                                          </span>
                                    </NavLink>
                                    <NavLink
                                          to="/dashboard"
                                          end
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <RxDashboard className="text-xl shrink-0" />

                                          <span>
                                                All Product
                                          </span>
                                    </NavLink>

                                    <NavLink
                                          to="/dashboard/orders"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <RxLayers className="text-xl shrink-0" />

                                          <span>
                                                Orders
                                          </span>
                                    </NavLink>

                                    <NavLink
                                          to="/dashboard/addproduct"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <FaPlusSquare className="text-xl shrink-0" />

                                          <span>
                                                Add Products
                                          </span>
                                    </NavLink>
                                    <NavLink
                                          to="/dashboard/adcampaign"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <FaBolt className="text-xl shrink-0" />

                                          <span>
                                                Ad Campaign
                                          </span>
                                    </NavLink>

                                    <NavLink
                                          to="/dashboard/superdeal"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <MdCampaign className="text-xl shrink-0" />

                                          <span>
                                                Super Deal
                                          </span>
                                    </NavLink>
                                    <NavLink
                                          to="/dashboard/alldeals"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <MdLocalOffer className="text-xl shrink-0" />

                                          <span>
                                                Control Deal
                                          </span>
                                    </NavLink>
                                    <NavLink
                                          to="/dashboard/manufactureorder"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <FaIndustry className="text-x shrink-0" />

                                          <span>
                                                Manufacturing Orders
                                          </span>
                                    </NavLink>
                                    <NavLink
                                          to="/dashboard/banner"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <FaIndustry className="text-x shrink-0" />

                                          <span>
                                                Banner
                                          </span>
                                    </NavLink>
                                    <NavLink
                                          to="/dashboard/category"
                                          onClick={() =>
                                                setSidebarOpen(false)
                                          }
                                          className={navLinkStyle}
                                    >
                                          <MdCategory className="text-x shrink-0" />

                                          <span>
                                                Add Category
                                          </span>
                                    </NavLink>


                              </nav>
                        </div>


                  </aside>
            );
      };

      return (
            <div className="min-h-screen bg-gray-50">

                  {/* =====================================================
                        MOBILE SIDEBAR OVERLAY
                  ====================================================== */}
                  {sidebarOpen && (
                        <div
                              onClick={() => setSidebarOpen(false)}
                              className="
                                    fixed
                                    inset-0
                                    bg-black/50
                                    z-40
                                    md:hidden
                              "
                        />
                  )}

                  {/* =====================================================
                        MOBILE SIDEBAR
                  ====================================================== */}
                  <div
                        className={`
                              fixed
                              top-0
                              left-0
                              z-50
                              h-screen
                              w-64
                              transform
                              transition-transform
                              duration-300
                              ease-in-out
                              md:hidden
                              ${sidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                              }
                        `}
                  >
                        <Sidebar />
                  </div>

                  {/* =====================================================
                        DESKTOP SIDEBAR
                  ====================================================== */}
                  <div className="hidden md:block fixed left-0 top-0 z-30">
                        <Sidebar />
                  </div>

                  {/* =====================================================
                        MAIN AREA
                  ====================================================== */}
                  <div className="md:ml-64 min-h-screen flex flex-col">

                        {/* =================================================
                              TOP HEADER
                        ================================================== */}
                        <header
                              className="
                                    h-20
                                    shrink-0
                                    bg-white
                                    border-b
                                    border-gray-200
                                    px-4
                                    sm:px-6
                                    flex
                                    items-center
                                    justify-between
                                    sticky
                                    top-0
                                    z-30
                                    shadow-sm
                              "
                        >

                              {/* LEFT HEADER */}
                              <div className="flex items-center gap-3 min-w-0">

                                    {/* Mobile Hamburger */}
                                    <button
                                          onClick={() =>
                                                setSidebarOpen(true)
                                          }
                                          className="
                                                md:hidden
                                                w-10
                                                h-10
                                                flex
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-slate-900
                                                text-white
                                                text-xl
                                                hover:bg-slate-800
                                                transition
                                                shrink-0
                                          "
                                    >
                                          <RxHamburgerMenu />
                                    </button>

                                    {/* Welcome */}
                                    <h2
                                          className="
                                                text-base
                                                sm:text-xl
                                                font-bold
                                                text-slate-800
                                                truncate
                                          "
                                    >
                                          Welcome, Admin 👋
                                    </h2>

                              </div>

                              {/* =================================================
                                    RIGHT HEADER
                              ================================================== */}
                              <div className="">
                                    {/* =================================================
                                          BACK HOME BUTTON
                                    ================================================== */}
                                    <button
                                          onClick={() => navigate("/store")}
                                          className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-3
                                                sm:px-4
                                                py-2
                                                bg-purple-900
                                                hover:bg-purple-800
                                                text-white
                                                rounded-lg
                                                text-sm
                                                font-medium
                                                shadow-sm
                                                transition
                                                whitespace-nowrap
                                          "
                                    >
                                          <RxExit className="text-base" />

                                          <span className="hidden sm:inline">
                                                Back To Home
                                          </span>

                                          <span className="sm:hidden">
                                                Home
                                          </span>
                                    </button>

                              </div>
                        </header>

                        {/* =================================================
                              MAIN CONTENT
                        ================================================== */}
                        <main
                              className="
                                    flex-1
                                    p-3
                                    sm:p-4
                                    md:p-6
                                    min-w-0
                                    overflow-x-hidden
                              "
                        >
                              <Outlet />
                        </main>

                  </div>
            </div>
      );
};

export default DashBordLayout;