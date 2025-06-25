
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  LogOut,
  LayoutDashboard,
  BarChartIcon as ChartNoAxesCombined,
  Bell,
  Users,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import report from "../assets/report.png";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isSuperAdmin } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Get first letter of username for avatar
  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "U";
  };

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseItems = [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        path: "/dashboard/analytics",
        label: "Analytics",
        icon: ChartNoAxesCombined,
      },
    ];

    // Add role-specific items
    if (isSuperAdmin()) {
      baseItems.push({
        path: "/dashboard/users",
        label: "Users",
        icon: Users,
      });
    } else {
      baseItems.splice(1, 0, {
        path: "/dashboard/report",
        label: "Report",
        icon: report,
        isImage: true,
      });
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex h-screen bg-gray-100">
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
              {navigationItems.map((item) => (
                <li key={item.path} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "text-green-700 bg-[#B6FFA1] bg-opacity-80 border-r-4 border-teal-600"
                        : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.isImage ? (
                      <img
                        src={item.icon || "/placeholder.svg"}
                        alt={`${item.label} icon`}
                        className="h-6 w-6 object-contain mr-4"
                      />
                    ) : (
                      <item.icon className="mr-4" />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
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
                  <Settings className="mr-4" />
                  Settings
                </Link>
              </li>
              <li className="mb-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-6 py-3 text-lg font-medium text-red-600 hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                >
                  <LogOut className="mr-4" />
                  Logout
                </button>
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

            {/* User Profile */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                {getInitial(user?.username)}
              </div>
              <span className="text-sm text-gray-600 mt-1">
                {user?.username || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#ECFAE5] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

