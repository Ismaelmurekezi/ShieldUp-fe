// src/pages/DashboardHome.jsx
import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
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
  EllipsisVertical,
} from "lucide-react";


const dummyReports = [
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
  {
    id: 6,
    name: "Sarah White",
    telephone: "+2507311122",
    crimeType: "Assault",
    locationLink: "https://location",
    address: "Kicukiro",
  },
  {
    id: 7,
    name: "David Black",
    telephone: "+2507299887",
    crimeType: "Theft",
    locationLink: "https://location",
    address: "Nyarugenge",
  },
  {
    id: 8,
    name: "Emily Grey",
    telephone: "+2507876543",
    crimeType: "Burglary",
    locationLink: "https://location",
    address: "Gasabo",
  },
  {
    id: 9,
    name: "Chris Blue",
    telephone: "+2507323344",
    crimeType: "Robbery",
    locationLink: "https://location",
    address: "Kicukiro",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="pb-6">
        {" "}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Hi Ismael ! Welcome back
        </h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Weekly Report Card */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Report
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">123</p>
            </div>
            {/* Icon (Placeholder) */}
            <TrendingUp size={35} className="text-gray-400" />
          </div>

          {/* Monthly Report Card */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Report
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">123</p>
            </div>
            {/* Icon (Placeholder) */}
            <TrendingUp size={35} className="text-gray-400" />
          </div>

          {/* Total Users Card */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center justify-between">
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
            Recent Report
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Names
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Telephone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type of crime
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location Link
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 pl-20 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
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
                        {/* More options (three dots) */}
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={20} className="mr-3" />
                        </button>
                        <button className="flex gap-2 bg-[#A1DD70] text-white hover:text-green-900 px-2 py-1 rounded-md border border-[#A1DD70] text-xs">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="flex gap-2 bg-red-500 text-white hover:text-red-900 px-3 py-1 rounded-md border border-red-600 text-xs">
                          {/* <Eye className="w-4 h-4"/> */}
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
          {/* Pagination
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
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
