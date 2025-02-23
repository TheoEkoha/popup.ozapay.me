// components/ImageUploader.js
import React, { useState, useRef } from 'react';

const ImageUploader = ({ onImageSelect }) => {
  const inputElement = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    onImageSelect(file);
  };

  return (
    <div>
     <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: 'none' }}
      ref={(input) => (inputElement = input)}
    />
    </div>
  );
};
export default ImageUploader;