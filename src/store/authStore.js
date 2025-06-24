import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_BASE_URL = "http://localhost:5000"; 

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

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
          });
        }
      },

      // Helper functions
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      isSuperAdmin: () => get().user?.role === "SuperAdmin",
      isAdmin: () => get().user?.role === "admin",
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
