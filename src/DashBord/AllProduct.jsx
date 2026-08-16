import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AllProduct = () => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [activeCategory, setActiveCategory] = useState('All');

      // 1. Fetch Products from Database
      useEffect(() => {
            fetchProducts();
      }, []);

      const fetchProducts = () => {
            fetch("https://posak-bari-backend.vercel.app/product")
                  .then(res => res.json())
                  .then(data => {
                        setProducts(data);
                        setLoading(false);
                  })
                  .catch(err => {
                        console.error("Error fetching products:", err);
                        setLoading(false);
                  });
      };

      // 2. Delete Product Handler
      // 2. Delete Product Handler
      const handleDelete = (id) => {
            Swal.fire({
                  title: 'Are you sure?',
                  text: "You want to delete this product?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#7e22ce',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                  if (result.isConfirmed) {
                        // ব্যাকএন্ডের রাউটের সাথে মিল রেখে এখানে /product/${id} দেওয়া হয়েছে
                        fetch(`https://posak-bari-backend.vercel.app/product/${id}`, {
                              method: 'DELETE',
                        })
                              .then(res => res.json())
                              .then(data => {
                                    if (data.deletedCount > 0) {
                                          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                                          setProducts(products.filter(item => item._id !== id && item.id !== id));
                                    } else {
                                          Swal.fire('Notice', 'Product already deleted or not found.', 'info');
                                    }
                              })
                              .catch(err => console.error("Delete error:", err));
                  }
            });
      };



      // ক্যাটাগরি লিস্ট ডাইনামিক করা
      const categories = ['All', ...new Set(products.map(item => item.category))];

      // ফিল্টার করা প্রোডাক্ট
      const filteredProducts = activeCategory === 'All'
            ? products
            : products.filter(item => item.category === activeCategory);

      if (loading) {
            return <div className="text-center py-10 text-purple-900 font-semibold">Loading products...</div>;
      }

      return (
            <div className="max-w-7xl mx-auto bg-white border border-purple-100 rounded-2xl p-4 sm:p-6 shadow-xl shadow-purple-50">

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
                        <div>
                              <h2 className="text-2xl font-extrabold text-purple-900 tracking-wide">সকল পণ্য</h2>
                              <p className="text-gray-500 text-sm mt-1">আপনার স্টোরের পণ্য, ক্যাটাগরি ও ইনভেন্টরি পরিচালনা করুন।</p>
                        </div>
                        <div className="text-sm font-semibold text-purple-700 bg-purple-50 px-4 py-2 rounded-xl border border-purple-100 whitespace-nowrap">
                              Total Products: {products.length}
                        </div>
                  </div>

                  {/* Category Tabs (Horizontal Scrollable on mobile) */}
                  <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 overflow-x-auto scrollbar-none">
                        {categories.map((cat) => (
                              <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-xl font-semibold text-sm transition shadow-sm whitespace-nowrap ${activeCategory === cat
                                          ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-amber-500/20'
                                          : 'bg-purple-50/60 text-purple-900 hover:bg-purple-100/60 border border-purple-100'
                                          }`}
                              >
                                    {cat}
                              </button>
                        ))}
                  </div>

                  {/* Products Table with Responsive Min-Width */}
                  <div className="overflow-x-auto rounded-xl border border-purple-100 shadow-sm">
                        <table className="w-full text-left border-collapse min-w-[750px]">
                              <thead>
                                    <tr className="bg-purple-900 text-white text-xs sm:text-sm uppercase tracking-wider">
                                          <th className="py-3.5 px-4 w-[35%]">Image & Name</th>
                                          <th className="py-3.5 px-4 w-[20%]">Category</th>
                                          <th className="py-3.5 px-4 w-[15%]">Price</th>
                                          <th className="py-3.5 px-4 w-[15%]">Stock</th>
                                          <th className="py-3.5 px-4 w-[15%] text-center">Actions</th>
                                    </tr>
                              </thead>
                              <tbody className="divide-y divide-purple-50 bg-white">
                                    {filteredProducts.length > 0 ? (
                                          filteredProducts.main || filteredProducts.map((product) => (
                                                <tr key={product._id || product.id} className="hover:bg-purple-50/40 transition">
                                                      {/* Image & Name Column with proper container */}
                                                      <td className="py-3 px-4">
                                                            <div className="flex items-center gap-3">
                                                                  <img
                                                                        src={product.thumbnail}
                                                                        alt={product.name}
                                                                        className="w-12 h-12 min-w-[48px] object-cover rounded-lg border border-purple-200 shadow-sm"
                                                                  />
                                                                  <div className="overflow-hidden">
                                                                        <p className="font-bold text-gray-800 text-sm truncate max-w-[200px] sm:max-w-xs" title={product.name}>
                                                                              {product.name}
                                                                        </p>
                                                                        <p className="text-xs text-gray-400 truncate">Brand: {product.brand}</p>
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      {/* Category */}
                                                      <td className="py-3 px-4 text-sm font-medium text-purple-800">
                                                            <span className="bg-purple-100 text-purple-900 px-2.5 py-1 rounded-md text-xs font-semibold inline-block">
                                                                  {product.category}
                                                            </span>
                                                      </td>

                                                      {/* Price */}
                                                      <td className="py-3 px-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                                                            ৳{product.price}
                                                            {product.discountPrice > 0 && (
                                                                  <span className="text-xs text-amber-600 ml-1.5 line-through font-normal">
                                                                        ৳{product.discountPrice}
                                                                  </span>
                                                            )}
                                                      </td>

                                                      {/* Stock */}
                                                      <td className="py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                                            <span className={`px-2 py-1 rounded text-xs ${product.stock > 5 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                                                  {product.stock} pcs
                                                            </span>
                                                      </td>

                                                      {/* Actions */}
                                                      <td className="py-3 px-4 text-center whitespace-nowrap">
                                                            <div className="flex items-center justify-center gap-2">

                                                                  <button
                                                                        onClick={() => handleDelete(product._id || product.id)}
                                                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition border border-red-200 shadow-sm"
                                                                        title="Delete Product"
                                                                  >
                                                                        <FiTrash2 className="text-base" />
                                                                  </button>
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))
                                    ) : (
                                          <tr>
                                                <td colSpan="5" className="text-center py-10 text-gray-400 text-sm">
                                                      No products found in this category.
                                                </td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </div>

            </div>
      );
};

export default AllProduct;