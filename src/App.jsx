import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardAnalytics from "./pages/AdminDashboard/DashboardAnalytics";
import Report from "./pages/AdminDashboard/Report";
import UserReport from "./pages/AdminDashboard/users";
import PageNotFound from "./pages/pageNotFound";

import DashboardRouteGuard from "./components/DashboardRouteGuard";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import { ToastContainer } from "react-toastify";


// Unauthorized page component
const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">403</h1>
      <p className="text-xl text-gray-600 mb-8">Unauthorized Access</p>
      <p className="text-gray-500">
        You don't have permission to access this resource.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Register Route - Only SuperAdmin can register new admins */}
        <Route
          path="/register"
          element={
            // <ProtectedRoute allowedRoles={["SuperAdmin"]}>
            <Register />
            // </ProtectedRoute>
          }
        />

        {/* Dashboard Routes - Protected for admin and SuperAdmin */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardRouteGuard>
              <DashboardLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="analytics" element={<DashboardAnalytics />} />
                  <Route
                    path="report"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <Report />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute allowedRoles={["SuperAdmin"]}>
                        <UserReport />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </DashboardLayout>
            </DashboardRouteGuard>
          }
        />

        {/* Not found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
