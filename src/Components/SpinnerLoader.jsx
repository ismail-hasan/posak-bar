import React from 'react';

const SpinnerLoader = () => {
      return (
            <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50 min-h-screen">
                  <div className="flex flex-col items-center justify-center">
                        {/* ছোট সাইজের স্পিনার রিং */}
                        <div className="w-8 h-8 border-3 border-gray-200 border-t-[#ff4f01] rounded-full animate-spin"></div>
                        {/* ছোট টেক্সট */}
                        <p className="mt-2 text-gray-500 font-medium text-xs">
                              Loading...
                        </p>
                  </div>
            </div>
      );
};

export default SpinnerLoader;