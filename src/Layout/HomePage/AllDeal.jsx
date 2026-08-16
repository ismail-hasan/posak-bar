import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllDeal = () => {
      const [deals, setDeals] = useState([]);
      const [campaigns, setCampaigns] = useState([]);
      const [categories, setCategories] = useState([]);
      const [banners, setBanners] = useState([]);
      const [loading, setLoading] = useState(true);

      // ================= FETCH DATA =================
      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const [
                              dealRes,
                              campaignRes,
                              categoryRes,
                              bannerRes
                        ] = await Promise.all([
                              fetch(
                                    "https://posak-bari-backend.vercel.app/superdeal"
                              ),
                              fetch(
                                    "https://posak-bari-backend.vercel.app/addcam"
                              ),
                              fetch(
                                    "https://posak-bari-backend.vercel.app/category"
                              ),
                              fetch(
                                    "https://posak-bari-backend.vercel.app/banner"
                              ),
                        ]);

                        if (
                              !dealRes.ok ||
                              !campaignRes.ok ||
                              !categoryRes.ok ||
                              !bannerRes.ok
                        ) {
                              throw new Error("Failed to fetch data");
                        }

                        const dealData = await dealRes.json();
                        const campaignData = await campaignRes.json();
                        const categoryData = await categoryRes.json();
                        const bannerData = await bannerRes.json();

                        // Super Deal
                        setDeals(
                              Array.isArray(dealData)
                                    ? dealData
                                    : []
                        );

                        // Campaign
                        if (Array.isArray(campaignData)) {
                              setCampaigns(campaignData);
                        } else if (
                              campaignData &&
                              typeof campaignData === "object"
                        ) {
                              setCampaigns([campaignData]);
                        } else {
                              setCampaigns([]);
                        }

                        // Category
                        setCategories(
                              Array.isArray(categoryData)
                                    ? categoryData
                                    : []
                        );

                        // Banner
                        setBanners(
                              Array.isArray(bannerData)
                                    ? bannerData
                                    : []
                        );

                  } catch (error) {
                        console.error("Fetch error:", error);

                        Swal.fire({
                              icon: "error",
                              title: "Error!",
                              text: "Data load করা যায়নি।",
                              confirmButtonColor: "#2563eb",
                        });
                  } finally {
                        setLoading(false);
                  }
            };

            fetchData();
      }, []);

      // ================= DELETE DEAL =================
      const handleDeleteDeal = async (id) => {
            const result = await Swal.fire({
                  icon: "warning",
                  title: "Delete Deal?",
                  text: "এই deal টি delete হয়ে যাবে!",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#6b7280",
                  confirmButtonText: "Yes, Delete",
                  cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            try {
                  const response = await fetch(
                        `https://posak-bari-backend.vercel.app/superdeal/${id}`,
                        {
                              method: "DELETE",
                        }
                  );

                  if (!response.ok) {
                        throw new Error("Delete failed");
                  }

                  setDeals((prev) =>
                        prev.filter(
                              (item) => item._id !== id
                        )
                  );

                  Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Deal successfully deleted.",
                        timer: 1500,
                        showConfirmButton: false,
                  });

            } catch (error) {
                  console.error(error);

                  Swal.fire({
                        icon: "error",
                        title: "Delete Failed!",
                        text: "Deal delete করা যায়নি।",
                        confirmButtonColor: "#dc2626",
                  });
            }
      };

      // ================= DELETE CAMPAIGN =================
      const handleDeleteCampaign = async (id) => {
            const result = await Swal.fire({
                  icon: "warning",
                  title: "Delete Campaign?",
                  text: "এই campaign টি delete হয়ে যাবে!",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#6b7280",
                  confirmButtonText: "Yes, Delete",
                  cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            try {
                  const response = await fetch(
                        `https://posak-bari-backend.vercel.app/addcam/${id}`,
                        {
                              method: "DELETE",
                        }
                  );

                  if (!response.ok) {
                        throw new Error("Delete failed");
                  }

                  setCampaigns((prev) =>
                        prev.filter(
                              (item) => item._id !== id
                        )
                  );

                  Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Campaign successfully deleted.",
                        timer: 1500,
                        showConfirmButton: false,
                  });

            } catch (error) {
                  console.error(error);

                  Swal.fire({
                        icon: "error",
                        title: "Delete Failed!",
                        text: "Campaign delete করা যায়নি।",
                        confirmButtonColor: "#dc2626",
                  });
            }
      };

      // ================= DELETE CATEGORY =================
      const handleDeleteCategory = async (id) => {
            const result = await Swal.fire({
                  icon: "warning",
                  title: "Delete Category?",
                  text: "এই category টি delete হয়ে যাবে!",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#6b7280",
                  confirmButtonText: "Yes, Delete",
                  cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            try {
                  const response = await fetch(
                        `https://posak-bari-backend.vercel.app/category/${id}`,
                        {
                              method: "DELETE",
                        }
                  );

                  if (!response.ok) {
                        throw new Error("Delete failed");
                  }

                  setCategories((prev) =>
                        prev.filter(
                              (item) => item._id !== id
                        )
                  );

                  Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Category successfully deleted.",
                        timer: 1500,
                        showConfirmButton: false,
                  });

            } catch (error) {
                  console.error(error);

                  Swal.fire({
                        icon: "error",
                        title: "Delete Failed!",
                        text: "Category delete করা যায়নি।",
                        confirmButtonColor: "#dc2626",
                  });
            }
      };

      // ================= DELETE BANNER =================
      const handleDeleteBanner = async (id) => {
            const result = await Swal.fire({
                  icon: "warning",
                  title: "Delete Banner?",
                  text: "এই banner টি delete হয়ে যাবে!",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#6b7280",
                  confirmButtonText: "Yes, Delete",
                  cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            try {
                  const response = await fetch(
                        `https://posak-bari-backend.vercel.app/banner/${id}`,
                        {
                              method: "DELETE",
                        }
                  );

                  if (!response.ok) {
                        throw new Error("Delete failed");
                  }

                  setBanners((prev) =>
                        prev.filter(
                              (item) => item._id !== id
                        )
                  );

                  Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Banner successfully deleted.",
                        timer: 1500,
                        showConfirmButton: false,
                  });

            } catch (error) {
                  console.error(error);

                  Swal.fire({
                        icon: "error",
                        title: "Delete Failed!",
                        text: "Banner delete করা যায়নি।",
                        confirmButtonColor: "#dc2626",
                  });
            }
      };

      // ================= LOADING =================
      if (loading) {
            return (
                  <div className="py-16 text-center text-gray-500">
                        Loading...
                  </div>
            );
      }

      return (
            <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

                  <div className="mx-auto max-w-5xl">

                        {/* =====================================================
                            SUPER DEAL
                        ====================================================== */}

                        <div className="mb-10">

                              <div className="mb-5">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                          All Super Deals
                                    </h2>
                              </div>

                              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                    <div className="overflow-x-auto">

                                          <table className="w-full min-w-[600px]">

                                                <thead className="bg-gray-50">
                                                      <tr>
                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Image
                                                            </th>

                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Title
                                                            </th>

                                                            <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                                                                  Action
                                                            </th>
                                                      </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-100">

                                                      {deals.length > 0 ? (
                                                            deals.map((deal) => (
                                                                  <tr
                                                                        key={deal._id}
                                                                        className="hover:bg-gray-50"
                                                                  >
                                                                        <td className="px-5 py-4">
                                                                              <img
                                                                                    src={deal.image}
                                                                                    alt={deal.title}
                                                                                    className="h-16 w-24 rounded-lg object-cover"
                                                                              />
                                                                        </td>

                                                                        <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                                                                              {deal.title}
                                                                        </td>

                                                                        <td className="px-5 py-4 text-right">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          handleDeleteDeal(
                                                                                                deal._id
                                                                                          )
                                                                                    }
                                                                                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                                                              >
                                                                                    Delete
                                                                              </button>
                                                                        </td>
                                                                  </tr>
                                                            ))
                                                      ) : (
                                                            <tr>
                                                                  <td
                                                                        colSpan="3"
                                                                        className="px-5 py-10 text-center text-sm text-gray-500"
                                                                  >
                                                                        No Super Deal Found
                                                                  </td>
                                                            </tr>
                                                      )}

                                                </tbody>

                                          </table>

                                    </div>

                              </div>

                        </div>


                        {/* =====================================================
                            AD CAMPAIGN
                        ====================================================== */}

                        <div className="mb-10">

                              <div className="mb-5">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                          All Ad Campaigns
                                    </h2>
                              </div>

                              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                    <div className="overflow-x-auto">

                                          <table className="w-full min-w-[600px]">

                                                <thead className="bg-gray-50">
                                                      <tr>
                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Image
                                                            </th>

                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Title
                                                            </th>

                                                            <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                                                                  Action
                                                            </th>
                                                      </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-100">

                                                      {campaigns.length > 0 ? (
                                                            campaigns.map((campaign) => {

                                                                  const displayImage =
                                                                        campaign.featuredProduct?.image ||
                                                                        campaign.banner?.modelImage ||
                                                                        campaign.image;

                                                                  const displayTitle =
                                                                        campaign.featuredProduct?.title ||
                                                                        campaign.banner?.title ||
                                                                        campaign.title;

                                                                  return (
                                                                        <tr
                                                                              key={campaign._id}
                                                                              className="hover:bg-gray-50"
                                                                        >

                                                                              <td className="px-5 py-4">
                                                                                    <img
                                                                                          src={displayImage}
                                                                                          alt={displayTitle}
                                                                                          className="h-16 w-24 rounded-lg object-cover"
                                                                                    />
                                                                              </td>

                                                                              <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                                                                                    {displayTitle}
                                                                              </td>

                                                                              <td className="px-5 py-4 text-right">
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleDeleteCampaign(
                                                                                                      campaign._id
                                                                                                )
                                                                                          }
                                                                                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                                                                    >
                                                                                          Delete
                                                                                    </button>
                                                                              </td>

                                                                        </tr>
                                                                  );
                                                            })
                                                      ) : (
                                                            <tr>
                                                                  <td
                                                                        colSpan="3"
                                                                        className="px-5 py-10 text-center text-sm text-gray-500"
                                                                  >
                                                                        No Ad Campaign Found
                                                                  </td>
                                                            </tr>
                                                      )}

                                                </tbody>

                                          </table>

                                    </div>

                              </div>

                        </div>


                        {/* =====================================================
                            CATEGORY
                        ====================================================== */}

                        <div className="mb-10">

                              <div className="mb-5">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                          All Categories
                                    </h2>
                              </div>

                              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                    <div className="overflow-x-auto">

                                          <table className="w-full min-w-[600px]">

                                                <thead className="bg-gray-50">
                                                      <tr>
                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Image
                                                            </th>

                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Category Name
                                                            </th>

                                                            <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                                                                  Action
                                                            </th>
                                                      </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-100">

                                                      {categories.length > 0 ? (
                                                            categories.map((category) => (
                                                                  <tr
                                                                        key={category._id}
                                                                        className="hover:bg-gray-50"
                                                                  >

                                                                        <td className="px-5 py-4">
                                                                              <img
                                                                                    src={category.image}
                                                                                    alt={category.title}
                                                                                    className="h-16 w-24 rounded-lg object-cover"
                                                                              />
                                                                        </td>

                                                                        <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                                                                              {category.title}
                                                                        </td>

                                                                        <td className="px-5 py-4 text-right">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          handleDeleteCategory(
                                                                                                category._id
                                                                                          )
                                                                                    }
                                                                                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                                                              >
                                                                                    Delete
                                                                              </button>
                                                                        </td>

                                                                  </tr>
                                                            ))
                                                      ) : (
                                                            <tr>
                                                                  <td
                                                                        colSpan="3"
                                                                        className="px-5 py-10 text-center text-sm text-gray-500"
                                                                  >
                                                                        No Category Found
                                                                  </td>
                                                            </tr>
                                                      )}

                                                </tbody>

                                          </table>

                                    </div>

                              </div>

                        </div>


                        {/* =====================================================
                            BANNER
                        ====================================================== */}

                        <div>

                              <div className="mb-5">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                          All Banners
                                    </h2>
                              </div>

                              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                    <div className="overflow-x-auto">

                                          <table className="w-full min-w-[700px]">

                                                <thead className="bg-gray-50">

                                                      <tr>

                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Image
                                                            </th>

                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Title
                                                            </th>

                                                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                                                  Subtitle
                                                            </th>

                                                            <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                                                                  Action
                                                            </th>

                                                      </tr>

                                                </thead>

                                                <tbody className="divide-y divide-gray-100">

                                                      {banners.length > 0 ? (
                                                            banners.map((banner) => (
                                                                  <tr
                                                                        key={banner._id}
                                                                        className="hover:bg-gray-50 transition"
                                                                  >

                                                                        {/* IMAGE */}
                                                                        <td className="px-5 py-4">

                                                                              <img
                                                                                    src={banner.image}
                                                                                    alt={banner.title}
                                                                                    className="
                                                                                          h-16
                                                                                          w-28
                                                                                          rounded-lg
                                                                                          object-cover
                                                                                          border
                                                                                          border-gray-200
                                                                                    "
                                                                              />

                                                                        </td>


                                                                        {/* TITLE */}
                                                                        <td className="px-5 py-4">

                                                                              <p className="text-sm font-semibold text-gray-800">
                                                                                    {banner.title}
                                                                              </p>

                                                                        </td>


                                                                        {/* SUBTITLE */}
                                                                        <td className="px-5 py-4">

                                                                              <p className="text-sm text-gray-600">
                                                                                    {banner.subtitle || "—"}
                                                                              </p>

                                                                        </td>


                                                                        {/* ACTION */}
                                                                        <td className="px-5 py-4 text-right">

                                                                              <button
                                                                                    onClick={() =>
                                                                                          handleDeleteBanner(
                                                                                                banner._id
                                                                                          )
                                                                                    }
                                                                                    className="
                                                                                          rounded-lg
                                                                                          bg-red-50
                                                                                          px-4
                                                                                          py-2
                                                                                          text-sm
                                                                                          font-semibold
                                                                                          text-red-600
                                                                                          transition
                                                                                          hover:bg-red-600
                                                                                          hover:text-white
                                                                                          cursor-pointer
                                                                                    "
                                                                              >
                                                                                    Delete
                                                                              </button>

                                                                        </td>

                                                                  </tr>
                                                            ))
                                                      ) : (
                                                            <tr>

                                                                  <td
                                                                        colSpan="4"
                                                                        className="px-5 py-10 text-center text-sm text-gray-500"
                                                                  >
                                                                        No Banner Found
                                                                  </td>

                                                            </tr>
                                                      )}

                                                </tbody>

                                          </table>

                                    </div>

                              </div>

                        </div>

                  </div>

            </section>
      );
};

export default AllDeal;