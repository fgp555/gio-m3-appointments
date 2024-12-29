import axios from "axios";

const API_BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api/database" : "/api/database";
// const API_BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api/database" : "https://crefi.giomr.site/api/database";
// const API_BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api/database" : "https://back.fgp.one/api";

const apiDBService = {
  // Get the list of backup files
  getBackups: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/display_backups_files`);
      //   console.log("response.data", response.data);
      return response.data.files;
    } catch (error) {
      throw new Error("Failed to fetch backups: " + error.message);
    }
  },

  // Create a Postgres backup
  createBackup: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create_backup/postgres`);
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to create backup: " + error.message);
    }
  },

  // Download a specific backup
  downloadBackup: async (backupFileName) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/download/${backupFileName}`, {
        responseType: "blob", // Important for file downloads
      });
      return response.data; // The file blob data
    } catch (error) {
      throw new Error("Failed to download backup: " + error.message);
    }
  },

  // Restore a specific backup
  restoreBackup: async (backupFileName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/restore/${backupFileName}`);
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to restore backup: " + error.message);
    }
  },

  // Delete a specific backup
  deleteBackup: async (backupFileName) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${backupFileName}`);
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to delete backup: " + error.message);
    }
  },

  // Upload a backup file
  uploadBackup: async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data

    try {
      const response = await axios.post(`${API_BASE_URL}/upload_backup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set correct content type for file upload
        },
      });
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to upload backup: " + error.message);
    }
  },
};

export default apiDBService;
