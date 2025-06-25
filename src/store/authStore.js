import { create } from "zustand";
import { persist } from "zustand/middleware";
import userService from "../services/userService";

const API_BASE_URL = "http://localhost:5000";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // User management state
      users: [],
      selectedUser: null,
      userAnalytics: null,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 10,
      },

      // Login function
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            set({
              error: data.message || "Login failed",
              isLoading: false,
            });
            return { success: false, message: data.message };
          }
        } catch (error) {
          const errorMessage = error.message || "Network error";
          set({
            error: errorMessage,
            isLoading: false,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Register function
      register: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              isLoading: false,
              error: null,
            });
            // Refresh users list after successful registration
            get().fetchUsers();
            return { success: true };
          } else {
            set({
              error: data.message || "Registration failed",
              isLoading: false,
            });
            return { success: false, message: data.message };
          }
        } catch (error) {
          const errorMessage = error.message || "Network error";
          set({
            error: errorMessage,
            isLoading: false,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Logout function
      logout: async () => {
        set({ isLoading: true });

        try {
          await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            users: [],
            selectedUser: null,
            userAnalytics: null,
          });
        }
      },

      // Fetch all users with pagination
      fetchUsers: async (page = 1) => {
        set({ isLoading: true, error: null });

        try {
          const result = await userService.getAllUsers(
            page,
            get().pagination.limit
          );

          if (result.success) {
            // Since your backend doesn't have pagination yet, we'll implement it on frontend
            const allUsers = result.data;
            const limit = get().pagination.limit;
            const totalUsers = allUsers.length;
            const totalPages = Math.ceil(totalUsers / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedUsers = allUsers.slice(startIndex, endIndex);

            set({
              users: paginatedUsers,
              pagination: {
                currentPage: page,
                totalPages,
                totalUsers,
                limit,
              },
              isLoading: false,
            });
            return { success: true };
          } else {
            set({
              error: result.message,
              isLoading: false,
            });
            return { success: false, message: result.message };
          }
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, message: error.message };
        }
      },

      // Fetch single user
      fetchUser: async (userId) => {
        set({ isLoading: true, error: null });

        try {
          const result = await userService.getUserById(userId);

          if (result.success) {
            set({
              selectedUser: result.data,
              isLoading: false,
            });
            return { success: true, data: result.data };
          } else {
            set({
              error: result.message,
              isLoading: false,
            });
            return { success: false, message: result.message };
          }
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, message: error.message };
        }
      },

      // Delete user
      deleteUser: async (userId) => {
        set({ isLoading: true, error: null });

        try {
          const result = await userService.deleteUser(userId);

          if (result.success) {
            // Remove user from local state
            const currentUsers = get().users;
            const updatedUsers = currentUsers.filter(
              (user) => user._id !== userId
            );

            set({
              users: updatedUsers,
              isLoading: false,
            });

            // Refresh the users list to maintain pagination
            get().fetchUsers(get().pagination.currentPage);

            return { success: true, message: result.message };
          } else {
            set({
              error: result.message,
              isLoading: false,
            });
            return { success: false, message: result.message };
          }
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, message: error.message };
        }
      },

      // Fetch user analytics from backend
      fetchUserAnalytics: async () => {
        set({ isLoading: true, error: null });

        try {
          // Try to get analytics from the new backend endpoint first
          const backendResult = await userService.getUserAnalyticsFromBackend();

          if (backendResult.success) {
            set({
              userAnalytics: backendResult.data,
              isLoading: false,
            });
            return { success: true, data: backendResult.data };
          } else {
            // Fallback to processing user data on frontend
            const result = await userService.getUserAnalytics();

            if (result.success) {
              set({
                userAnalytics: result.data,
                isLoading: false,
              });
              return { success: true, data: result.data };
            } else {
              set({
                error: result.message,
                isLoading: false,
              });
              return { success: false, message: result.message };
            }
          }
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, message: error.message };
        }
      },

      // Helper functions
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      isSuperAdmin: () => get().user?.role === "SuperAdmin",
      isAdmin: () => get().user?.role === "admin",
      clearSelectedUser: () => set({ selectedUser: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
