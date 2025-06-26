import { create } from "zustand";
import { persist } from "zustand/middleware";
import userService from "../services/userService";
import messageService from "../services/messageService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // User management state
      users: [],
      userAnalytics: null,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 10,
      },

      // Message management state
      messages: [],
      messagePagination: {
        currentPage: 1,
        totalPages: 1,
        totalMessages: 0,
        limit: 10,
      },

      // Helper functions
      isSuperAdmin: () => {
        const { user } = get();
        return user?.role === "SuperAdmin";
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },

      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          users: [],
          userAnalytics: null,
          messages: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalUsers: 0,
            limit: 10,
          },
          messagePagination: {
            currentPage: 1,
            totalPages: 1,
            totalMessages: 0,
            limit: 10,
          },
        });
      },

      // User management actions
      fetchUsers: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const result = await userService.getAllUsers(page, limit);
          if (result.success) {
            set({
              users: result.data.users,
              pagination: result.data.pagination,
              isLoading: false,
            });
          } else {
            set({ error: result.message, isLoading: false });
          }
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      fetchUser: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const result = await userService.getUserById(userId);
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      deleteUser: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const result = await userService.deleteUser(userId);
          if (result.success) {
            // Refresh users list
            const { pagination } = get();
            await get().fetchUsers(pagination.currentPage);
          }
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      fetchUserAnalytics: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await userService.getUserAnalytics();
          if (result.success) {
            set({ userAnalytics: result.data, isLoading: false });
          } else {
            set({ error: result.message, isLoading: false });
          }
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      // Message management actions
      fetchMessages: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const result = await messageService.getAllMessages(page, limit);
          if (result.success) {
            set({
              messages: result.data.messages,
              messagePagination: result.data.pagination,
              isLoading: false,
            });
          } else {
            set({ error: result.message, isLoading: false });
          }
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      fetchMessage: async (messageId) => {
        set({ isLoading: true, error: null });
        try {
          const result = await messageService.getMessageById(messageId);
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      deleteMessage: async (messageId) => {
        set({ isLoading: true, error: null });
        try {
          const result = await messageService.deleteMessage(messageId);
          if (result.success) {
            // Refresh messages list
            const { messagePagination } = get();
            await get().fetchMessages(messagePagination.currentPage);
          }
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },

      updateMessageStatus: async (messageId, status) => {
        set({ isLoading: true, error: null });
        try {
          const result = await messageService.updateMessageStatus(
            messageId,
            status
          );
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: error.message };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
