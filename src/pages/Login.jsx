
import React, { useState } from "react";
import deviceImage from "../assets/ShieldUp2.jpeg";

import { Shield, Mail, Lock, AlertTriangle, Wifi } from "lucide-react";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send data to an API
    console.log("Login attempt:", { email, password });
    alert("Login functionality to be implemented!");
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
        <div className="hidden md:flex flex-col items-center justify-center  w-1/2">
          <img
            src={deviceImage}
            alt="ShieldUp Device"
            className="w-full h-full shadow-lg object-cover"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col pt-8">
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
            WELCOME BACK TO SHIELDUP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
