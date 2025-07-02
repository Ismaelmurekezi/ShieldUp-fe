const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://ibhews.onrender.com";

class UserService {
  // Get authorization headers
  getAuthHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header as fallback if cookie doesn't work
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Get all users with pagination
  async getAllUsers(page = 1, limit = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        }
      );

      const data = await response.json();
      // console.log("Raw API response:", data);

      if (response.ok) {
        // Check if the response has the expected structure
        if (data.users && data.pagination) {
          // Backend returns { users: [...], pagination: {...} }
          return {
            success: true,
            data: {
              users: data.users,
              pagination: data.pagination,
            },
          };
        } else if (Array.isArray(data)) {
          // Backend returns direct array of users
          return {
            success: true,
            data: {
              users: data,
              pagination: {
                currentPage: page,
                totalPages: Math.ceil(data.length / limit),
                totalUsers: data.length,
                limit: limit,
              },
            },
          };
        } else {
          // Fallback - treat data as users array
          console.warn("Unexpected response structure:", data);
          return {
            success: true,
            data: {
              users: data || [],
              pagination: {
                currentPage: page,
                totalPages: 1,
                totalUsers: Array.isArray(data) ? data.length : 0,
                limit: limit,
              },
            },
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to fetch users",
        };
      }
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      return { success: false, message: error.message };
    }
  }

  // Get single user by ID
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Delete user by ID
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get user analytics/statistics - use dedicated endpoint
  async getUserAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/users`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error in getUserAnalytics:", error);
      return { success: false, message: error.message };
    }
  }

  // Process user data for analytics using real timestamps (fallback method)
  processUserAnalytics(users) {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Count users by time period using actual createdAt timestamps
    const weeklyUsers = users.filter((user) => {
      if (!user.createdAt) return false;
      const userDate = new Date(user.createdAt);
      return userDate >= oneWeekAgo && userDate <= now;
    }).length;

    const monthlyUsers = users.filter((user) => {
      if (!user.createdAt) return false;
      const userDate = new Date(user.createdAt);
      return userDate >= oneMonthAgo && userDate <= now;
    }).length;

    const totalUsers = users.length;

    // Generate monthly data for charts (last 12 months)
    const monthlyData = this.generateMonthlyUserData(users);
    const weeklyData = this.generateWeeklyUserData(users);
    const dailyData = this.generateDailyUserData(users);

    return {
      weeklyUsers,
      monthlyUsers,
      totalUsers,
      monthlyData,
      weeklyData,
      dailyData,
      users,
    };
  }

  // Generate monthly user registration data for the last 12 months
  generateMonthlyUserData(users) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    const monthlyCount = [];

    // Get data for last 12 months
    for (let i = 11; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const count = users.filter((user) => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt);
        return userDate >= targetDate && userDate < nextMonth;
      }).length;

      monthlyCount.push(count);
    }

    return monthlyCount;
  }

  // Generate weekly user registration data for the last 7 days
  generateWeeklyUserData(users) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const weeklyCount = [];

    // Get data for last 7 days
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() - i);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const count = users.filter((user) => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt);
        return userDate >= targetDate && userDate < nextDay;
      }).length;

      weeklyCount.push(count);
    }

    return weeklyCount;
  }

  // Generate daily user registration data for the last 30 days
  generateDailyUserData(users) {
    const now = new Date();
    const dailyCount = [];

    // Get data for last 30 days
    for (let i = 29; i >= 0; i--) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() - i);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const count = users.filter((user) => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt);
        return userDate >= targetDate && userDate < nextDay;
      }).length;

      dailyCount.push(count);
    }

    return dailyCount;
  }

  // Get user analytics from backend (alias for getUserAnalytics)
  async getUserAnalyticsFromBackend() {
    return this.getUserAnalytics();
  }
}

export default new UserService();
