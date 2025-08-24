import { useForm } from "react-hook-form";
import authService from "../Service/AuthService.js";
import { login } from "../store/Slice/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
  function UserSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const userSignup = async (data) => {
    try {
      setError("");
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
      
        if (userData) dispatch(login(userData));
        
        navigate("/");
      }
    } catch (error) {
      console.log("error while signup: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
        <div className="p-6 sm:p-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Create Your Account
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-300 ease-in-out"
              >
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm sm:text-base font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(userSignup)}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    validate: {
                      adminIssue: (val) => val !== "admin" || "admin is reserved",
                      noSpaces: (v) => !v.includes(" ") || "No spaces allowed",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.username ? "border-red-400" : "border-gray-200"
                  } bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base`}
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  } bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  } bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                assign="Create Account"
                className="w-full flex justify-center py-3 px-4 rounded-lg text-sm sm:text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;