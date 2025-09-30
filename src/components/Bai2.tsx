import { useState } from "react";
import axios from "axios";

export default function Bai2() {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const handleUpload = async () => {
    if (files.length === 0) return alert("Chưa chọn ảnh!");

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sondao1");

        return axios.post(
          `https://api.cloudinary.com/v1_1/dq87endkv/image/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      });

      const results = await Promise.all(uploadPromises);
      setUrls(results.map((res) => res.data.secure_url));
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />
      <button onClick={handleUpload}>Upload</button>

      <div
        style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            style={{ width: "150px", borderRadius: "8px" }}
          />
        ))}
      </div>
    </div>
  );
}
