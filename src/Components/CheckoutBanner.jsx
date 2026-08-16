import React from 'react';
import { Link } from 'react-router';
import { Left } from './Animation';

const CheckoutBanner = () => {
      return (
            <Left>
                  <div
                        className="relative w-full h-64 bg-cover bg-center flex items-center justify-center bg-gray-50"
                        style={{
                              // url("") er vitor link ta dite hobe
                              backgroundImage: `url("https://i0.wp.com/pointer.re.it/wp-content/uploads/2020/04/19366.jpg?ssl=1")`
                        }}
                  >
                        {/* Content Container */}
                        <div className="text-center">
                              <h1 className="text-4xl font-extrabold tracking-wider text-gray-900 mb-2">
                                    অর্ডার নিশ্চিত করুন
                              </h1>
                              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 font-medium">
                                    <Link to={'/store'} className="hover:text-black cursor-pointer">Home</Link>
                                    <span>&gt;</span>
                                    <span className="text-purple-900">Checkout</span>
                              </div>
                        </div>
                  </div>
            </Left>
      );
};

export default CheckoutBanner;