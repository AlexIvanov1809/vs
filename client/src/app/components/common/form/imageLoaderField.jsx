import React, { useState } from "react";
import PropTypes from "prop-types";
// import fileService from "../../../service/file.service";

const ImageLoaderField = ({ mainImagePath, type, onChange }) => {
  // const [loadedImg, setLoadedImg] = useState();
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

    onChange(file, type);
    reader.readAsDataURL(file);
  };
  // const handleUpload = async () => {
  //   const newImage = await fileService.create(img, "kg");
  //   setLoadedImg(newImage);
  // };
  // const handleUpdate = async () => {
  //   console.log(img);
  //   const updatedImage = await fileService.edit(img, loadedImg);
  //   console.log(updatedImage);
  // };
  // const handleRemove = async () => {
  //   const { message } = await fileService.remove(loadedImg);
  //   console.log(message);
  // };
  return (
    <div className="container mt-4 mb-4">
      <div className="card p-3">
        <label htmlFor={type} className="">
          <img
            src={!imgUrl ? "../../" + mainImagePath : imgUrl}
            alt="No photo"
            className="w-100 mt-2 mb-2"
          />
        </label>
        <input
          type="file"
          id={type}
          className="d-none"
          onChange={handleChange}
          accept="image/*,.png,.jpg,.jpeg,.webp,"
        />
      </div>
    </div>
  );
};

ImageLoaderField.propTypes = {
  mainImagePath: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};

export default ImageLoaderField;
