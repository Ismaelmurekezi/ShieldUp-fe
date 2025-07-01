const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://ibhews.onrender.com";

class MessageService {
  // Get authorization headers
  getAuthHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  // Get all messages with pagination
  async getAllMessages(page = 1, limit = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/messages?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        }
      );

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

  // Get single message by ID
  async getMessageById(messageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
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

  // Delete message by ID
  async deleteMessage(messageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
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

  // Update message status
  async updateMessageStatus(messageId, status) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/messages/${messageId}/status`,
        {
          method: "PUT",
          headers: this.getAuthHeaders(),
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

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
  async getMessageAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/messages`, {
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
}

export default new MessageService();
