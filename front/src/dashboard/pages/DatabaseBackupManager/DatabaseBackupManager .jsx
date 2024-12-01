import React, { useState, useEffect } from "react";
import apiService from "./apiDBService"; // Adjust the path to where apiService.js is located
import "./DatabaseBackupManager.css";
import Swal from "sweetalert2";

const DatabaseBackupManager = () => {
  const [backups, setBackups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State for selected file
  const [fileName, setFileName] = useState(""); // State to store the file name

  useEffect(() => {
    // Fetch backups when the component mounts
    const fetchBackups = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getBackups();
        setBackups(data);
      } catch (err) {
        setError("Failed to fetch backups");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    const confirmCreate = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create a new backup?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, create",
      cancelButtonText: "Cancel",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmCreate.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiService.createBackup();
      setError(null);

      Swal.fire({
        title: "Success!",
        text: "The backup has been successfully created.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });

      // Add a slight delay to ensure the new backup has been created on the backend
      setTimeout(async () => {
        const data = await apiService.getBackups();
        setBackups(data); // Refresh the backup list
      }, 1000); // 1-second delay to allow time for backend processing
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to create backup.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
      setError("Failed to create backup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadBackup = async (backupFileName) => {
    const confirmDownload = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to download the backup "${backupFileName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, download",
      cancelButtonText: "Cancel",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmDownload.isConfirmed) return;

    try {
      const fileData = await apiService.downloadBackup(backupFileName);
      // Create a link and trigger file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileData);
      link.download = backupFileName;
      link.click();

      Swal.fire({
        title: "Success!",
        text: `The backup "${backupFileName}" has been successfully downloaded.`,
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `Failed to download the backup "${backupFileName}".`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
      setError("Failed to download backup");
    }
  };

  const handleRestoreBackup = async (backupFileName) => {
    const confirmRestore = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to restore the backup "${backupFileName}"? This will overwrite current data.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, restore",
      cancelButtonText: "Cancel",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmRestore.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiService.restoreBackup(backupFileName);
      const data = await apiService.getBackups(); // Refresh backup list
      setBackups(data);

      Swal.fire({
        title: "Success!",
        text: `The backup "${backupFileName}" has been successfully restored.`,
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `Failed to restore the backup "${backupFileName}".`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
      setError("Failed to restore backup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBackup = async (backupFileName) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiService.deleteBackup(backupFileName);
      const data = await apiService.getBackups(); // Refresh backup list

      Swal.fire({
        title: "Deleted!",
        text: "The backup has been successfully deleted.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });

      setBackups(data);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: error.message || "The backup could not be deleted.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
      setError("Failed to delete backup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    setFile(selectedFile); // Set the selected file to state
    setFileName(selectedFile.name); // Set the file name
  };

  const handleUploadBackup = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!file) {
      Swal.fire({
        title: "Error",
        text: "Please select a file to upload.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
      return;
    }

    const confirmUpload = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to upload the selected backup file?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, upload",
      cancelButtonText: "Cancel",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmUpload.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiService.uploadBackup(file); // Upload the selected file
      setError(null);
      setFile(null); // Clear the file input after successful upload
      setFileName(""); // Clear the file name after upload

      const data = await apiService.getBackups();
      setBackups(data);

      Swal.fire({
        title: "Success!",
        text: "The backup has been successfully uploaded.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to upload the backup file.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });
      setError("Failed to upload backup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="DatabaseBackupManager">
      <h1>Database Backup Manager</h1>
      <section>
        {isLoading && <p>Loading...</p>}

        <h2>Create Backup</h2>
        {error && <p className="error">{error}</p>}
        <button onClick={handleCreateBackup}>Create Backup</button>
      </section>

      <section>
        <h3>Existing Backups:</h3>
        <ul>
          {backups.length === 0 ? (
            <p>No backups available</p>
          ) : (
            backups.map((backup) => (
              <li key={backup}>
                <span>{backup}</span>
                <article className="hide_on_mobile ">
                  <button onClick={() => handleDownloadBackup(backup)}>
                    <i className="icon-download"></i>
                  </button>
                  <button onClick={() => handleRestoreBackup(backup)}>
                    <i className="icon-reload"></i>
                  </button>
                  <button className="danger" onClick={() => handleDeleteBackup(backup)}>
                    <i className="icon-trash"></i>
                  </button>
                </article>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h2>Upload Backup</h2>
        {/* File upload form */}
        <form onSubmit={handleUploadBackup}>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
          <label htmlFor="fileInput" className="file-label">
            Choose File
          </label>
          <button type="submit">
            <i className="icon-upload"></i>
          </button>
        </form>

        {/* Display the selected file name if a file is selected */}
        {fileName && (
          <p>
            Selected file: <strong>{fileName}</strong>
          </p>
        )}
      </section>
    </div>
  );
};

export default DatabaseBackupManager;
