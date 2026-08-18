import React, { useState } from "react";
import Swal from "sweetalert2";
import ImageUpload from "../../Components/ImagePost";

const API_URL = "https://posak-bari-backend.vercel.app/addcam";
const UPLOAD_COLLECTION = "addCampignCollection";

const INITIAL_FORM_DATA = {
      banner: {
            tagline: "",
            title: "",
            description: "",
            modelImage: "",
      },

      featuredProduct: {
            image: "",
            brand: "Product",
            rating: 0,
            title: "",
            price: "",
            link: "",
      },
};

const AdCampaign = () => {
      const [formData, setFormData] = useState(INITIAL_FORM_DATA);
      const [loading, setLoading] = useState(false);

      // =========================================
      // Input Change
      // =========================================
      const handleChange = (e, section) => {
            const { name, value } = e.target;

            setFormData((prev) => ({
                  ...prev,
                  [section]: {
                        ...prev[section],
                        [name]: value,
                  },
            }));
      };

      // =========================================
      // Banner Image Upload
      // =========================================
      const handleBannerImageUpload = (url) => {

            setFormData((prev) => ({
                  ...prev,
                  banner: {
                        ...prev.banner,
                        modelImage: url,
                  },
            }));
      };

      // =========================================
      // Product Image Upload
      // =========================================
      const handleProductImageUpload = (url) => {

            setFormData((prev) => ({
                  ...prev,
                  featuredProduct: {
                        ...prev.featuredProduct,
                        image: url,
                  },
            }));
      };

      // =========================================
      // Submit
      // =========================================
      const handleSubmit = async (e) => {
            e.preventDefault();
            // Banner image check
            if (!formData.banner.modelImage) {
                  Swal.fire({
                        icon: "warning",
                        title: "Banner Image Missing!",
                        text: "দয়া করে Banner-এর ছবি upload করুন।",
                        confirmButtonColor: "#ff4f01",
                  });

                  return;
            }

            // Product image check
            if (!formData.featuredProduct.image) {
                  Swal.fire({
                        icon: "warning",
                        title: "Product Image Missing!",
                        text: "দয়া করে Product-এর ছবি upload করুন।",
                        confirmButtonColor: "#ff4f01",
                  });

                  return;
            }

            setLoading(true);

            try {
                  const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                  });

                  const result = await response.json();

                  if (!response.ok) {
                        throw new Error(
                              result?.message ||
                              result?.error ||
                              "Campaign add করা যায়নি!"
                        );
                  }

                  Swal.fire({
                        icon: "success",
                        title: "Campaign Added!",
                        text: "Campaign successfully added.",
                        confirmButtonColor: "#ff4f01",
                        timer: 2000,
                        showConfirmButton: false,
                  });

                  // Reset
                  setFormData({
                        banner: {
                              tagline: "",
                              title: "",
                              description: "",
                              modelImage: "",
                        },

                        featuredProduct: {
                              image: "",
                              brand: "Product",
                              rating: 0,
                              title: "",
                              price: "",
                              link: "",
                        },
                  });
            } catch (error) {
                  console.error("Campaign Error:", error);

                  Swal.fire({
                        icon: "error",
                        title: "Server Error!",
                        text:
                              error.message ||
                              "Failed to connect with server.",
                        confirmButtonColor: "#ff4f01",
                  });
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

                  <div className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white p-6 shadow-md sm:p-8">

                        {/* ======================================
                            TITLE
                        ====================================== */}

                        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
                             Main Ad Campaign Banner
                        </h2>

                        <form
                              onSubmit={handleSubmit}
                              className="space-y-8"
                        >

                              {/* ======================================
                                  BANNER INFORMATION
                              ====================================== */}

                              <div className="border-b border-gray-200 pb-8">

                                    <h3 className="mb-5 text-lg font-semibold text-gray-700">
                                          Banner Information
                                    </h3>

                                    {/* Tagline + Title */}

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                          {/* Tagline */}

                                          <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                      Tagline
                                                </label>

                                                <input
                                                      type="text"
                                                      name="tagline"
                                                      value={
                                                            formData.banner.tagline
                                                      }
                                                      onChange={(e) =>
                                                            handleChange(
                                                                  e,
                                                                  "banner"
                                                            )
                                                      }
                                                      placeholder="যেমন: সবচেয়ে জনপ্রিয়"
                                                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                      required
                                                />
                                          </div>

                                          {/* Title */}

                                          <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                      Title
                                                </label>

                                                <input
                                                      type="text"
                                                      name="title"
                                                      value={
                                                            formData.banner.title
                                                      }
                                                      onChange={(e) =>
                                                            handleChange(
                                                                  e,
                                                                  "banner"
                                                            )
                                                      }
                                                      placeholder="যেমন: নতুন সিজনের জার্সি"
                                                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                      required
                                                />
                                          </div>
                                    </div>

                                    {/* Description */}

                                    <div className="mt-4">

                                          <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Description
                                          </label>

                                          <textarea
                                                name="description"
                                                rows="4"
                                                value={
                                                      formData.banner.description
                                                }
                                                onChange={(e) =>
                                                      handleChange(
                                                            e,
                                                            "banner"
                                                      )
                                                }
                                                placeholder="ব্যানারের বিবরণ লিখুন..."
                                                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                required
                                          />
                                    </div>

                                    {/* ======================================
                                        BANNER IMAGE UPLOAD
                                    ====================================== */}

                                    <div className="mt-4">

                                          <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Banner Model Image
                                          </label>

                                          <ImageUpload
                                                collectionName={
                                                      UPLOAD_COLLECTION
                                                }
                                                onUploadSuccess={
                                                      handleBannerImageUpload
                                                }
                                          />

                                          {/* Banner Preview */}

                                          {formData.banner.modelImage && (
                                                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-2">

                                                      <p className="mb-2 text-xs font-semibold text-green-600">
                                                            ✓ Banner image uploaded
                                                      </p>

                                                      <img
                                                            src={
                                                                  formData.banner.modelImage
                                                            }
                                                            alt="Banner Preview"
                                                            className="h-48 w-full rounded-md object-cover"
                                                      />

                                                      <p className="mt-2 truncate text-xs text-gray-500">
                                                            {
                                                                  formData.banner
                                                                        .modelImage
                                                            }
                                                      </p>
                                                </div>
                                          )}
                                    </div>
                              </div>

                              {/* ======================================
                                  FEATURED PRODUCT
                              ====================================== */}

                              <div>

                                    <h3 className="mb-5 text-lg font-semibold text-gray-700">
                                          Featured Product Information
                                    </h3>

                                    {/* Product Title + Price */}

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                          {/* Product Title */}

                                          <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                      Product Title
                                                </label>

                                                <input
                                                      type="text"
                                                      name="title"
                                                      value={
                                                            formData
                                                                  .featuredProduct
                                                                  .title
                                                      }
                                                      onChange={(e) =>
                                                            handleChange(
                                                                  e,
                                                                  "featuredProduct"
                                                            )
                                                      }
                                                      placeholder="Product Name"
                                                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                      required
                                                />
                                          </div>

                                          {/* Price */}

                                          <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                      Price
                                                </label>

                                                <input
                                                      type="text"
                                                      name="price"
                                                      value={
                                                            formData
                                                                  .featuredProduct
                                                                  .price
                                                      }
                                                      onChange={(e) =>
                                                            handleChange(
                                                                  e,
                                                                  "featuredProduct"
                                                            )
                                                      }
                                                      placeholder="188"
                                                      min="0"
                                                      step="0.01"
                                                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                      required
                                                />
                                          </div>
                                    </div>

                                    {/* Brand + Rating */}

                                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                          {/* Brand */}

                                          <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                      Brand
                                                </label>

                                                <input
                                                      type="text"
                                                      name="brand"
                                                      value={
                                                            formData
                                                                  .featuredProduct
                                                                  .brand
                                                      }
                                                      onChange={(e) =>
                                                            handleChange(
                                                                  e,
                                                                  "featuredProduct"
                                                            )
                                                      }
                                                      placeholder="Brand Name"
                                                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                      required
                                                />
                                          </div>

                                          {/* Rating */}

                                          <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                                      Rating
                                                </label>

                                                <input
                                                      type="text"
                                                      name="rating"
                                                      value={
                                                            formData
                                                                  .featuredProduct
                                                                  .rating
                                                      }
                                                      onChange={(e) =>
                                                            handleChange(
                                                                  e,
                                                                  "featuredProduct"
                                                            )
                                                      }
                                                      min="0"
                                                      step="0.1"
                                                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                />
                                          </div>
                                    </div>

                                    {/* ======================================
                                        PRODUCT IMAGE UPLOAD
                                    ====================================== */}

                                    <div className="mt-4">

                                          <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Product Image
                                          </label>

                                          <ImageUpload
                                                collectionName={
                                                      UPLOAD_COLLECTION
                                                }
                                                onUploadSuccess={
                                                      handleProductImageUpload
                                                }
                                          />

                                          {/* Product Preview */}

                                          {formData.featuredProduct.image && (
                                                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-2">

                                                      <p className="mb-2 text-xs font-semibold text-green-600">
                                                            ✓ Product image uploaded
                                                      </p>

                                                      <img
                                                            src={
                                                                  formData
                                                                        .featuredProduct
                                                                        .image
                                                            }
                                                            alt="Product Preview"
                                                            className="h-48 w-full rounded-md bg-white object-contain"
                                                      />

                                                      <p className="mt-2 truncate text-xs text-gray-500">
                                                            {
                                                                  formData
                                                                        .featuredProduct
                                                                        .image
                                                            }
                                                      </p>
                                                </div>
                                          )}
                                    </div>

                                    {/* ======================================
                                        PRODUCT LINK
                                    ====================================== */}

                                    <div className="mt-4">

                                          <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Show Product Link
                                          </label>

                                          <input
                                                type="text"
                                                name="link"
                                                value={
                                                      formData.featuredProduct
                                                            .link
                                                }
                                                onChange={(e) =>
                                                      handleChange(
                                                            e,
                                                            "featuredProduct"
                                                      )
                                                }
                                                placeholder="/product/your-product-id"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                required
                                          />

                                          <p className="mt-1 text-xs text-gray-400">
                                                উদাহরণ: /product/65abc123456789
                                          </p>
                                    </div>
                              </div>

                              {/* ======================================
                                  SUBMIT
                              ====================================== */}

                              <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full rounded-lg px-4 py-3 font-semibold text-white transition ${loading
                                          ? "cursor-not-allowed bg-gray-400"
                                          : "bg-blue-600 hover:bg-blue-700"
                                          }`}
                              >
                                    {loading
                                          ? "সংরক্ষণ হচ্ছে..."
                                          : "Submit to Database"}
                              </button>
                        </form>
                  </div>
            </div>
      );
};

export default AdCampaign;