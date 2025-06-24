import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  LogOut,
  LayoutDashboard,
  ChartNoAxesCombined,
  CircleUserRound,
  Bell,
} from "lucide-react";
import report from "../assets/report.png";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between py-6">
        <div>
          {/* Sidebar Header/Logo */}
          <Link to="/" className="flex items-center px-6 mb-8">
            <img
              src="/logo.png"
              alt="ShieldUp Logo"
              className="h-10 w-10 mr-2"
            />
            <span className="text-xl font-semibold text-teal-400">
              SHIELDUP
            </span>
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
                    location.pathname === "/dashboard"
                      ? "text-green-700 bg-[#B6FFA1] bg-opacity-80 border-r-4 border-teal-600"
                      : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
                  }`}
                >
                  {/* Dashboard Icon */}
                  <LayoutDashboard className="mr-4" />
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/report"
                  className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
                    location.pathname === "/dashboard/report"
                      ? "text-green-700 bg-[#B6FFA1] bg-opacity-80 border-r-4 border-teal-600"
                      : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
                  }`}
                >
                  {/* Dashboard Icon */}
                  <img
                    src={report}
                    alt="report icon"
                    className="h-6 w-6 object-contain mr-4"
                  />
                  Report
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/analytics"
                  className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
                    location.pathname === "/dashboard/analytics"
                      ? "text-green-700 bg-[#B6FFA1] bg-opacity-80 border-r-4 border-teal-600"
                      : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
                  }`}
                >
                  {/* Analytics Icon */}
                  <ChartNoAxesCombined className="mr-4" />
                  Analytics
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Links (Settings, Logout) */}
        <div>
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  to="/dashboard/settings"
                  className="flex items-center px-6 py-3 text-lg font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Settings Icon */}
                  <Settings className="mr-4" />
                  Setting
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/logout"
                  className="flex items-center px-6 py-3 text-lg font-medium text-red-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Logout Icon */}
                  <LogOut className="mr-4" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex justify-end items-center bg-white shadow-md p-4 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full  flex items-center justify-center overflow-hidden">
              <CircleUserRound
                className="w-full h-full object-cover"
                strokeWidth={0.85}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#ECFAE5] p-6">
          {children}{" "}
          {/* This is where the specific dashboard page content will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
