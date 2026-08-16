import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const API_URL = "https://posak-bari-backend.vercel.app/category";

const CategoryControl = () => {
      const [categories, setCategories] = useState([]);
      const [loading, setLoading] = useState(true);
      const [deleteLoading, setDeleteLoading] = useState(null);

      // ================= FETCH CATEGORIES =================

      const fetchCategories = async () => {
            try {
                  setLoading(true);

                  const res = await fetch(API_URL);

                  if (!res.ok) {
                        throw new Error("Failed to fetch categories");
                  }

                  const data = await res.json();

                  setCategories(
                        Array.isArray(data) ? data : []
                  );

            } catch (error) {
                  console.error(
                        "Error fetching categories:",
                        error
                  );

                  Swal.fire({
                        icon: "error",
                        title: "সমস্যা হয়েছে!",
                        text: "ক্যাটাগরি লোড করা যায়নি।",
                        confirmButtonColor: "#7e22ce",
                  });

            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchCategories();
      }, []);

      // ================= DELETE CATEGORY =================

      const handleDelete = async (id) => {
            const result = await Swal.fire({
                  title: "ক্যাটাগরি ডিলিট করবেন?",
                  text: "এই ক্যাটাগরিটি স্থায়ীভাবে ডিলিট হয়ে যাবে।",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#6b7280",
                  confirmButtonText: "হ্যাঁ, ডিলিট করুন",
                  cancelButtonText: "বাতিল",
            });

            if (!result.isConfirmed) return;

            try {
                  setDeleteLoading(id);

                  const res = await fetch(
                        `${API_URL}/${id}`,
                        {
                              method: "DELETE",
                        }
                  );

                  const data = await res.json();

                  if (
                        !res.ok ||
                        !(
                              data.deletedCount > 0 ||
                              data.success
                        )
                  ) {
                        throw new Error(
                              data.message ||
                              "Category delete failed"
                        );
                  }

                  // UI থেকে remove
                  setCategories((prev) =>
                        prev.filter(
                              (category) =>
                                    category._id !== id
                        )
                  );

                  Swal.fire({
                        icon: "success",
                        title: "ডিলিট হয়েছে!",
                        text: "ক্যাটাগরিটি সফলভাবে ডিলিট হয়েছে।",
                        confirmButtonColor: "#7e22ce",
                        timer: 1800,
                        showConfirmButton: false,
                  });

            } catch (error) {
                  console.error(
                        "Error deleting category:",
                        error
                  );

                  Swal.fire({
                        icon: "error",
                        title: "ডিলিট করা যায়নি!",
                        text:
                              error.message ||
                              "আবার চেষ্টা করুন।",
                        confirmButtonColor: "#7e22ce",
                  });

            } finally {
                  setDeleteLoading(null);
            }
      };

      // ================= LOADING =================

      if (loading) {
            return (
                  <div className="w-full px-3 sm:px-5 py-6">
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                              <table className="w-full min-w-[600px]">
                                    <tbody>
                                          {[1, 2, 3, 4, 5].map(
                                                (item) => (
                                                      <tr
                                                            key={item}
                                                            className="border-b border-gray-100"
                                                      >
                                                            <td className="px-4 py-4">
                                                                  <div className="h-14 w-14 animate-pulse rounded-lg bg-gray-200" />
                                                            </td>

                                                            <td className="px-4 py-4">
                                                                  <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
                                                            </td>

                                                            <td className="px-4 py-4">
                                                                  <div className="mx-auto h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
                                                            </td>
                                                      </tr>
                                                )
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            );
      }

      // ================= UI =================

      return (
            <div className="w-full px-3 sm:px-5 py-6">

                  {/* Header */}

                  <div className="mb-5 flex items-center justify-between">

                        <div>
                              <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
                                    Category
                              </h2>

                              <p className="mt-1 text-sm text-gray-500">
                                    মোট ক্যাটাগরি:{" "}
                                    <span className="font-semibold text-purple-700">
                                          {categories.length}
                                    </span>
                              </p>
                        </div>

                  </div>

                  {/* Empty */}

                  {categories.length === 0 ? (

                        <div className="rounded-xl border border-gray-200 bg-white py-14 text-center shadow-sm">

                              <p className="text-gray-500">
                                    কোনো ক্যাটাগরি পাওয়া যায়নি।
                              </p>

                        </div>

                  ) : (

                        /* ================= TABLE ================= */

                        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">

                              <table className="w-full min-w-[650px] border-collapse">

                                    <thead>

                                          <tr className="border-b border-gray-200 bg-gray-50">

                                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6">
                                                      Image
                                                </th>

                                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 sm:px-6">
                                                      Category Name
                                                </th>

                                                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 sm:px-6">
                                                      Action
                                                </th>

                                          </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                          {categories.map(
                                                (category) => (

                                                      <tr
                                                            key={
                                                                  category._id
                                                            }
                                                            className="transition hover:bg-purple-50/40"
                                                      >

                                                            {/* IMAGE */}

                                                            <td className="px-4 py-4 sm:px-6">

                                                                  <img
                                                                        src={
                                                                              category.image
                                                                        }
                                                                        alt={
                                                                              category.title
                                                                        }
                                                                        className="h-14 w-14 rounded-lg border border-gray-200 object-cover shadow-sm sm:h-16 sm:w-16"
                                                                  />

                                                            </td>

                                                            {/* NAME */}

                                                            <td className="px-4 py-4 sm:px-6">

                                                                  <p className="text-base font-semibold text-gray-800 sm:text-lg">
                                                                        {
                                                                              category.title
                                                                        }
                                                                  </p>

                                                            </td>

                                                            {/* ACTION */}

                                                            <td className="px-4 py-4 text-center sm:px-6">

                                                                  <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                              handleDelete(
                                                                                    category._id
                                                                              )
                                                                        }
                                                                        disabled={
                                                                              deleteLoading ===
                                                                              category._id
                                                                        }
                                                                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition ${deleteLoading ===
                                                                              category._id
                                                                              ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                                                              : "cursor-pointer bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                                                                              }`}
                                                                        title="Delete Category"
                                                                  >

                                                                        {deleteLoading ===
                                                                              category._id ? (
                                                                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-600" />
                                                                        ) : (
                                                                              <FaTrash
                                                                                    size={
                                                                                          15
                                                                                    }
                                                                              />
                                                                        )}

                                                                  </button>

                                                            </td>

                                                      </tr>

                                                )
                                          )}

                                    </tbody>

                              </table>

                        </div>

                  )}

            </div>
      );
};

export default CategoryControl;