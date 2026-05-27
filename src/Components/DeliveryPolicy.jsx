import { Link } from "react-router";

const DeliveryPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">

      <div className="border-4 p-8 rounded-4xl border-green-700 flex flex-col items-center">

        <h4 className="max-w-[900px] text-center text-blue-700 text-[18px] md:text-[22px] leading-10 font-medium">
          কাঙ্ক্ষিত কোটেশন কনফার্ম হলে (প্রোডাকশন রানিং বাবদ) কোটেশন অনুযায়ী মোট টাকার ৭৫% আমাদের অফিসিয়াল ORDER FORM এর মাধ্যমে অগ্রীম পেমেন্ট করে অর্ডারটি কনফার্ম করতে হবে। নির্ধারিত সময়ে প্রোডাক্ট কমপ্লিট হলে অগ্রীম বাবদ ৭৫% টাকা থেকে ৫০% টাকার সম-মূল্যের প্রোডাক্ট চালান-বিল সহ প্রথম ধাপে ডেলিভারি দেওয়া হবে। বাকি টাকা ORDER FORM এ পুনঃস্বাক্ষর এর মাধ্যমে পরিশোধ করিতে হবে। তারপর দ্বিতীয় ধাপে অবশিষ্ট প্রোডাক্ট পুনরায় ডেলিভারি সম্পন্ন করা হবে।
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

export default DeliveryPolicy;