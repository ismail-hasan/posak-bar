import React, { useEffect, useState } from "react";
import ProductCard from "./ProductDetails";
import { Bottom } from "./Animation";
import { useSearchParams } from "react-router";

const API_URL = "https://posak-bari-backend.vercel.app/product";

const Product = ({ category, excludeId, limit, offset = 0 }) => {
      const [searchParams] = useSearchParams();

      // ==========================================
      // URL থেকে category নেওয়া
      //
      // /product?category=Leather
      //
      // categoryFromUrl = "Leather"
      // ==========================================
      const categoryFromUrl = searchParams.get("category");

      // Prop category থাকলে সেটা priority পাবে
      // না থাকলে URL-এর category ব্যবহার হবে
      const selectedCategory = categoryFromUrl || category;

      const [products, setProducts] = useState([]);
      const [productLoading, setProductLoading] = useState(true);

      useEffect(() => {
            const fetchProducts = async () => {
                  try {
                        setProductLoading(true);

                        // ==========================================
                        // BACKEND URL
                        //
                        // Category থাকলে:
                        // /product?category=Leather
                        //
                        // Category না থাকলে:
                        // /product
                        // ==========================================

                        const url = selectedCategory
                              ? `${API_URL}?category=${encodeURIComponent(
                                    selectedCategory
                              )}`
                              : API_URL;


                        const response = await fetch(url);

                        if (!response.ok) {
                              throw new Error("Failed to fetch products");
                        }

                        const data = await response.json();

                        let filteredProducts = Array.isArray(data)
                              ? [...data]
                              : [];

                        // ==========================================
                        // EXCLUDE CURRENT PRODUCT
                        // ==========================================

                        if (excludeId) {
                              filteredProducts =
                                    filteredProducts.filter(
                                          (item) =>
                                                String(item._id) !==
                                                String(excludeId)
                                    );
                        }

                        // ==========================================
                        // LATEST PRODUCT FIRST
                        // ==========================================

                        filteredProducts.sort((a, b) =>
                              String(b._id).localeCompare(String(a._id))
                        );

                        // ==========================================
                        // OFFSET
                        // ==========================================

                        if (offset > 0) {
                              filteredProducts =
                                    filteredProducts.slice(offset);
                        }

                        // ==========================================
                        // LIMIT
                        // ==========================================

                        if (limit) {
                              filteredProducts =
                                    filteredProducts.slice(0, limit);
                        }

                        setProducts(filteredProducts);
                  } catch (error) {
                        console.error(
                              "Product fetch error:",
                              error
                        );

                        setProducts([]);
                  } finally {
                        setProductLoading(false);
                  }
            };

            fetchProducts();
      }, [
            selectedCategory,
            excludeId,
            limit,
            offset,
      ]);

      // ==========================================
      // LOADING
      // ==========================================

      if (productLoading) {
            return (
                  <h2 className="py-10 text-center">
                        loading....
                  </h2>
            );
      }

      // ==========================================
      // NO PRODUCT
      // ==========================================

      if (!products.length) {
            return (
                  <div className="py-10 text-center">

                        <p className="text-gray-500">
                              {selectedCategory
                                    ? `"${selectedCategory}" category-তে কোনো product পাওয়া যায়নি।`
                                    : "No products found."}
                        </p>

                  </div>
            );
      }

      // ==========================================
      // PRODUCTS
      // ==========================================

      return (
            <Bottom className="w-full">

                  <div className="mx-auto max-w-6xl">

                        {/* Category name চাইলে দেখাবে */}

                        {selectedCategory && (
                              <div className="mb-6 px-4">

                                    <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                          {selectedCategory}
                                    </h2>

                              </div>
                        )}

                        <div className="mb-10 grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                              {products.map((product) => (

                                    <ProductCard
                                          key={product._id}
                                          product={product}
                                    />

                              ))}

                        </div>

                  </div>

            </Bottom>
      );
};

export default Product;