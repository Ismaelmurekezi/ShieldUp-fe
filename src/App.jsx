import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/AdminDashboard/Dashboard";
import DashboardAnalytics from "./pages/AdminDashboard/DashboardAnalytics";
import Report from "./pages/AdminDashboard/Report";



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
          <Route path="/dashboard/report" element={<Report />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
