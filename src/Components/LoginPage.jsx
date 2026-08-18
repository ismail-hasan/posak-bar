import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext";

const LoginPage = () => {
      const { loginUser } = use(AuthContext);

      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from || "/store";

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors, isSubmitting },
      } = useForm();

      const handleLogin = async (data) => {
            try {
                  const result = await loginUser(
                        data.email,
                        data.password
                  );


                  reset();

                  navigate(from, { replace: true });
            } catch (error) {
                  console.error("Login error:", error);

                  if (error.code === "auth/invalid-credential") {
                        alert("Email অথবা Password ভুল!");
                  } else if (error.code === "auth/user-not-found") {
                        alert("এই Email দিয়ে কোনো Account পাওয়া যায়নি!");
                  } else if (error.code === "auth/wrong-password") {
                        alert("Password ভুল!");
                  } else if (error.code === "auth/invalid-email") {
                        alert("সঠিক Email Address দিন!");
                  } else {
                        alert("Login failed. আবার চেষ্টা করুন!");
                  }
            }
      };

      return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">

                  <div className="max-w-md w-full bg-white border border-purple-200 rounded-2xl p-8 shadow-xl shadow-purple-100">

                        {/* Header Section */}
                        <div className="text-center mb-8">
                              <h2 className="text-3xl font-extrabold text-purple-900 tracking-wide">
                                    আপনাকে স্বাগতম
                              </h2>

                              <p className="text-gray-500 text-sm mt-2">
                                    আপনার অ্যাকাউন্টে লগইন করুন
                              </p>
                        </div>

                        {/* Login Form */}
                        <form
                              onSubmit={handleSubmit(handleLogin)}
                              className="space-y-5"
                        >

                              {/* Email */}
                              <div>
                                    <label className="block text-purple-900 text-sm font-medium mb-1">
                                          ইমেইল
                                    </label>

                                    <input
                                          type="text"
                                          placeholder="Enter your email"
                                          {...register("email", {
                                                required: "Email is required",

                                          })}
                                          className={`w-full px-4 py-3 bg-purple-50/50 border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition ${errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-purple-200 focus:border-amber-500 focus:ring-amber-500"
                                                }`}
                                    />

                                    {errors.email && (
                                          <p className="text-red-500 text-xs mt-1">
                                                {errors.email.message}
                                          </p>
                                    )}
                              </div>

                              {/* Password */}
                              <div>
                                    <label className="block text-purple-900 text-sm font-medium mb-1">
                                          পাসওয়ার্ড
                                    </label>

                                    <input
                                          type="password"
                                          placeholder="••••••••"
                                          {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                      value: 6,
                                                      message:
                                                            "Password must be at least 6 characters",
                                                },
                                          })}
                                          className={`w-full px-4 py-3 bg-purple-50/50 border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition ${errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-purple-200 focus:border-amber-500 focus:ring-amber-500"
                                                }`}
                                    />

                                    {errors.password && (
                                          <p className="text-red-500 text-xs mt-1">
                                                {errors.password.message}
                                          </p>
                                    )}
                              </div>

                              {/* Login Button */}
                              <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition duration-200"
                              >
                                    {isSubmitting
                                          ? "লগিন হচ্ছে..."
                                          : "লগিন করুন"}
                              </button>

                        </form>

                        {/* Footer Link */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                              একাউন্ট না থাকলে?{" "}
                              <Link
                                    to="/register"
                                    state={{ from: location.state?.from }}
                                    className="text-purple-700 font-semibold hover:underline"
                              >
                                    রেজিস্ট্রেশন করুন
                              </Link>
                        </p>

                  </div>
            </div>
      );
};

export default LoginPage;