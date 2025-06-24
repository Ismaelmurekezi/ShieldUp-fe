import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import DashboardAnalytics from "./pages/AdminDashboard/DashboardAnalytics";
import Report from "./pages/AdminDashboard/Report";
import PageNotFound from "./pages/pageNotFound";
import UserReport from "./pages/SuperAdminDashboard/users";
import SuperDashboardAnalytics from "./pages/SuperAdminDashboard/DashboardAnalytics";
import SuperDashboard from "./pages/SuperAdminDashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
          <Route path="/dashboard/report" element={<Report />} />
          {/* Super Admin Routes */}
          <Route path="/super-admin/dashboard" element={<SuperDashboard />} />
          <Route
            path="/super-admin/analytics"
            element={<SuperDashboardAnalytics />}
          />
          <Route path="/super-admin/user" element={<UserReport />} />
          {/* not found route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
