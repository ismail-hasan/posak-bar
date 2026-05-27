import { Link } from "react-router";

const OrderPolicy = () => {
      return (
            <div className="min-h-screen flex flex-col justify-center items-center px-6">

                  <div className="border-4 p-8 rounded-4xl border-green-700 flex flex-col items-center">

                        <h4 className="max-w-[900px] text-center text-blue-700 text-[18px] md:text-[22px] leading-10 font-medium">
                              আমরা মূলত দুই ভাগে অর্ডার গ্রহন করে থাকি। ১. অনলাইন। ২. সরাসরি।
                              উভয় ক্ষেত্রে আপনার পছন্দের ডিজাইন/চাহিদার বিস্তারিত সরাসরি/অনলাইনে
                              আমাদের প্রতিষ্ঠানের সাথে শেয়ার করুন। আপনার চাহিদা অনুসারে আমাদের টিম
                              প্রোডাক্ট সোর্সিং করে কোটেশন প্রদান করবে অবশ্যই প্রদানকৃত কোটেশন পাচ (৫)
                              কর্ম দিবসের মধ্যে কনফার্ম করতে হবে অন্যথায় বাতিল বলে গণ্য হবে।
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

export default OrderPolicy;