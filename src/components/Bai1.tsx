import { useState } from "react";
import axios from "axios";

export default function Bai1() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return alert("Chưa chọn ảnh!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sondao1");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dq87endkv/image/upload`,
        formData
      );

      setUrl(res.data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div style={{ marginTop: 20 }}>
          <img src={url} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}
