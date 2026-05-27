import { Link } from "react-router";

const ReturnPolicy = () => {
      return (

            <div className="min-h-screen flex flex-col justify-center items-center px-6">

                  <div className="border-4 p-8 rounded-4xl border-green-700 flex flex-col items-center">

                        <h4 className="max-w-[900px] text-center text-blue-700 text-[18px] md:text-[22px] leading-10 font-medium">
                              পণ্য রিসিভ করার সময় রিজেক্ট/বুকিং মিস্টেক হলে রিটার্ন নেওয়া হয়। অন্যথায় বিক্রিত মাল রিটার্ন নেওয়া হয় না। তাই ভালোভাবে চেক করে পণ্য রিসিভ করুন।
                        </h4>

                        <Link
                              to="/"
                              className="mt-10 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 duration-300"
                        >
                              Back To Home
                        </Link>

                  </div>

            </div>
      );
};

export default ReturnPolicy;