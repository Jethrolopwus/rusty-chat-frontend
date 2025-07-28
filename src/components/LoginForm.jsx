"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Login
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Username Input */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className={`w-full px-6 py-4 border-2 rounded-full text-gray-500 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.username ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 ml-4">
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
              className={`w-full px-6 py-4 border-2 rounded-full text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.password ? "border-red-500" : "border-blue-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 ml-4">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
