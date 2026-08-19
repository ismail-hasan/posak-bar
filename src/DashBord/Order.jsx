import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Order = () => {
      const [orders, setOrders] = useState([]);
      const [filter, setFilter] = useState('all');
      const [loading, setLoading] = useState(true);

      // সব অর্ডার ফেচ করা
      const fetchOrders = () => {
            fetch('https://posak-bari-backend.vercel.app/order')
                  .then(res => res.json())
                  .then(data => {
                        setOrders(data);
                        setLoading(false);
                  })
                  .catch(err => {
                        console.error("Error fetching orders:", err);
                        setLoading(false);
                  });
      };

      useEffect(() => {
            fetchOrders();
      }, []);

      // অর্ডার স্ট্যাটাস আপডেট করার ফাংশন (Processing / Complete / Cancelled)
      const handleStatusUpdate = (id, newStatus) => {
            fetch(`https://posak-bari-backend.vercel.app/order/${id}`, {
                  method: 'PATCH',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ status: newStatus }),
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.modifiedCount > 0 || data.success) {
                              Swal.fire({
                                    icon: 'success',
                                    title: `Order marked as ${newStatus}!`,
                                    showConfirmButton: false,
                                    timer: 1500,
                              });

                              fetchOrders();

                              // Cancel করলে Cancelled tab-এ চলে যাবে
                              if (newStatus === 'cancelled') {
                                    setFilter('cancelled');
                              }

                              if (newStatus === 'processing') {
                                    setFilter('processing');
                              }

                              if (newStatus === 'complete') {
                                    setFilter('complete');
                              }
                        }
                  })
                  .catch(err => console.error("Error updating status:", err));
      };

      // অর্ডার ডিলিট করার ফাংশন
      const handleDelete = (id) => {
            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`https://posak-bari-backend.vercel.app/order/${id}`, {
                              method: 'DELETE',
                        })
                              .then(res => res.json())
                              .then(data => {
                                    if (data.deletedCount > 0) {
                                          Swal.fire(
                                                "Deleted!",
                                                "Order has been deleted.",
                                                "success"
                                          );

                                          setOrders(
                                                orders.filter(
                                                      order => order._id !== id
                                                )
                                          );
                                    }
                              })
                              .catch(err =>
                                    console.error("Error deleting order:", err)
                              );
                  }
            });
      };

      // ট্যাব অনুযায়ী অর্ডার ফিল্টার করা
      const filteredOrders = orders.filter(order => {
            const status = order.status?.toLowerCase();

            // All
            if (filter === 'all') return true;

            // Pending:
            // status না থাকলেও Pending হিসেবে ধরা হবে
            if (filter === 'pending') {
                  return !status || status === 'pending';
            }

            // Cancelled
            if (filter === 'cancelled') {
                  return status === 'cancelled';
            }

            // Processing / Complete
            return status === filter.toLowerCase();
      });

      // বিভিন্ন ক্যাটাগরির কাউন্ট হিসাব করা
      const totalCount = orders.length;

      // যেসব order-এর status নেই বা pending, সেগুলো Pending
      const pendingCount = orders.filter(order => {
            const status = order.status?.toLowerCase();
            return !status || status === 'pending';
      }).length;

      const processingCount = orders.filter(
            order => order.status?.toLowerCase() === 'processing'
      ).length;

      const completeCount = orders.filter(
            order => order.status?.toLowerCase() === 'complete'
      ).length;

      const cancelledCount = orders.filter(
            order => order.status?.toLowerCase() === 'cancelled'
      ).length;

      if (loading) {
            return (
                  <div className="text-center py-20">
                        Loading orders...
                  </div>
            );
      }

      return (
            <div className="max-w-7xl mx-auto px-4 py-8">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                        <div>
                              <h2 className="text-3xl font-bold text-gray-800">
                                    Online Store Order Management
                              </h2>

                              <p className="text-sm text-gray-500 mt-1">
                                    Total Orders Found:{' '}
                                    <span className="font-semibold text-purple-900">
                                          {totalCount}
                                    </span>
                              </p>
                        </div>
                  </div>

                  {/* Tabs Section with Count Badges */}
                  <div className="flex flex-wrap gap-3 mb-6 border-b pb-4">

                        {[
                              {
                                    key: 'all',
                                    label: 'All Orders',
                                    count: totalCount
                              },
                              {
                                    key: 'pending',
                                    label: 'Pending',
                                    count: pendingCount
                              },
                              {
                                    key: 'processing',
                                    label: 'Processing',
                                    count: processingCount
                              },
                              {
                                    key: 'complete',
                                    label: 'Completed',
                                    count: completeCount
                              },
                              {
                                    key: 'cancelled',
                                    label: 'Cancelled',
                                    count: cancelledCount
                              }
                        ].map((tab) => (
                              <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={`px-5 py-2 rounded-lg font-semibold capitalize transition flex items-center gap-2 ${filter === tab.key
                                                ? 'bg-purple-900 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                          }`}
                              >
                                    <span>{tab.label}</span>

                                    <span
                                          className={`text-xs px-2 py-0.5 rounded-full ${filter === tab.key
                                                      ? 'bg-purple-800 text-white'
                                                      : 'bg-gray-200 text-gray-700'
                                                }`}
                                    >
                                          {tab.count}
                                    </span>
                              </button>
                        ))}

                  </div>

                  {/* Orders Table */}
                  {filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border">
                              No orders found for "{filter}".
                        </div>
                  ) : (
                        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">

                              <table className="w-full text-left border-collapse">

                                    <thead>
                                          <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-sm uppercase">

                                                <th className="py-4 px-6">
                                                      Product
                                                </th>

                                                <th className="py-4 px-6">
                                                      Customer
                                                </th>

                                                <th className="py-4 px-6">
                                                      Total
                                                </th>

                                                <th className="py-4 px-6">
                                                      Status
                                                </th>

                                                <th className="py-4 px-6 text-center">
                                                      Actions
                                                </th>

                                          </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 text-sm text-gray-600">

                                          {filteredOrders.map((order) => {

                                                const firstItem =
                                                      order.items?.[0] || {};

                                                const orderStatus =
                                                      order.status?.toLowerCase();

                                                // Complete হলে status button disable হবে
                                                const isCompleted =
                                                      orderStatus === 'complete';

                                                // Cancelled হলে সব status button disable হবে
                                                const isCancelled =
                                                      orderStatus === 'cancelled';

                                                return (
                                                      <tr
                                                            key={order._id}
                                                            className="hover:bg-gray-50 transition"
                                                      >

                                                            {/* Product */}
                                                            <td className="py-4 px-6">

                                                                  <div className="flex items-center gap-3">

                                                                        <img
                                                                              src={
                                                                                    firstItem.image ||
                                                                                    "https://via.placeholder.com/150"
                                                                              }
                                                                              alt={
                                                                                    firstItem.productName
                                                                              }
                                                                              className="w-12 h-12 object-cover rounded-lg border"
                                                                        />

                                                                        <div>

                                                                              <p className="font-semibold text-gray-800">
                                                                                    {firstItem.productName ||
                                                                                          "Product"}
                                                                              </p>

                                                                              <p className="text-xs text-gray-400">
                                                                                    Qty:{' '}
                                                                                    {firstItem.quantity ||
                                                                                          1}{' '}

                                                                                    {order.items?.length >
                                                                                          1 &&
                                                                                          `(+${order.items.length - 1} more)`}
                                                                              </p>

                                                                        </div>

                                                                  </div>

                                                            </td>

                                                            {/* Customer */}
                                                            <td className="py-4 px-6">

                                                                  <p className="font-medium text-gray-800">
                                                                        {order.customer?.name ||
                                                                              "N/A"}
                                                                  </p>

                                                                  <p className="text-xs text-gray-500">
                                                                        {order.customer?.email}
                                                                  </p>

                                                                  <p className="text-xs text-gray-400">
                                                                        {order.customer?.phone}
                                                                  </p>

                                                            </td>

                                                            {/* Grand Total */}
                                                            <td className="py-4 px-6 font-bold text-amber-600">
                                                                  ৳{order.grandTotal}
                                                            </td>

                                                            {/* Status */}
                                                            <td className="py-4 px-6">

                                                                  <span
                                                                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${orderStatus ===
                                                                                    'complete'
                                                                                    ? 'bg-green-100 text-green-700'
                                                                                    : orderStatus ===
                                                                                          'processing'
                                                                                          ? 'bg-blue-100 text-blue-700'
                                                                                          : orderStatus ===
                                                                                                'cancelled'
                                                                                                ? 'bg-red-100 text-red-700'
                                                                                                : 'bg-yellow-100 text-yellow-700'
                                                                              }`}
                                                                  >
                                                                        {order.status ||
                                                                              'Pending'}
                                                                  </span>

                                                            </td>

                                                            {/* Actions */}
                                                            <td className="py-4 px-6 text-center">

                                                                  <div className="flex items-center justify-center gap-2">

                                                                        {/* Processing */}
                                                                        <button
                                                                              onClick={() =>
                                                                                    handleStatusUpdate(
                                                                                          order._id,
                                                                                          'processing'
                                                                                    )
                                                                              }
                                                                              disabled={
                                                                                    isCompleted ||
                                                                                    isCancelled
                                                                              }
                                                                              className={`px-3 py-1.5 rounded text-xs font-medium transition ${isCompleted ||
                                                                                          isCancelled
                                                                                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                                          : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                                                                                    }`}
                                                                        >
                                                                              Processing
                                                                        </button>

                                                                        {/* Complete */}
                                                                        <button
                                                                              onClick={() =>
                                                                                    handleStatusUpdate(
                                                                                          order._id,
                                                                                          'complete'
                                                                                    )
                                                                              }
                                                                              disabled={
                                                                                    isCompleted ||
                                                                                    isCancelled
                                                                              }
                                                                              className={`px-3 py-1.5 rounded text-xs font-medium transition ${isCompleted ||
                                                                                          isCancelled
                                                                                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                                          : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                                                                                    }`}
                                                                        >
                                                                              Complete
                                                                        </button>

                                                                        {/* Cancel */}
                                                                        <button
                                                                              onClick={() =>
                                                                                    handleStatusUpdate(
                                                                                          order._id,
                                                                                          'cancelled'
                                                                                    )
                                                                              }
                                                                              disabled={
                                                                                    isCancelled ||
                                                                                    isCompleted
                                                                              }
                                                                              className={`px-3 py-1.5 rounded text-xs font-medium transition ${isCancelled ||
                                                                                          isCompleted
                                                                                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                                          : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                                                                                    }`}
                                                                        >
                                                                              Cancel
                                                                        </button>

                                                                        {/* Delete - সবসময় active */}
                                                                        <button
                                                                              onClick={() =>
                                                                                    handleDelete(
                                                                                          order._id
                                                                                    )
                                                                              }
                                                                              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition cursor-pointer"
                                                                        >
                                                                              Delete
                                                                        </button>

                                                                  </div>

                                                            </td>

                                                      </tr>
                                                );
                                          })}

                                    </tbody>

                              </table>

                        </div>
                  )}

            </div>
      );
};

export default Order;