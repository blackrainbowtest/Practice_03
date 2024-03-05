import { useState } from "react";
import styles from "./style.module.css";

export default function ImageBoxComponent() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    handleFiles(files);
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      console.log("Uploaded file:", file);
    }
  };

  return (
    <div
      className={`${styles.imageBox} ${isDragging ? styles.dragging : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="imageUpload">{isDragging ? "Drop here" : "Select a file or drag here"}</label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        style={{display: "none"}}
        className={styles.fileInput}
      />
      
    </div>
  );
}
