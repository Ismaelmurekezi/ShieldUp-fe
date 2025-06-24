// src/pages/DashboardHome.jsx
import LayoutSuperAdmin from "../../components/LayoutSuperAdmin";

import {
  TrendingUp,
  Users,
  Bell,
  Settings,
  LogOut,
  Home,
  BarChart3,
  MoreVertical,
  Eye,
  Trash2,
  User,
} from "lucide-react";

const dummyReports = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    Role: "Admin",
    District: "Nyarugenge",
    Sector: "Nyamirambo",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    Role: "User",
    District: "Gasabo",
    Sector: "Kimironko",
  },
  {    id: 3,
    name: "Peter Jones",
    email: "peter@example.com",
    Role: "User",
    District: "Kicukiro",
    Sector: "Kicukiro",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    Role: "User",
    District: "Nyarugenge",
    Sector: "Nyamirambo",
  },
  {    id: 5,
    name: "Michael Green",
    email: "michael@test.com",
    Role: "User",
    District: "Gasabo",
    Sector: "Kimironko",
  },
  {
    id: 6,
    name: "Sarah White",
    email: "sarah@example.com",
    Role: "User",
    District: "Kicukiro",
    Sector: "Kicukiro",
  },
  {    id: 7,
    name: "David Black",
    email: "david@example.com",
    Role: "User",
    District: "Nyarugenge",
    Sector: "Nyamirambo",
  },
];

const UserReport = () => {
  return (
    <LayoutSuperAdmin>
      <div className="pb-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Weekly Report Card */}
          <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Users
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">123</p>
            </div>
            <Users size={35} className="text-gray-400" />
          </div>

          {/* Monthly Report Card */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Users
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">123</p>
            </div>

            <Users size={35} className="text-gray-400" />
          </div>

          {/* Total Users Card */}
          <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">Total Users</p>
              <p className="text-3xl font-bold text-yellow-700 mt-2">16</p>
            </div>
            {/* Icon (Placeholder) */}
            <Users size={35} className="text-gray-400" />
          </div>
        </div>
        {/* Recent Report Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            LIST OF USERS
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Names
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    District
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sector
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.Role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.District}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.Sector}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                          </svg>
                        </button>
                        <button className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md border border-green-600 text-xs">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md border border-red-600 text-xs">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-4 flex justify-end items-center space-x-2 text-gray-600">
            <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <span className="px-3 py-1 bg-teal-500 text-white rounded-md">
              1
            </span>
            <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </LayoutSuperAdmin>
  );
};

export default UserReport;
