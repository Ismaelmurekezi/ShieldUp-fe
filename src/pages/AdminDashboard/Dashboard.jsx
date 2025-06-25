import { TrendingUp, Users, MoreVertical, Eye, Trash2 } from "lucide-react";
import useAuthStore from "../../store/authStore";

// Dummy data for theft reports (Admin)
const dummyTheftReports = [
  {
    id: 1,
    name: "John Doe",
    telephone: "+2507238299",
    crimeType: "Burglary",
    locationLink: "https://location",
    address: "Nyarugenge",
  },
  {
    id: 2,
    name: "Jane Smith",
    telephone: "+2507891234",
    crimeType: "Assault",
    locationLink: "https://location",
    address: "Gasabo",
  },
  {
    id: 3,
    name: "Peter Jones",
    telephone: "+2507305678",
    crimeType: "Theft",
    locationLink: "https://location",
    address: "Kicukiro",
  },
  {
    id: 4,
    name: "Alice Brown",
    telephone: "+2507223456",
    crimeType: "Robbery",
    locationLink: "https://location",
    address: "Nyarugenge",
  },
  {
    id: 5,
    name: "Michael Green",
    telephone: "+2507887654",
    crimeType: "Burglary",
    locationLink: "https://location",
    address: "Gasabo",
  },
];

// Dummy data for users (SuperAdmin)
const dummyUsers = [
  {
    id: 1,
    name: "Admin John",
    email: "john@admin.com",
    role: "admin",
    district: "Nyarugenge",
    sector: "Nyarugenge",
    joinDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Admin Jane",
    email: "jane@admin.com",
    role: "admin",
    district: "Gasabo",
    sector: "Kacyiru",
    joinDate: "2024-01-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Admin Peter",
    email: "peter@admin.com",
    role: "admin",
    district: "Kicukiro",
    sector: "Niboye",
    joinDate: "2024-02-01",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Admin Alice",
    email: "alice@admin.com",
    role: "admin",
    district: "Nyarugenge",
    sector: "Muhima",
    joinDate: "2024-02-10",
    status: "Active",
  },
  {
    id: 5,
    name: "Admin Michael",
    email: "michael@admin.com",
    role: "admin",
    district: "Gasabo",
    sector: "Remera",
    joinDate: "2024-02-15",
    status: "Active",
  },
];

const Dashboard = () => {
  const { user, isSuperAdmin } = useAuthStore();
  const isSuper = isSuperAdmin();

  // Admin Dashboard Content
  const AdminDashboard = () => (
    <div className="pb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Hi {user?.username || "Admin"} ! Welcome back
      </h1>

      {/* Summary Cards for Admin - Theft Related */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Weekly Thefts</p>
            <p className="text-3xl font-bold text-green-700 mt-2">23</p>
          </div>
          <TrendingUp size={35} className="text-gray-400" />
        </div>

        <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">
              Monthly Thefts
            </p>
            <p className="text-3xl font-bold text-teal-700 mt-2">89</p>
          </div>
          <TrendingUp size={35} className="text-gray-400" />
        </div>

        <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Total Cases</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">156</p>
          </div>
          <TrendingUp size={35} className="text-gray-400" />
        </div>
      </div>

      {/* Recent Theft Reports Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Theft Reports
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Names
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Telephone
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Type of Crime
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Location Link
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 pl-20 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyTheftReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.telephone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.crimeType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <a
                      href={report.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {report.locationLink.split("//")[1]}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} className="mr-3" />
                      </button>
                      <button className="flex gap-2 bg-[#A1DD70] text-white hover:text-green-900 px-2 py-1 rounded-md border border-[#A1DD70] text-xs">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex gap-2 bg-red-500 text-white hover:text-red-900 px-3 py-1 rounded-md border border-red-600 text-xs">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // SuperAdmin Dashboard Content
  const SuperAdminDashboard = () => (
    <div className="pb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Hi {user?.username || "SuperAdmin"} ! Welcome back
      </h1>

      {/* Summary Cards for SuperAdmin - User Related */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Weekly Users</p>
            <p className="text-3xl font-bold text-green-700 mt-2">5</p>
          </div>
          <Users size={35} className="text-gray-400" />
        </div>

        <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Monthly Users</p>
            <p className="text-3xl font-bold text-teal-700 mt-2">12</p>
          </div>
          <Users size={35} className="text-gray-400" />
        </div>

        <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Total Users</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">25</p>
          </div>
          <Users size={35} className="text-gray-400" />
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Users
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 pl-20 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyUsers.map((userData) => (
                <tr key={userData.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userData.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userData.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {userData.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userData.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userData.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        userData.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {userData.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} className="mr-3" />
                      </button>
                      <button className="flex gap-2 bg-[#A1DD70] text-white hover:text-green-900 px-2 py-1 rounded-md border border-[#A1DD70] text-xs">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex gap-2 bg-red-500 text-white hover:text-red-900 px-3 py-1 rounded-md border border-red-600 text-xs">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render based on user role
  return isSuper ? <SuperAdminDashboard /> : <AdminDashboard />;
};

export default Dashboard;
