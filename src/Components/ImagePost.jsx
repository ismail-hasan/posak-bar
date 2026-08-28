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

      const handleUpload = async (selectedFile) => {
            if (!selectedFile) {
                  return;
            }

            const formData = new FormData();

            formData.append("image", selectedFile);
            formData.append("collectionName", collectionName);

            try {
                  setLoading(true);

                  const response = await axios.post(
                        API_URL,
                        formData,
                        {
                              timeout: 120000,
                        }
                  );

                  const imageUrl = response.data?.url;

                  if (!imageUrl) {
                        throw new Error(
                              "The image was uploaded, but no image URL was returned."
                        );
                  }

                  // Send image URL to parent component
                  if (onUploadSuccess) {
                        onUploadSuccess(imageUrl);
                  }

                  // Clear file after successful upload
                  setFile(null);

                  // Clear input
                  if (inputRef.current) {
                        inputRef.current.value = "";
                  }

            } catch (error) {
                  console.error("Image Upload Error:", error);

                  let errorMessage = "Image upload failed. Please try again.";

                  if (error.code === "ECONNABORTED") {
                        errorMessage =
                              "Image upload timed out. Please check your internet connection and try again.";
                  } else if (error.response?.status === 404) {
                        errorMessage =
                              "Upload API was not found. Please check the backend /upload route.";
                  } else if (error.response?.data?.error) {
                        errorMessage = error.response.data.error;
                  } else if (error.response?.data?.message) {
                        errorMessage = error.response.data.message;
                  } else if (error.message) {
                        errorMessage = error.message;
                  }

                  alert(errorMessage);

                  // Keep the selected file so the user can try again
                  setFile(selectedFile);

            } finally {
                  setLoading(false);
            }
      };

      const handleFileChange = (e) => {
            const selectedFile = e.target.files?.[0] || null;

            if (!selectedFile) {
                  return;
            }

            setFile(selectedFile);

            // Automatically upload immediately after selecting
            handleUpload(selectedFile);
      };

      return (
            <div className="w-full rounded-lg border border-purple-100 bg-white p-3 shadow-sm">

                  <div className="flex items-center gap-2">

                        {/* File Input */}
                        <input
                              ref={inputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={handleFileChange}
                              disabled={loading}
                              className="w-full cursor-pointer rounded-md border border-dashed border-purple-200 p-1 text-xs text-gray-500 file:mr-2 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-purple-700 hover:file:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                        />

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
                              Uploading image, please wait...
                        </p>
                  )}

            </div>
      );
};

export default ImageUpload;