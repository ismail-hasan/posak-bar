import React, { useState, useEffect, use } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import NewFooter from './NewFooter';
import MainNav from './MainNav';
import { AuthContext } from '../Context/AuthContext';
import { useQueryClient } from '@tanstack/react-query'; // ১. এটি ইমপোর্ট করুন
import axios from 'axios';
import NotFound from './NotFound';
import SpinnerLoader from './SpinnerLoader';
import Product from './Product';
import { Left, Right } from './Animation';


const ProductDetailsCard = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const { user, loading } = use(AuthContext);
      const queryClient = useQueryClient(); // ২. হুক কল করুন
      const location = useLocation()

      const [product, setProduct] = useState([]);
      // const [loading, setLoading] = useState(true);

      const [activeImage, setActiveImage] = useState("");
      const [selectedSize, setSelectedSize] = useState("");
      const [selectedColor, setSelectedColor] = useState("");
      const [quantity, setQuantity] = useState(1);

      useEffect(() => {
            fetch(`https://posak-bari-backend.vercel.app/product/${id}`)
                  .then((res) => res.json())
                  .then((data) => {
                        setProduct(data);
                        setActiveImage(data.thumbnail);
                        if (data.size && data.size.length > 0) setSelectedSize(data.size[0]);
                        if (data.color && data.color.length > 0) setSelectedColor(data.color[0]);
                        // setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Error fetching product:", err);
                        // setLoading(false);
                  });
      }, [id]);

      // ৩. Add to Cart ফাংশন
      const handleAddToCart = async () => {
            if (!user) {
                  Swal.fire({
                        icon: 'warning',
                        title: 'প্রথমে লগইন করুন!',
                        text: 'এই পণ্যটি কার্টে যোগ করতে আপনাকে লগইন করতে হবে।',
                        confirmButtonColor: '#ff4f01',
                  });
                  navigate("/register", {
                        state: {
                              from: location.pathname,
                        },
                  });
                  return;
            }

            const cartItem = {
                  productId: product._id,
                  productName: product.name,
                  price: product.discountPrice || product.price,
                  image: activeImage,
                  size: selectedSize,
                  color: selectedColor,
                  quantity: quantity,
                  totalPrice: (product.discountPrice || product.price) * quantity,
                  userName: user?.displayName || "N/A",
                  userEmail: user.email,
                  orderDate: new Date(),
                  order: false

            };

            try {
                  // আপনার ব্যাকএন্ডে কার্ট বা চেকআউট রাউটে ডেটা পাঠানো (যে রাউট আপনি ব্যবহার করছেন)
                  const res = await axios.post('https://posak-bari-backend.vercel.app/ceheckout', cartItem);

                  if (res.data) {
                        Swal.fire({
                              icon: 'success',
                              title: 'Added to Cart!',
                              text: 'Product added successfully.',
                              confirmButtonColor: '#ff4f01',
                              timer: 2000,
                              showConfirmButton: false
                        });

                        // ৪. সাথে সাথে নেভবারের কার্ট আপডেট করার জন্য query ইনভ্যালিড করুন
                        queryClient.invalidateQueries({ queryKey: ["cart"] });
                  }
            } catch (error) {
                  console.error("Error adding to cart:", error);
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add to cart. Try again!',
                        confirmButtonColor: '#ff4f01',
                  });
            }
      };

      // Buy Now বাটনে ক্লিক করলে ডাটা ব্যাকএন্ডে পাঠানোর ফাংশন
      const handleBuyNow = () => {
            if (!user) {
                  Swal.fire({
                        icon: 'warning',
                        title: 'প্রথমে লগইন করুন!',
                        text: 'এই পণ্যটি কার্টে যোগ করতে আপনাকে লগইন করতে হবে।',
                        confirmButtonColor: '#ff4f01',
                  }).then(() => {
                        navigate("/register", {
                              state: {
                                    from: location.pathname,
                              },
                        });
                  });

                  return;
            }

            const orderData = {
                  productId: product._id,
                  productName: product.name,
                  price: product.discountPrice || product.price,
                  image: activeImage,
                  size: selectedSize,
                  color: selectedColor,
                  quantity: quantity,
                  totalPrice:
                        (product.discountPrice || product.price) * quantity,
                  userName: user?.displayName || "N/A",
                  userEmail: user.email,
                  orderDate: new Date(),
                  order: false
            };

            fetch('https://posak-bari-backend.vercel.app/ceheckout', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(orderData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                  

                        queryClient.invalidateQueries({
                              queryKey: ["cart"]
                        });

                        navigate("/checkout");
                  })
                  .catch((error) => {
                        console.error("Error placing order:", error);

                        Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Failed to place order. Try again!',
                              confirmButtonColor: '#ff4f01',
                        });
                  });
      };

      if (loading) {
            return <SpinnerLoader></SpinnerLoader>
            // return <h2 className="text-center">loading....</h2>


      }

      // if (!product) {
      //       return <NotFound></NotFound>
      // }

      return (
            <div>
                  <MainNav></MainNav>

                  <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                              {/* Left: Image Gallery */}
                              <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 h-[450px] flex items-center justify-center p-4">
                                          <img
                                                src={activeImage}
                                                alt="Product Image"
                                                className="object-contain transition duration-300"
                                          />
                                    </div>

                                    {product.gallery && product.gallery.length > 0 && (
                                          <div className="flex gap-3 overflow-x-auto pb-2">
                                                {product.gallery.map((img, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => setActiveImage(img)}
                                                            className={`border-2 rounded-lg w-20 h-20 flex-shrink-0 bg-gray-50 flex items-center justify-center p-1 transition ${activeImage === img ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                                                                  }`}
                                                      >
                                                            <img src={img} alt="img" className="w-full h-full object-contain" />
                                                      </button>
                                                ))}
                                          </div>
                                    )}
                              </div>

                              {/* Right: Product Info & Actions */}
                              <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mt-3">
                                          <div className="flex items-center text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                      <FaStar
                                                            key={i}
                                                            size={14}
                                                            className="text-yellow-400"
                                                      />
                                                ))}
                                          </div>
                                          <span className="text-sm font-medium text-gray-600">
                                                ({product.reviews} reviews)
                                          </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-4 mt-4">
                                          <span className="text-3xl font-extrabold text-purple-600">
                                                ৳{product.discountPrice || product.price}
                                          </span>
                                          {product.discountPrice && product.discountPrice !== product.price && (
                                                <span className="text-red-400 line-through text-xl">
                                                      ৳{product.price}
                                                </span>
                                          )}
                                    </div>

                                    <p className="text-gray-600 mt-4 leading-relaxed">
                                          {product.description}
                                    </p>

                                    <hr className="my-6 border-gray-100" />

                                    {/* Color Selection */}
                                    {product.color && product.color.length > 0 && (
                                          <div className="mb-6">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                      Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                                                </label>
                                                <div className="flex gap-2">
                                                      {product.color.map((col, index) => (
                                                            <button
                                                                  key={index}
                                                                  onClick={() => setSelectedColor(col)}
                                                                  className={`px-4 py-2 text-sm rounded-lg border transition ${selectedColor === col
                                                                        ? 'border-black bg-black text-white font-medium'
                                                                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                                                        }`}
                                                            >
                                                                  {col}
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>
                                    )}

                                    {/* Size Selection */}
                                    {product.size && product.size.length > 0 && (
                                          <div className="mb-6">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                      Size: <span className="font-normal text-gray-500">{selectedSize}</span>
                                                </label>
                                                <div className="flex gap-3">
                                                      {product.size.map((sz, index) => (
                                                            <button
                                                                  key={index}
                                                                  onClick={() => setSelectedSize(sz)}
                                                                  className={`w-12 h-12 rounded-xl border text-sm font-semibold transition flex items-center justify-center ${selectedSize === sz
                                                                        ? 'border-black bg-black text-white shadow-md'
                                                                        : 'border-gray-200 text-gray-800 hover:border-gray-400 bg-white'
                                                                        }`}
                                                            >
                                                                  {sz}
                                                            </button>
                                                      ))}
                                                </div>
                                          </div>
                                    )}

                                    {/* Quantity & Cart Buttons */}
                                    <div className="flex items-center gap-4 mb-6">
                                          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                                                <button
                                                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                                >
                                                      -
                                                </button>
                                                <span className="px-4 py-3 font-semibold text-gray-800">{quantity}</span>
                                                <button
                                                      onClick={() => setQuantity(prev => prev + 1)}
                                                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                                >
                                                      +
                                                </button>
                                          </div>

                                          {/* Add to Cart Button */}
                                          <button
                                                onClick={handleAddToCart}
                                                className="flex-1 bg-black text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                                          >
                                                <FaShoppingCart size={16} /> কার্টে যোগ করুন
                                          </button>
                                    </div>

                                    {/* Buy It Now Button */}
                                    <button
                                          onClick={handleBuyNow}
                                          className="cursor-pointer w-full bg-purple-600 text-white py-3.5 rounded-xl font-medium hover:bg-purple-800 transition shadow-md mb-8"
                                    >
                                          অর্ডার করুন
                                    </button>

                                    {/* Extra Meta Details */}
                                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-2 text-sm text-gray-600">
                                          <div><span className="font-semibold text-gray-800">Brand:</span> {product.brand}</div>
                                          <div><span className="font-semibold text-gray-800">Category:</span> {product.category}</div>
                                          <div><span className="font-semibold text-gray-800">Material:</span> {product.material}</div>
                                          <div><span className="font-semibold text-gray-800">Printing Type:</span> {product.printing}</div>
                                          <div>
                                                <span className="font-semibold text-gray-800">Availability:</span>{" "}
                                                <span className="text-purple-600 font-medium">In Stock ({product.stock} pcs)</span>
                                          </div>
                                    </div>

                              </div>
                        </div>

                        {/* Long Description Box */}
                        {product.longDescription && (
                              <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                          পণ্যের বিস্তারিত বিবরণ
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                          {product.longDescription}
                                    </p>
                              </div>
                        )}
                  </div>





                  {product?._id && product?.category && (
                        <div className="mt-12">
                              <h3 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Related Product
                              </h3>

                              <Product
                                    category={product.category}
                                    excludeId={product._id}
                              />
                        </div>
                  )}
                  <NewFooter></NewFooter>
            </div>
      );
};

export default ProductDetailsCard;