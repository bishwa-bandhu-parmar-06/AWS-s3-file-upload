import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setError('');

      const response = await axios.post(`${backendUri}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log('Upload successful:', response.data);
      fetchFiles();
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${backendUri}/files`);
      setFiles(response.data?.data || response.data?.files || []);
    } catch (err) {
      console.error('Failed to fetch files:', err);
      setError('Failed to fetch files. Please check your connection.');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <FileUploader 
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        uploading={uploading}
        uploadProgress={uploadProgress}
        error={error}
      />
      <FileList files={files} />
    </div>
  );
};

export default FileUpload;