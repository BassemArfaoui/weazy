import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedImageUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post("http://localhost:3333/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedImageUrl(response.data.data.url); 
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedImageUrl && (
        <div className="mt-4">
          <p className="text-green-600">✅ Upload successful!</p>
          <img src={uploadedImageUrl} alt="Uploaded" className="mt-2 w-64 rounded shadow" />
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-600">❌ {error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
