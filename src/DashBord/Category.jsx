import React, { useState } from "react";
import Swal from "sweetalert2";
import ImageUpload from "../Components/ImagePost.jsx";

const API_URL = "http://localhost:5000/category";

const INITIAL_FORM = {
      title: "",
      slug: "",
      image: "",
};

const Category = () => {
      const [formData, setFormData] = useState(INITIAL_FORM);
      const [loading, setLoading] = useState(false);

      // ==========================================
      // HANDLE INPUT
      // ==========================================
      const handleChange = (e) => {
            const { name, value } = e.target;

            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      // ==========================================
      // IMAGE UPLOAD SUCCESS
      // ==========================================
      const handleImageUpload = (url) => {
            if (!url) return;

            setFormData((prev) => ({
                  ...prev,
                  image: url,
            }));
      };

      // ==========================================
      // SUBMIT CATEGORY
      // ==========================================
      const handleSubmit = async (e) => {
            e.preventDefault();

            if (loading) return;

            // Image validation
            if (!formData.image) {
                  Swal.fire({
                        icon: "warning",
                        title: "ছবি নেই!",
                        text: "দয়া করে Category Image upload করুন।",
                        confirmButtonColor: "#7e22ce",
                  });

                  return;
            }

            // Title validation
            if (!formData.title.trim()) {
                  Swal.fire({
                        icon: "warning",
                        title: "Title নেই!",
                        text: "দয়া করে Category Title লিখুন।",
                        confirmButtonColor: "#7e22ce",
                  });

                  return;
            }

            // Slug validation
            if (!formData.slug.trim()) {
                  Swal.fire({
                        icon: "warning",
                        title: "Slug নেই!",
                        text: "দয়া করে Category Slug লিখুন।",
                        confirmButtonColor: "#7e22ce",
                  });

                  return;
            }

            setLoading(true);

            try {
                  const categoryData = {
                        title: formData.title.trim(),
                        slug: formData.slug.trim(),
                        image: formData.image,
                  };


                  const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(categoryData),
                  });

                  const data = await response.json();


                  if (!response.ok) {
                        throw new Error(
                              data?.message ||
                              data?.error ||
                              "Category add করা যায়নি।"
                        );
                  }

                  await Swal.fire({
                        icon: "success",
                        title: "সফল!",
                        text: "Category সফলভাবে যোগ করা হয়েছে।",
                        confirmButtonColor: "#7e22ce",
                        confirmButtonText: "OK",
                  });

                  // ==========================================
                  // RESET
                  // ==========================================
                  setFormData(INITIAL_FORM);

            } catch (error) {
                  console.error("Category Error:", error);

                  Swal.fire({
                        icon: "error",
                        title: "ত্রুটি!",
                        text:
                              error?.message ||
                              "Category যোগ করতে সমস্যা হয়েছে।",
                        confirmButtonColor: "#dc2626",
                  });
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 px-4 py-8">

                  <div className="mx-auto max-w-2xl">

                        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-50 sm:p-8">

                              {/* ==========================================
                                  HEADER
                              ========================================== */}

                              <div className="mb-7 border-b border-gray-100 pb-5">

                                    <h2 className="text-2xl font-extrabold tracking-wide text-purple-900">
                                          নতুন ক্যাটাগরি যোগ করুন
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                          আপনার ওয়েবসাইটের জন্য নতুন
                                          ক্যাটাগরি তৈরি করুন।
                                    </p>

                              </div>

                              <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                              >

                                    {/* ==========================================
                                        TITLE
                                    ========================================== */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-purple-900">
                                                Category Title
                                          </label>

                                          <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                placeholder="যেমন: Jersey"
                                                className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                                          />

                                    </div>

                                    {/* ==========================================
                                        SLUG
                                    ========================================== */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-purple-900">
                                                Category Slug
                                          </label>

                                          <input
                                                type="text"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleChange}
                                                required
                                                placeholder="যেমন: jersey"
                                                className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                                          />

                                          <p className="mt-1.5 text-xs text-gray-400">
                                                Example:
                                                <span className="ml-1 font-semibold text-purple-600">
                                                      mens-jersey
                                                </span>
                                          </p>

                                    </div>

                                    {/* ==========================================
                                        IMAGE
                                    ========================================== */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-purple-900">
                                                Category Image
                                          </label>

                                          <ImageUpload
                                                collectionName="addCategory"
                                                onUploadSuccess={
                                                      handleImageUpload
                                                }
                                          />

                                          {/* IMAGE PREVIEW */}

                                          {formData.image && (
                                                <div className="mt-4 overflow-hidden rounded-xl border border-green-200 bg-green-50 p-3">

                                                      <p className="mb-2 text-xs font-semibold text-green-600">
                                                            ✓ Image uploaded successfully
                                                      </p>

                                                      <img
                                                            src={formData.image}
                                                            alt="Category Preview"
                                                            className="h-48 w-full rounded-lg bg-white object-contain"
                                                      />

                                                      <p className="mt-2 truncate text-xs text-gray-500">
                                                            {formData.image}
                                                      </p>

                                                </div>
                                          )}

                                    </div>

                                    {/* ==========================================
                                        SUBMIT
                                    ========================================== */}

                                    <div className="pt-2">

                                          <button
                                                type="submit"
                                                disabled={
                                                      loading ||
                                                      !formData.image
                                                }
                                                className={`w-full rounded-xl py-3.5 font-bold text-white shadow-lg transition ${loading ||
                                                            !formData.image
                                                            ? "cursor-not-allowed bg-gray-400 shadow-none"
                                                            : "bg-gradient-to-r from-purple-500 to-purple-600 shadow-purple-200 hover:from-purple-600 hover:to-purple-700"
                                                      }`}
                                          >
                                                {loading
                                                      ? "Category যোগ হচ্ছে..."
                                                      : "Category যোগ করুন"}
                                          </button>

                                    </div>

                              </form>

                        </div>

                  </div>

            </div>
      );
};

export default Category;