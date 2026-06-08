import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }

        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
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
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue your chats
          </p>
        </div>

        {/* Logo */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Chat<span className="text-green-500">App</span>
          </h2>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2 rounded-xl">
            <input
              type="text"
              className="grow"
              placeholder="Enter your email"
              {...register("email", { required: true })}
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
              {...register("password", { required: true })}
            />
          </label>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password is required
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl duration-300"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          New user?
          <Link
            to="/signup"
            className="text-blue-500 font-medium ml-1 hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;