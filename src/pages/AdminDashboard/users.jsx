"use client";

import { useEffect, useState } from "react";
import { Users, Eye, Trash2, MoreVertical } from "lucide-react";
import useAuthStore from "../../store/authStore";
import UserDetailsModal from "../../components/UserDetailModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const UserReport = () => {
  const {
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

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers(1);
    fetchUserAnalytics();
  }, []);

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
        alert("User deleted successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };

  return (
    <div className="pb-6">
      {/* Summary Cards */}
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

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          LIST OF USERS
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Names
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      District
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.length > 0 ? (
                    users.map((userData) => (
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination?.totalPages > 1 && (
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
};

export default UserReport;
