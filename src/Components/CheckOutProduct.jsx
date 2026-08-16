import React, { useState, useEffect, use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Left, Right } from './Animation';

const CheckOutProduct = () => {
      const { user } = use(AuthContext);
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const useNavigateHook = useNavigate();

      // শিপিং বা ফর্মের স্টেট
      const [formData, setFormData] = useState({
            name: user?.displayName || '',
            email: user?.email || '',
            phone: '',
            address: '',
            city: '',
            deliveryType: 'home',
            status: 'pending'
      });

      useEffect(() => {
            if (user?.email) {
                  fetch(`https://posak-bari-backend.vercel.app/ceheckout?email=${user.email}`)
                        .then(res => res.json())
                        .then(data => {
                              const activeOrders = Array.isArray(data)
                                    ? data.filter(order => !order.order)
                                    : [];

                              setOrders(activeOrders);
                              setLoading(false);
                        })
                        .catch(err => {
                              console.error("Error fetching orders:", err);
                              setLoading(false);
                        });
            }
      }, [user]);

      // ইনপুট ফিল্ড হ্যান্ডলার
      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
      };

      // মোট কয়টি প্রোডাক্ট বা আইটেম আছে তার হিসাব
      const totalQuantity = orders.reduce(
            (total, order) => total + (order.quantity || 0),
            0
      );

      // সব প্রোডাক্টের totalPrice যোগ করে Sub Total হিসাব করা
      const subTotal = orders.reduce(
            (total, order) => total + (order.totalPrice || 0),
            0
      );

      // ডেলিভারি চার্জ নির্ধারণ
      const deliveryCharge = formData.deliveryType === 'home' ? 100 : 0;
      const grandTotal = subTotal;

      // অর্ডার ডিলিট করার ফাংশন
      const handleDelete = (id) => {
            Swal.fire({
                  title: "Are you sure?",
                  text: "You want to delete this order from your cart?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ff4f01",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                  if (result.isConfirmed) {
                        axios
                              .delete(`https://posak-bari-backend.vercel.app/ceheckout/${id}`)
                              .then(res => {
                                    if (res.data.deletedCount > 0 || res.data.success) {
                                          const remainingOrders = orders.filter(
                                                order => order._id !== id
                                          );

                                          setOrders(remainingOrders);

                                          Swal.fire({
                                                title: "Deleted!",
                                                text: "Your order has been deleted.",
                                                icon: "success",
                                                timer: 2000,
                                                showConfirmButton: false
                                          });
                                    }
                              })
                              .catch(err => {
                                    console.error("Error deleting order:", err);

                                    Swal.fire({
                                          icon: "error",
                                          title: "Oops...",
                                          text: "Failed to delete the order. Try again!",
                                          confirmButtonColor: "#ff4f01",
                                    });
                              });
                  }
            });
      };

      // ফাইনাল প্লেস অর্ডার হ্যান্ডলার
      const handlePlaceOrder = (e) => {
            e.preventDefault();

            if (orders.length === 0) {
                  Swal.fire("Error", "Your cart is empty!", "error");
                  return;
            }

            const orderData = {
                  customer: formData,
                  items: orders,
                  subTotal,
                  deliveryCharge,
                  grandTotal,
                  orderDate: new Date(),
            };

            axios
                  .post('https://posak-bari-backend.vercel.app/order', orderData)
                  .then(res => {
                        if (res.data.insertedId || res.data.success) {
                              axios
                                    .patch(
                                          `https://posak-bari-backend.vercel.app/ceheckout/${user.email}`,
                                          formData
                                    )
                                    .then(() => {
                                          Swal.fire({
                                                title: "অর্ডার সফলভাবে সম্পন্ন হয়েছে!",
                                                text: "আমাদের কাছ থেকে কেনাকাটা করার জন্য আপনাকে ধন্যবাদ।.",
                                                icon: "success",
                                                confirmButtonColor: "#ff4f01"
                                          }).then(() => {
                                                useNavigateHook('/product');
                                          });
                                    });
                        }
                  })
                  .catch(err => {
                        console.error("Error placing order:", err);

                        Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Failed to place the order. Please try again!",
                              confirmButtonColor: "#ff4f01",
                        });
                  });
      };

      if (loading) {
            return (
                  <div className="text-center py-20">
                        Loading orders...
                  </div>
            );
      }

      return (
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-12">

                  <Right className="text-xl md:text-2xl font-bold mb-6 text-purple-800">
                        অর্ডারের পণ্যসমূহ
                  </Right>

                  {orders.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border">
                              No orders found!
                        </div>
                  ) : (
                        <Left>

                              {/* ================= TABLE SECTION ================= */}
                              <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200 mb-8">
                                    <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">

                                          <thead>
                                                <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-xs md:text-sm uppercase">
                                                      <th className="py-3 px-3 md:py-4 md:px-6">
                                                            Product
                                                      </th>

                                                      <th className="py-3 px-3 md:py-4 md:px-6">
                                                            Details
                                                      </th>

                                                      <th className="py-3 px-3 md:py-4 md:px-6">
                                                            Price
                                                      </th>

                                                      <th className="py-3 px-3 md:py-4 md:px-6">
                                                            Quantity
                                                      </th>

                                                      <th className="py-3 px-3 md:py-4 md:px-6">
                                                            Total Price
                                                      </th>

                                                      <th className="py-3 px-3 md:py-4 md:px-6 text-center">
                                                            Action
                                                      </th>
                                                </tr>
                                          </thead>

                                          <tbody className="divide-y divide-gray-200 text-xs md:text-sm text-gray-600">

                                                {orders.map((order) => (
                                                      <tr
                                                            key={order._id}
                                                            className="hover:bg-gray-50 transition"
                                                      >

                                                            <td className="py-3 px-3 md:py-4 md:px-6 flex items-center gap-3">
                                                                  <img
                                                                        src={order.image}
                                                                        alt={order.productName}
                                                                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover rounded-lg border border-gray-200 shrink-0"
                                                                  />

                                                                  <span className="font-semibold text-gray-800 line-clamp-2">
                                                                        {order.productName}
                                                                  </span>
                                                            </td>

                                                            <td className="py-3 px-3 md:py-4 md:px-6 whitespace-nowrap">
                                                                  <div>
                                                                        <span className="font-medium">
                                                                              Size:
                                                                        </span>{' '}
                                                                        {order.size || "N/A"}
                                                                  </div>

                                                                  <div>
                                                                        <span className="font-medium">
                                                                              Color:
                                                                        </span>{' '}
                                                                        {order.color || "N/A"}
                                                                  </div>
                                                            </td>

                                                            <td className="py-3 px-3 md:py-4 md:px-6 font-medium text-gray-800 whitespace-nowrap">
                                                                  ৳{order.price}
                                                            </td>

                                                            <td className="py-3 px-3 md:py-4 md:px-6 whitespace-nowrap">
                                                                  {order.quantity}
                                                            </td>

                                                            <td className="py-3 px-3 md:py-4 md:px-6 font-bold text-purple-800 whitespace-nowrap">
                                                                  ৳{order.totalPrice}
                                                            </td>

                                                            <td className="py-3 px-3 md:py-4 md:px-6 text-center whitespace-nowrap">
                                                                  <button
                                                                        onClick={() => handleDelete(order._id)}
                                                                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-xl transition duration-200 cursor-pointer shadow-sm inline-flex items-center justify-center"
                                                                        title="Delete Order"
                                                                  >
                                                                        <FaTrash size={14} />
                                                                  </button>
                                                            </td>

                                                      </tr>
                                                ))}

                                          </tbody>

                                          <tfoot className="bg-gray-50 border-t border-gray-200">
                                                <tr>
                                                      <td
                                                            colSpan="6"
                                                            className="py-3 px-3 md:py-4 md:px-6 font-semibold text-gray-700 text-xs md:text-sm"
                                                      >
                                                            কার্টে মোট পণ্য: {' '}
                                                            <span className="text-[#ff4f01]">
                                                                  {totalQuantity}
                                                            </span>
                                                      </td>
                                                </tr>
                                          </tfoot>

                                    </table>
                              </div>


                              {/* ================= BOTTOM SECTION ================= */}
                              <form
                                    onSubmit={handlePlaceOrder}
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
                              >

                                    {/* ================= SHIPPING FORM ================= */}
                                    <div className="lg:col-span-2 bg-white p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 shadow-md">

                                          <h3 className="text-lg md:text-xl font-bold text-purple-800 mb-4 md:mb-6 border-b pb-3">

                                                শিপিং তথ্য
                                          </h3>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                                {/* Name */}
                                                <div>
                                                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                                            আপনার নাম *
                                                      </label>

                                                      <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            required
                                                            placeholder="Enter your name"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-sm focus:outline-none focus:border-[#ff4f01]"
                                                      />
                                                </div>


                                                {/* Email */}
                                                <div>
                                                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                                            ইমেইল এড্রেস *
                                                      </label>

                                                      <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            required
                                                            readOnly
                                                            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-sm text-gray-500 focus:outline-none"
                                                      />
                                                </div>


                                                {/* Phone */}
                                                <div>
                                                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                                            মোবাইল নাম্বার *
                                                      </label>

                                                      <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            required
                                                            placeholder="Enter phone number"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-sm focus:outline-none focus:border-[#ff4f01]"
                                                      />
                                                </div>


                                                {/* City */}
                                                <div>
                                                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                                            ডেলিভারি এরিয়া *
                                                      </label>

                                                      <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            required
                                                            placeholder="e.g. Dhaka"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-sm focus:outline-none focus:border-[#ff4f01]"
                                                      />
                                                </div>


                                                {/* Address */}
                                                <div className="sm:col-span-2">
                                                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                                            সম্পূর্ণ ঠিকানা *
                                                      </label>

                                                      <textarea
                                                            name="address"
                                                            rows="3"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                            required
                                                            placeholder="House no, Road, Area, etc."
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-sm focus:outline-none focus:border-[#ff4f01]"
                                                      ></textarea>
                                                </div>


                                                {/* Delivery Type */}
                                                <div className="sm:col-span-2 mt-2">
                                                      <label className="mb-2 block text-xs font-medium text-gray-700 md:text-sm">
                                                            ডেলিভারি টাইপ
                                                      </label>

                                                      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                                                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                                                                  <input required
                                                                        type="radio"
                                                                        name="deliveryType"
                                                                        value="store"
                                                                        checked={formData.deliveryType === "store"}
                                                                        onChange={handleInputChange}
                                                                        className="h-4 w-4 cursor-pointer accent-[#ff4f01]"
                                                                  />

                                                                  <span>Cash On Delivery (COD)</span>
                                                            </label>
                                                      </div>

                                                      {/* COD Message */}
                                                      {formData.deliveryType === "store" && (
                                                            <p className="mt-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-medium leading-6 text-orange-700">
                                                                  *** পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করবেন। ***
                                                            </p>
                                                      )}
                                                </div>


                                          </div>
                                    </div>


                                    {/* ================= CART TOTALS ================= */}
                                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 shadow-md h-fit space-y-4">

                                          <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-3">
                                                অর্ডার সামারি    ({totalQuantity})
                                          </h3>

                                          <div className="flex justify-between items-center text-sm text-gray-600">
                                                <span>সাবটোটাল</span>

                                                <span className="font-medium text-gray-800">
                                                      ৳{subTotal}
                                                </span>
                                          </div>

                                          {/* <div className="flex justify-between items-center text-sm text-gray-600">
                                                <span>Delivery Charge</span>

                                                <span className="font-medium text-gray-800">
                                                      ৳{deliveryCharge}
                                                </span>
                                          </div> */}

                                          <hr className="border-gray-100" />

                                          <div className="flex justify-between items-center text-base font-bold text-gray-800">
                                                <span>টোটাল</span>

                                                <span className="text-lg md:text-xl text-[#ff4f01]">
                                                      ৳{grandTotal}
                                                </span>
                                          </div>

                                          <button
                                                type="submit"
                                                className="w-full bg-purple-700 text-white py-3 md:py-3.5 rounded-xl font-medium hover:bg-purple-800 transition shadow-md cursor-pointer mt-4"
                                          >
                                                অর্ডার করুন
                                          </button>


                                    </div>

                              </form>

                        </Left>
                  )}

            </div>
      );
};

export default CheckOutProduct;