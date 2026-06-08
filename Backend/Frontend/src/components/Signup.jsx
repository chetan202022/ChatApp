import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post(
        "/api/user/signup",
        userInfo,
        {
          withCredentials: true,
        }
      );

      // Success message
      toast.success(response.data.message);

      // IMPORTANT:
      // Do NOT login user here
      // Do NOT save to localStorage
      // Do NOT call setAuthUser()

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        toast.error(
          "Error: " + error.response.data.error
        );
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-5"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account ✨
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Join ChatApp and start chatting instantly
          </p>
        </div>

        {/* Logo */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Chat<span className="text-green-500">App</span>
          </h2>
        </div>

        {/* Fullname */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2 rounded-xl">
            <input
              type="text"
              className="grow"
              placeholder="Enter your full name"
              {...register("fullname", {
                required: true,
              })}
            />
          </label>

          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              Full name is required
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2 rounded-xl">
            <input
              type="email"
              className="grow"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
          </label>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              Email is required
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2 rounded-xl">
            <input
              type="password"
              className="grow"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
          </label>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password is required
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2 rounded-xl">
            <input
              type="password"
              className="grow"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl duration-300"
        >
          Signup
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 font-medium ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;