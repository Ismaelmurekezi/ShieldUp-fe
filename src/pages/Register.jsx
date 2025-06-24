"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  HomeIcon as House,
  AlertCircle,
  Loader2,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import deviceImage from "../assets/ShieldUp2.jpeg";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    isLoading,
    error,
    clearError,
    isSuperAdmin,
    isAuthenticated,
  } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    district: "",
    sector: "",
    role: "admin", 
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if user is authenticated and is SuperAdmin
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //     return;
  //   }

  //   if (!isSuperAdmin()) {
  //     navigate("/dashboard");
  //     return;
  //   }
  // }, [isAuthenticated, isSuperAdmin, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.district.trim()) {
      errors.district = "District is required";
    }

    if (!formData.sector.trim()) {
      errors.sector = "Sector is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register(formData);

    if (result.success) {
      setShowSuccess(true);
      // Reset form
      setFormData({
        email: "",
        password: "",
        username: "",
        district: "",
        sector: "",
        // role: "admin",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const getInputClasses = (fieldName) => {
    return `w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 ${
      validationErrors[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-teal-500"
    }`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-poppin">
      <div className="absolute top-4 left-4">
        <img
          src="/logo.png"
          alt="ShieldUp Logo"
          className="h-12 w-12 object-contain"
        />
      </div>

      <div className="flex bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full border-2 border-gray-200">
        {/* Left Section (Image) */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2">
          <img
            src={deviceImage || "/placeholder.svg"}
            alt="ShieldUp Device"
            className="w-full h-full shadow-lg object-cover"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col pt-8">
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
            REGISTER NEW ADMIN
          </h2>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              Admin registered successfully!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={getInputClasses("username")}
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {validationErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.username}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={getInputClasses("email")}
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={getInputClasses("password")}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {validationErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* District Input */}
            <div className="relative">
              <input
                type="text"
                name="district"
                placeholder="District"
                className={getInputClasses("district")}
                value={formData.district}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <House className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {validationErrors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.district}
                </p>
              )}
            </div>

            {/* Sector Input */}
            <div className="relative">
              <input
                type="text"
                name="sector"
                placeholder="Sector"
                className={getInputClasses("sector")}
                value={formData.sector}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <House className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {validationErrors.sector && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.sector}
                </p>
              )}
            </div>

            {/* Role Selection */}
            {/* <div className="relative">
              <select
                name="role"
                className={getInputClasses("role")}
                value={formData.role}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="admin">Admin</option>
                <option value="SuperAdmin">Super Admin</option>
              </select>
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div> */}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "REGISTER ADMIN"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-teal-500 hover:text-teal-600 text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
