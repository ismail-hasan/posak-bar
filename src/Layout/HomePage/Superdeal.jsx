import React, { useState } from "react";
import Swal from "sweetalert2";
import ImageUpload from "../../Components/ImagePost";

const API_URL = "https://posak-bari-backend.vercel.app/superdeal";

const INITIAL_FORM_DATA = {
      image: "",
      title: "",
      subtitle: "",
      productLink: "",
};

const AddSuperDeal = () => {
      const [formData, setFormData] = useState(INITIAL_FORM_DATA);
      const [loading, setLoading] = useState(false);

      // ================= HANDLE CHANGE =================
      const handleChange = (e) => {
            const { name, value } = e.target;

            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      // ================= IMAGE UPLOAD SUCCESS =================
      const handleImageUpload = (url) => {

            setFormData((prev) => ({
                  ...prev,
                  image: url,
            }));
      };

      // ================= HANDLE SUBMIT =================
      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.image) {
                  Swal.fire({
                        icon: "warning",
                        title: "Image Missing!",
                        text: "দয়া করে Super Deal-এর ছবি upload করুন।",
                        confirmButtonColor: "#2563eb",
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

                  const data = await response.json();

                  if (!response.ok) {
                        throw new Error(
                              data.message ||
                              data.error ||
                              "Failed to add Super Deal"
                        );
                  }

                  await Swal.fire({
                        icon: "success",
                        title: "Deal Added!",
                        text: "Super Deal successfully added.",
                        confirmButtonColor: "#2563eb",
                        confirmButtonText: "OK",
                  });

                  setFormData(INITIAL_FORM_DATA);

            } catch (error) {
                  console.error("Super Deal Error:", error);

                  Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text:
                              error.message ||
                              "Something went wrong. Please try again.",
                        confirmButtonColor: "#dc2626",
                  });
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 px-4 py-8">

                  <div className="mx-auto max-w-2xl">

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                              {/* ================= TITLE ================= */}

                              <div className="mb-7">

                                    <h2 className="text-2xl font-bold text-gray-800">
                                          Add Super Deal
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                          Add a new deal to your website.
                                    </p>

                              </div>

                              <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                              >

                                    {/* ================= IMAGE ================= */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Deal Image
                                          </label>

                                          <ImageUpload
                                                /*
                                                 * IMPORTANT:
                                                 * এখানে superDeal দেওয়া যাবে না।
                                                 * কারণ /upload এই collection-এ
                                                 * imageUrl document insert করে।
                                                 */
                                                collectionName="superDealImages"
                                                onUploadSuccess={
                                                      handleImageUpload
                                                }
                                          />

                                          {/* IMAGE PREVIEW */}

                                          {formData.image && (
                                                <div className="mt-3 overflow-hidden rounded-xl border border-green-200 bg-green-50 p-2">

                                                      <p className="mb-2 text-xs font-semibold text-green-600">
                                                            ✓ Image uploaded successfully
                                                      </p>

                                                      <img
                                                            src={formData.image}
                                                            alt="Super Deal Preview"
                                                            className="h-48 w-full rounded-lg bg-white object-contain"
                                                      />

                                                      <p className="mt-2 truncate text-xs text-gray-500">
                                                            {formData.image}
                                                      </p>

                                                </div>
                                          )}

                                    </div>

                                    {/* ================= TITLE ================= */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Title
                                          </label>

                                          <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="সীমিত সময়ের অফার"
                                                required
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                          />

                                    </div>

                                    {/* ================= SUBTITLE ================= */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Subtitle
                                          </label>

                                          <input
                                                type="text"
                                                name="subtitle"
                                                value={formData.subtitle}
                                                onChange={handleChange}
                                                placeholder="নতুন এসেছে"
                                                required
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                          />

                                    </div>

                                    {/* ================= PRODUCT LINK ================= */}

                                    <div>

                                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Product Link
                                          </label>

                                          <input
                                                type="text"
                                                name="productLink"
                                                value={formData.productLink}
                                                onChange={handleChange}
                                                placeholder="/product/123456"
                                                required
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                          />

                                    </div>

                                    {/* ================= SUBMIT ================= */}

                                    <button
                                          type="submit"
                                          disabled={
                                                loading || !formData.image
                                          }
                                          className={`w-full rounded-xl px-5 py-3.5 font-semibold text-white transition duration-200 ${loading || !formData.image
                                                ? "cursor-not-allowed bg-gray-400"
                                                : "bg-blue-600 hover:bg-blue-700"
                                                }`}
                                    >
                                          {loading
                                                ? "Adding Deal..."
                                                : "Add Super Deal"}
                                    </button>

                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default AddSuperDeal;