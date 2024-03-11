import { useState } from "react";
import styles from "./style.module.css";
import { resizeImage } from "../../../../../../utils/image";
import commonStyle from "../../../../../_commonStyles/commonStyle.module.css"

export default function ImageBoxComponent({setSelectedImages, selectedImages}) {
  const [isDragging, setIsDragging] = useState(false);
  const [inputKey, setInputKey] = useState(1)
  

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

  const handleChange = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setInputKey(prev => prev + 1)

    const files = e.target.files;

    handleFiles(files);
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && selectedImages.length + (i + 1) <= 10) {
        resizeImage(file, 300, 200, (resizedImage) => {
          setSelectedImages((prev) => [...prev, resizedImage]);
        });
      }
    }
  };

  return (
    <div
      className={`${styles.imageBox} ${isDragging ? styles.dragging : ""} ${commonStyle.WHMax}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="imageUpload" className={`${styles.fileInput}`}>
        {isDragging ? "Drop here" : "Select a file or drag here"}
      </label>
      <input
        key={inputKey}
        type="file"
        id="imageUpload"
        accept="image/*"
        style={{ display: "none" }}
        multiple
        onChange={handleChange}
        className={styles.fileInput}
      />
    </div>
  );
}
