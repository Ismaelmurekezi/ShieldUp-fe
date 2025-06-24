import React from "react";
import { Shield, MapPin, Wifi, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";


const Home = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 text-white flex flex-col relative overflow-hidden font-poppin">
      {/* Background stars/dots */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="ShieldUp Logo"
            className="h-20 w-20 object-contain"
          />
          <span className="text-xs font-bold text-teal-400">SHIELDUP</span>{" "}
          {/* Based on the logo's color in your design */}
        </div>
        <nav className="space-x-4">
          {/* <Link to="/login">
            <button className="text-white hover:text-teal-400 transition duration-300 px-4 py-2 rounded-md">
              Sign Up
            </button>
          </Link> */}
          <Link to="/login">
            <button className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-10   rounded-md transition duration-300 shadow-lg">
              LOGIN
            </button>
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 md:p-12 text-center">
        <div className="max-w-3xl space-y-6">
          <span className="text-4xl md:text-3xl font-semibold leading-relaxed">
            IoT based Home Early
            <span className="text-teal-400 pl-3">Warning system</span>
          </span>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-4">
        copyright &copy; 2025. All right reserved
      </footer>
    </div>
  );
};

export default Home;
