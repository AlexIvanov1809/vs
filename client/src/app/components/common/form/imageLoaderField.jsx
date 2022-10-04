import React, { useState } from "react";
import fileService from "../../../service/file.service";

const ImageLoaderField = () => {
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState();
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgUrl(reader.result);
  };

  const handleChange = ({ target }) => {
    if (!target.files[0]) {
      return;
    }

    const file = target.files[0];

    setImg(file);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", img);

    const { content } = await fileService.create(formData);
    console.log(content);
  };
  return (
    <div className="container mt-4">
      <div className="card p-3">
        <label htmlFor="file" className="w-25 mt-2 mb-2">
          <img
            src={!imgUrl ? "../img/noFoto/noImg.jpg" : imgUrl}
            alt="No photo"
            className="w-100 mt-2 mb-2"
          />
        </label>
        <input
          type="file"
          id="file"
          className="d-none"
          onChange={handleChange}
          accept="image/*,.png,.jpg,.jpeg,.webp,"
        />

        <button className="btn btn-primary w-25" onClick={handleUpload}>
          Load
        </button>
      </div>
    </div>
  );
};

export default ImageLoaderField;
