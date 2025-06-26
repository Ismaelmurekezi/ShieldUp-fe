"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, MoreVertical, Eye, Trash2 } from "lucide-react";
import useAuthStore from "../../store/authStore";
import UserDetailsModal from "../../components/UserDetailModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import MessageDetailsModal from "../../components/MessageDetailsModal";

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
    messages,
    messagePagination,
    fetchMessages,
    fetchMessage,
    deleteMessage,
    updateMessageStatus,
    isLoading,
    error,
  } = useAuthStore();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Message states
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showMessageDeleteModal, setShowMessageDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const isSuper = isSuperAdmin();

  // Fetch data on component mount
  useEffect(() => {
    if (isSuper) {
      fetchUsers(1);
      fetchUserAnalytics();
    } else {
      // Admin user - fetch messages
      fetchMessages(1);
    }
  }, []);

  // Helper functions for message data
  const getAddress = (location) => {
    if (!location) return "Unknown";
    const parts = location.split("-");
    return parts[1] || "Unknown"; // Return sector (second part)
  };

  const getLocationLink = (cords) => {
    if (!cords) return "#";
    const coords = cords.split(" ")[0];
    return `https://www.google.com/maps/search/?api=1&query=${coords}`;
  };

  // User handlers
  const handleViewUser = async (userId) => {
    const result = await fetchUser(userId);
    if (result.success) {
      setSelectedUser(result.data);
      setShowUserModal(true);
    }
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

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

  // Message handlers
  const handleViewMessage = async (messageId) => {
    const result = await fetchMessage(messageId);
    if (result.success) {
      setSelectedMessage(result.data);
      setShowMessageModal(true);
    }
  };

  const handleDeleteMessage = (message) => {
    setMessageToDelete(message);
    setShowMessageDeleteModal(true);
  };

  const confirmDeleteMessage = async () => {
    if (messageToDelete) {
      const result = await deleteMessage(messageToDelete._id);
      if (result.success) {
        setShowMessageDeleteModal(false);
        setMessageToDelete(null);
        alert("Message deleted successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };

  const handleMarkAsRead = async (messageId) => {
    const result = await updateMessageStatus(messageId, "acknowledged");
    if (result.success) {
      // Refresh the message data
      fetchMessage(messageId).then((res) => {
        if (res.success) {
          setSelectedMessage(res.data);
        }
      });
      fetchMessages(messagePagination.currentPage);
    }
  };

  // Admin Dashboard Content
  const AdminDashboard = () => (
    <div className="pb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Hi {user?.username || "Admin"} ! Welcome back
      </h1>

      {/* Summary Cards for Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">
              Total Messages
            </p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {messagePagination.totalMessages}
            </p>
          </div>
          <TrendingUp size={35} className="text-gray-400" />
        </div>

        <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">
              Unread Messages
            </p>
            <p className="text-3xl font-bold text-teal-700 mt-2">
              {messages.filter((msg) => msg.status === "unread").length}
            </p>
          </div>
          <TrendingUp size={35} className="text-gray-400" />
        </div>

        <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-700">Acknowledged</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">
              {messages.filter((msg) => msg.status === "acknowledged").length}
            </p>
          </div>
          <TrendingUp size={35} className="text-gray-400" />
        </div>
      </div>

      {/* Recent Crime Reports Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Crime Reports
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
                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 pl-20 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message) => (
                    <tr key={message._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.payload?.from || "Anonymous"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        +250712345678
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.payload?.message || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.payload?.cords ? (
                          <a
                            href={getLocationLink(message.payload.cords)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Location
                          </a>
                        ) : (
                          "No coordinates"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getAddress(message.payload?.location)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            message.status === "unread"
                              ? "bg-red-100 text-red-800"
                              : message.status === "acknowledged"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical size={20} className="mr-3" />
                          </button>
                          <button
                            onClick={() => handleViewMessage(message._id)}
                            className="flex gap-2 bg-[#A1DD70] text-white hover:text-green-900 px-2 py-1 rounded-md border border-[#A1DD70] text-xs"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message)}
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
            {messagePagination.totalPages > 1 && (
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  {(messagePagination.currentPage - 1) *
                    messagePagination.limit +
                    1}{" "}
                  to{" "}
                  {Math.min(
                    messagePagination.currentPage * messagePagination.limit,
                    messagePagination.totalMessages
                  )}{" "}
                  of {messagePagination.totalMessages} messages
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      fetchMessages(messagePagination.currentPage - 1)
                    }
                    disabled={messagePagination.currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(messagePagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => fetchMessages(index + 1)}
                      className={`px-3 py-1 rounded-md border ${
                        messagePagination.currentPage === index + 1
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      fetchMessages(messagePagination.currentPage + 1)
                    }
                    disabled={
                      messagePagination.currentPage ===
                      messagePagination.totalPages
                    }
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

      {/* Message Modals */}
      <MessageDetailsModal
        message={selectedMessage}
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setSelectedMessage(null);
        }}
        onMarkAsRead={handleMarkAsRead}
      />

      <DeleteConfirmationModal
        isOpen={showMessageDeleteModal}
        onClose={() => {
          setShowMessageDeleteModal(false);
          setMessageToDelete(null);
        }}
        onConfirm={confirmDeleteMessage}
        userName={`message from ${messageToDelete?.payload?.from || "Unknown"}`}
        isLoading={isLoading}
      />
    </div>
  );

  // SuperAdmin Dashboard Content (unchanged)
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

      {/* User Modals */}
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
