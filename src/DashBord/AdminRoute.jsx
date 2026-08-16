import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext"; // আপনার AuthContext এর পাথ ঠিক করে দেবেন

const AdminRoute = ({ children }) => {
      const { user, loading } = use(AuthContext);

      const adminEmail = "posakbari4u@gmail.com";
      // posakBari@623.##% 

      // "posakbari4u@gmail.com"
      // "#Posakbari@2010$"


      if (loading) {
            return <div className="text-center py-20">Loading...</div>;
      }

      // ইউজার লগইন করা থাকে এবং ইমেইল যদি নির্দিষ্ট অ্যাডমিনের সাথে মিলে
      if (user && user.email === adminEmail) {
            return children;
      }

      // অন্যথায় হোমপেজে বা লগইন পেজে রিডাইরেক্ট করে দেবেন
      return <Navigate to="/login" replace />;
};

export default AdminRoute;