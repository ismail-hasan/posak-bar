import React, { useRef, useState } from "react";
import axios from "axios";

const API_URL = "https://posak-bari-backend.vercel.app/upload";

const ImageUpload = ({
      collectionName = "imageData",
      onUploadSuccess,
}) => {
      const [file, setFile] = useState(null);
      const [loading, setLoading] = useState(false);

      const inputRef = useRef(null);

      const handleUpload = async () => {
            if (!file) {
                  alert("দয়া করে একটি ছবি সিলেক্ট করুন!");
                  return;
            }

            const formData = new FormData();

            formData.append("image", file);
            formData.append("collectionName", collectionName);

            try {
                  setLoading(true);


                  const response = await axios.post(
                        API_URL,
                        formData,
                        {
                              // ⭐ Content-Type manually set করছি না
                              timeout: 120000,
                        }
                  );

                  const imageUrl = response.data?.url;

                  if (!imageUrl) {
                        throw new Error("Cloudinary URL পাওয়া যায়নি!");
                  }


                  // ⭐ Parent component এ URL পাঠানো
                  if (onUploadSuccess) {
                        onUploadSuccess(imageUrl);
                  }

                  alert("ছবি সফলভাবে আপলোড হয়েছে!");

                  // Clear file
                  setFile(null);

                  // Clear input
                  if (inputRef.current) {
                        inputRef.current.value = "";
                  }

            } catch (error) {
                  console.error("Image Upload Error:", error);

                  if (error.code === "ECONNABORTED") {
                        alert(
                              "ছবি upload হতে বেশি সময় লাগছে। আবার চেষ্টা করুন।"
                        );
                  } else if (error.response?.status === 404) {
                        alert(
                              "Upload API পাওয়া যাচ্ছে না। Backend-এর /upload route check করুন।"
                        );
                  } else {
                        alert(
                              error.response?.data?.error ||
                              error.message ||
                              "আপলোড করতে সমস্যা হয়েছে!"
                        );
                  }

            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="w-full rounded-lg border border-purple-100 bg-white p-3 shadow-sm">

                  <div className="flex items-center gap-2">

                        {/* File Input */}
                        <input
                              ref={inputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={(e) => {
                                    const selectedFile =
                                          e.target.files?.[0] || null;

                                    setFile(selectedFile);
                              }}
                              className="w-full cursor-pointer rounded-md border border-dashed border-purple-200 p-1 text-xs text-gray-500 file:mr-2 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
                        />

                        {/* Upload */}
                        <button
                              type="button"
                              onClick={handleUpload}
                              disabled={loading || !file}
                              className="shrink-0 rounded-md bg-purple-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                              {loading ? "Uploading..." : "Upload"}
                        </button>
                  </div>

                  {/* Selected File */}
                  {file && (
                        <div className="mt-2 flex items-center justify-between gap-2">
                              <p className="truncate text-xs text-gray-500">
                                    {file.name}
                              </p>

                              <p className="shrink-0 text-xs text-gray-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                        </div>
                  )}

                  {/* Loading */}
                  {loading && (
                        <p className="mt-2 text-xs font-medium text-purple-600">
                              ছবি upload হচ্ছে, একটু অপেক্ষা করুন...
                        </p>
                  )}
            </div>
      );
};

export default ImageUpload;