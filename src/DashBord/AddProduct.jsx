import React, { useState } from "react";
import { RxPlus } from "react-icons/rx";
import Swal from "sweetalert2";
import ImageUpload from "../Components/ImagePost.jsx";

const ADD_PRODUCT_API = "https://posak-bari-backend.vercel.app/addproduct";

const INITIAL_PRODUCT_DATA = {
      name: "",
      category: "",
      brand: "Posak Bari",
      price: "",
      discountPrice: "",
      stock: 0,
      material: "",
      printing: "",
      reviews: "",
      thumbnail: "",
      description: "",
      longDescription: "",
};

const AddProduct = () => {
      const [productData, setProductData] = useState(
            INITIAL_PRODUCT_DATA
      );

      const [selectedSizes, setSelectedSizes] = useState([]);
      const [selectedColors, setSelectedColors] = useState([]);
      const [loading, setLoading] = useState(false);

      // ================= HANDLE CHANGE =================

      const handleChange = (e) => {
            const { name, value } = e.target;

            setProductData((prev) => ({
                  ...prev,
                  [name]: name === "stock" ? Number(value) : value,
            }));
      };

      // ================= SIZE TOGGLE =================

      const handleSizeToggle = (size) => {
            setSelectedSizes((prev) =>
                  prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
            );
      };

      // ================= COLOR TOGGLE =================

      const handleColorToggle = (color) => {
            setSelectedColors((prev) =>
                  prev.includes(color)
                        ? prev.filter((item) => item !== color)
                        : [...prev, color]
            );
      };

      // ================= THUMBNAIL UPLOAD =================

      const handleThumbnailUpload = (url) => {
            if (!url) return;

            setProductData((prev) => ({
                  ...prev,
                  thumbnail: url,
            }));
      };

      // ================= SUBMIT =================

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (loading) return;

            // Thumbnail validation
            if (!productData.thumbnail) {
                  await Swal.fire({
                        icon: "warning",
                        title: "ছবি নেই!",
                        text: "দয়া করে Product Thumbnail upload করুন।",
                        confirmButtonColor: "#7e22ce",
                  });

                  return;
            }

            setLoading(true);

            // ================= FINAL PRODUCT =================

            const finalProduct = {
                  name: productData.name.trim(),

                  slug: productData.name
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "-"),

                  category: productData.category.trim(),

                  brand: productData.brand.trim(),

                  price: productData.price,

                  discountPrice:
                        productData.discountPrice || 0,

                  // ✅ Stock এখন number
                  stock: Number(productData.stock),

                  // ✅ Empty হলেও [] যাবে
                  size: selectedSizes,

                  // ✅ Empty হলেও [] যাবে
                  color: selectedColors,

                  material: productData.material.trim(),

                  printing: productData.printing.trim(),

                  rating: 5,

                  reviews: productData.reviews || 0,

                  thumbnail: productData.thumbnail,

                  // Only thumbnail
                  gallery: [productData.thumbnail],

                  description:
                        productData.description.trim(),

                  longDescription:
                        productData.longDescription.trim(),
            };


            try {
                  const response = await fetch(
                        ADD_PRODUCT_API,
                        {
                              method: "POST",

                              headers: {
                                    "Content-Type":
                                          "application/json",
                              },

                              body: JSON.stringify(
                                    finalProduct
                              ),
                        }
                  );

                  const data = await response.json();

                  console.log(
                        "Add Product Response:",
                        data
                  );

                  if (!response.ok) {
                        throw new Error(
                              data?.message ||
                              data?.error ||
                              "Product add করা যায়নি।"
                        );
                  }

                  // ================= SUCCESS =================

                  if (data.insertedId) {
                        await Swal.fire({
                              icon: "success",
                              title: "সফল!",
                              text:
                                    "প্রোডাক্ট সফলভাবে যোগ করা হয়েছে!",
                              confirmButtonColor:
                                    "#7e22ce",
                              confirmButtonText: "OK",
                        });

                        // Reset everything
                        setProductData({
                              ...INITIAL_PRODUCT_DATA,
                        });

                        setSelectedSizes([]);

                        setSelectedColors([]);
                  } else {
                        throw new Error(
                              "Product insert confirmation পাওয়া যায়নি।"
                        );
                  }
            } catch (error) {
                  console.error(
                        "Add Product Error:",
                        error
                  );

                  Swal.fire({
                        icon: "error",
                        title: "ত্রুটি!",
                        text:
                              error?.message ||
                              "সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।",
                        confirmButtonColor: "#dc2626",
                  });
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="mx-auto max-w-5xl rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-50 sm:p-8">

                  {/* ================= HEADER ================= */}

                  <div className="mb-6 border-b border-gray-100 pb-5">
                        <h2 className="text-2xl font-extrabold tracking-wide text-purple-900">
                              নতুন প্রোডাক্ট যোগ করুন
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                              আপনার ওয়েবসাইটের ডাটাবেজে সঠিক
                              তথ্য দিয়ে ফর্মটি পূরণ করুন।
                        </p>
                  </div>

                  <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                  >

                        {/* ================= BASIC INFO ================= */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                              {/* Name */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          প্রোডাক্টের নাম
                                    </label>

                                    <input
                                          type="text"
                                          name="name"
                                          value={productData.name}
                                          onChange={handleChange}
                                          required
                                          placeholder="যেমন: এফসি বার্সেলোনা জার্সি"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Category */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          ক্যাটাগরি
                                    </label>

                                    <input
                                          type="text"
                                          name="category"
                                          value={productData.category}
                                          onChange={handleChange}
                                          required
                                          placeholder="Sports & Outdoors > Jerseys"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Brand */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          ব্র্যান্ড
                                    </label>

                                    <input
                                          type="text"
                                          name="brand"
                                          value={productData.brand}
                                          onChange={handleChange}
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Price */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          মূল্য (৳)
                                    </label>

                                    <input
                                          type="text"
                                          name="price"
                                          value={productData.price}
                                          onChange={handleChange}
                                          required
                                          min="0"
                                          placeholder="যেমন: ১০০০"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Discount */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          ডিসকাউন্ট মূল্য (৳)
                                    </label>

                                    <input
                                          type="text"
                                          name="discountPrice"
                                          value={productData.discountPrice}
                                          onChange={handleChange}
                                          min="0"
                                          placeholder="যেমন: ৮৫০"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Stock */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          স্টক পরিমাণ
                                    </label>

                                    <input
                                          type="number"
                                          name="stock"
                                          value={productData.stock}
                                          onChange={handleChange}
                                          required
                                          min="0"
                                          placeholder="যেমন: ৫০"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Material */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          ম্যাটেরিয়াল
                                    </label>

                                    <input
                                          type="text"
                                          name="material"
                                          value={productData.material}
                                          onChange={handleChange}
                                          placeholder="যেমন: পলিয়েস্টার"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Printing */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          প্রিন্টিং পদ্ধতি
                                    </label>

                                    <input
                                          type="text"
                                          name="printing"
                                          value={productData.printing}
                                          onChange={handleChange}
                                          placeholder="যেমন: সাবলিমেশন"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              {/* Reviews */}

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          রিভিউ সংখ্যা
                                    </label>

                                    <input
                                          type="text"
                                          name="reviews"
                                          value={productData.reviews}
                                          onChange={handleChange}
                                          min="0"
                                          placeholder="যেমন: ২৫"
                                          className="w-full rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>
                        </div>

                        {/* ================= SIZE & COLOR ================= */}

                        <div className="grid grid-cols-1 gap-6 rounded-xl border border-purple-100 bg-purple-50/30 p-5 md:grid-cols-2">

                              {/* Sizes */}

                              <div>
                                    <label className="mb-3 block text-sm font-semibold text-purple-900">
                                          উপলব্ধ সাইজসমূহ
                                    </label>

                                    <div className="flex flex-wrap gap-3">
                                          {[
                                                "S",
                                                "M",
                                                "L",
                                                "XL",
                                                "XXL",
                                          ].map((size) => (
                                                <button
                                                      type="button"
                                                      key={size}
                                                      onClick={() =>
                                                            handleSizeToggle(
                                                                  size
                                                            )
                                                      }
                                                      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${selectedSizes.includes(
                                                            size
                                                      )
                                                                  ? "border-amber-500 bg-amber-500 text-white"
                                                                  : "border-gray-300 bg-white text-gray-600 hover:border-amber-500"
                                                            }`}
                                                >
                                                      {size}
                                                </button>
                                          ))}
                                    </div>
                              </div>

                              {/* Colors */}

                              <div>
                                    <label className="mb-3 block text-sm font-semibold text-purple-900">
                                          উপলব্ধ রঙসমূহ
                                    </label>

                                    <div className="flex flex-wrap gap-3">
                                          {[
                                                "White",
                                                "Black",
                                                "Red",
                                                "Blue",
                                                "Green",
                                          ].map((color) => (
                                                <button
                                                      type="button"
                                                      key={color}
                                                      onClick={() =>
                                                            handleColorToggle(
                                                                  color
                                                            )
                                                      }
                                                      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${selectedColors.includes(
                                                            color
                                                      )
                                                                  ? "border-amber-500 bg-amber-500 text-white"
                                                                  : "border-gray-300 bg-white text-gray-600 hover:border-amber-500"
                                                            }`}
                                                >
                                                      {color}
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        {/* ================= THUMBNAIL ================= */}

                        <div>
                              <label className="mb-2 block text-sm font-semibold text-purple-900">
                                    থাম্বনেইল ইমেজ
                              </label>

                              <ImageUpload
                                    collectionName="productImages"
                                    onUploadSuccess={
                                          handleThumbnailUpload
                                    }
                              />

                              {productData.thumbnail && (
                                    <div className="mt-3 overflow-hidden rounded-xl border border-green-200 bg-green-50 p-2">
                                          <p className="mb-2 text-xs font-semibold text-green-600">
                                                ✓ ছবি সফলভাবে আপলোড হয়েছে
                                          </p>

                                          <img
                                                src={
                                                      productData.thumbnail
                                                }
                                                alt="Product Thumbnail"
                                                className="h-48 w-full rounded-lg bg-white object-contain"
                                          />
                                    </div>
                              )}
                        </div>

                        {/* ================= DESCRIPTIONS ================= */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          প্রোডাক্টের বিবরণ
                                    </label>

                                    <textarea
                                          name="description"
                                          rows="4"
                                          value={productData.description}
                                          onChange={handleChange}
                                          required
                                          placeholder="সংক্ষিপ্ত বিবরণ লিখুন..."
                                          className="w-full resize-none rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>

                              <div>
                                    <label className="mb-1 block text-sm font-semibold text-purple-900">
                                          বিস্তারিত বর্ণনা
                                    </label>

                                    <textarea
                                          name="longDescription"
                                          rows="4"
                                          value={
                                                productData.longDescription
                                          }
                                          onChange={handleChange}
                                          placeholder="প্রোডাক্টের বিস্তারিত বর্ণনা লিখুন..."
                                          className="w-full resize-none rounded-lg border border-purple-200 bg-purple-50/40 px-4 py-2.5 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    />
                              </div>
                        </div>

                        {/* ================= SUBMIT ================= */}

                        <button
                              type="submit"
                              disabled={
                                    loading ||
                                    !productData.thumbnail
                              }
                              className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition ${loading ||
                                          !productData.thumbnail
                                          ? "cursor-not-allowed bg-gray-400"
                                          : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                                    }`}
                        >
                              <RxPlus className="text-xl" />

                              <span>
                                    {loading
                                          ? "প্রোডাক্ট যোগ হচ্ছে..."
                                          : "স্টোরে প্রোডাক্ট যুক্ত করুন"}
                              </span>
                        </button>
                  </form>
            </div>
      );
};

export default AddProduct;