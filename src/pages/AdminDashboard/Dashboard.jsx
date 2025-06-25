"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, MoreVertical, Eye, Trash2 } from "lucide-react";
import useAuthStore from "../../store/authStore";
import UserDetailsModal from "../../components/UserDetailModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";



// Dummy data for theft reports (Admin) - keep this for admin users
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

const Dashboard = () => {
  const {
    user,
    isSuperAdmin,
    users,
    userAnalytics,
    pagination,
    fetchUsers,
    fetchUser,
    deleteUser,
    fetchUserAnalytics,
    isLoading,
    error,
  } = useAuthStore();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const isSuper = isSuperAdmin();

  // Fetch data on component mount
  useEffect(() => {
    if (isSuper) {
      fetchUsers(1);
      fetchUserAnalytics();
    }
  }, [isSuper]);

  // Handle view user
  const handleViewUser = async (userId) => {
    const result = await fetchUser(userId);
    if (result.success) {
      setSelectedUser(result.data);
      setShowUserModal(true);
    }
  };

  // Handle delete user
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Confirm delete user
  const confirmDeleteUser = async () => {
    if (userToDelete) {
      const result = await deleteUser(userToDelete._id);
      if (result.success) {
        setShowDeleteModal(false);
        setUserToDelete(null);
        // Show success message (you can add a toast notification here)
        alert("User deleted successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };

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
            <p className="text-3xl font-bold text-green-700 mt-2">
              {userAnalytics?.weeklyUsers || 0}
            </p>
          </div>
          <Users size={35} className="text-gray-400" />
        </div>

        <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Monthly Users</p>
            <p className="text-3xl font-bold text-teal-700 mt-2">
              {userAnalytics?.monthlyUsers || 0}
            </p>
          </div>
          <Users size={35} className="text-gray-400" />
        </div>

        <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Total Users</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">
              {userAnalytics?.totalUsers || 0}
            </p>
          </div>
          <Users size={35} className="text-gray-400" />
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Users
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <>
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
                      Sector
                    </th>
                    <th className="px-6 py-3 pl-20 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userData) => (
                    <tr key={userData._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {userData.username}
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
                        {userData.sector}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical size={20} className="mr-3" />
                          </button>
                          <button
                            onClick={() => handleViewUser(userData._id)}
                            className="flex gap-2 bg-[#A1DD70] text-white hover:text-green-900 px-2 py-1 rounded-md border border-[#A1DD70] text-xs"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteUser(userData)}
                            className="flex gap-2 bg-red-500 text-white hover:text-red-900 px-3 py-1 rounded-md border border-red-600 text-xs"
                          >
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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.limit,
                    pagination.totalUsers
                  )}{" "}
                  of {pagination.totalUsers} users
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => fetchUsers(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => fetchUsers(index + 1)}
                      className={`px-3 py-1 rounded-md border ${
                        pagination.currentPage === index + 1
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => fetchUsers(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
        userName={userToDelete?.username}
        isLoading={isLoading}
      />
    </div>
  );

  // Render based on user role
  return isSuper ? <SuperAdminDashboard /> : <AdminDashboard />;
};

export default Dashboard;
