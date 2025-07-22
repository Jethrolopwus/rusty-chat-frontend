"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schema
const registrationSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegistrationForm = ({ onSubmit, onSignInClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
          Register
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
              className={`w-full px-4 py-3 border-2 rounded-xl text-gray-500  bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.fullName ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 text-gray-500  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.email ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="tel"
              placeholder="Username"
              {...register("username")}
              className={`w-full px-4 py-3 border-2 rounded-xl text-gray-500 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.usernamr ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.password ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.confirmPassword ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="button"
              onClick={onSignInClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
            >
              Have account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
