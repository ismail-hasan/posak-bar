import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext";

const RegisterPage = () => {
      const { createUser } = use(AuthContext);

      const navigate = useNavigate();
      const location = useLocation();

      // const from = location?.pathname || "/";
      const from = location.state?.from || "/";

      const {
            register,
            handleSubmit,
            watch,
            reset,
            formState: { errors, isSubmitting },
      } = useForm();

      const password = watch("password");

      const handleRegister = async (data) => {
            try {
                  const result = await createUser(
                        data.email,
                        data.password
                  );

                  const loggedUser = result.user;

                  await updateProfile(loggedUser, {
                        displayName: data.name,
                  });


                  reset();

                  navigate(from, { replace: true });
            } catch (error) {
                  console.error("Registration error:", error);

                  if (error.code === "auth/email-already-in-use") {
                        alert("এই Email দিয়ে ইতিমধ্যে একটি Account আছে!");
                  } else if (error.code === "auth/invalid-email") {
                        alert("সঠিক Email Address দিন!");
                  } else if (error.code === "auth/weak-password") {
                        alert("Password আরও শক্তিশালী দিন!");
                  } else {
                        alert("Registration failed. আবার চেষ্টা করুন!");
                  }
            }
      };

      return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">

                  <div className="max-w-md w-full bg-white border border-purple-200 rounded-2xl p-8 shadow-xl shadow-purple-100">

                        {/* Header */}
                        <div className="text-center mb-6">
                              <h2 className="text-3xl font-extrabold text-purple-900 tracking-wide">
                                    রেজিস্ট্রেশন করুন
                              </h2>

                              <p className="text-gray-500 text-sm mt-2">
                                    আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন
                              </p>
                        </div>

                        {/* Register Form */}
                        <form
                              onSubmit={handleSubmit(handleRegister)}
                              className="space-y-4"
                        >

                              {/* Name */}
                              <div>
                                    <label className="block text-purple-900 text-sm font-medium mb-1">
                                          আপনার নাম
                                    </label>

                                    <input
                                          type="text"
                                          placeholder="Enter your name"
                                          {...register("name", {
                                                required: "Name is required",
                                                minLength: {
                                                      value: 3,
                                                      message:
                                                            "Name must be at least 3 characters",
                                                },
                                          })}
                                          className={`w-full px-4 py-3 bg-purple-50/50 border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition ${errors.name
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-purple-200 focus:border-amber-500 focus:ring-amber-500"
                                                }`}
                                    />

                                    {errors.name && (
                                          <p className="text-red-500 text-xs mt-1">
                                                {errors.name.message}
                                          </p>
                                    )}
                              </div>

                              {/* Email */}
                              <div>
                                    <label className="block text-purple-900 text-sm font-medium mb-1">
                                          ইমেইল
                                    </label>

                                    <input
                                          type="email"
                                          placeholder="Enter your email"
                                          {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                      message:
                                                            "Please enter a valid email",
                                                },
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

                              {/* Confirm Password */}
                              <div>
                                    <label className="block text-purple-900 text-sm font-medium mb-1">
                                          কনফার্ম পাসওয়ার্ড
                                    </label>

                                    <input
                                          type="password"
                                          placeholder="••••••••"
                                          {...register("confirmPassword", {
                                                required:
                                                      "Please confirm your password",
                                                validate: (value) =>
                                                      value === password ||
                                                      "Passwords do not match",
                                          })}
                                          className={`w-full px-4 py-3 bg-purple-50/50 border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition ${errors.confirmPassword
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-purple-200 focus:border-amber-500 focus:ring-amber-500"
                                                }`}
                                    />

                                    {errors.confirmPassword && (
                                          <p className="text-red-500 text-xs mt-1">
                                                {errors.confirmPassword.message}
                                          </p>
                                    )}
                              </div>

                              {/* Register Button */}
                              <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 py-3 bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition duration-200 cursor-pointer"
                              >
                                    {isSubmitting
                                          ? "রেজিস্ট্রেশন হচ্ছে..."
                                          : "রেজিস্ট্রেশন করুন"}
                              </button>

                        </form>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                              একাউন্ট থাকলে{" "}
                              <Link
                                    to="/login"
                                    className="text-purple-700 font-semibold hover:underline"
                              >
                                    লগইন করুন
                              </Link>
                        </p>

                  </div>
            </div>
      );
};

export default RegisterPage;