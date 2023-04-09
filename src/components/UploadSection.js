import React from "react";
import UploadButton from "./UploadButton";

const SupportedTypes = () => <p>(.gltf /.glb)</p>

const UploadSection = ({ onMainModelUpload, onAnimationUpload }) => {
  return (
    <ul className="collection with-header ">
      <li className="collection-header grey darken-3 white-text">
        <h5>Upload File with Character </h5>
        <SupportedTypes />
        <UploadButton onUpload={onMainModelUpload} accept=".gltf,.glb" />
      </li>
      <li className="collection-header grey darken-3 white-text">
        <h5>Upload Animations</h5>
        <SupportedTypes />
        <UploadButton
          onUpload={onAnimationUpload}
          multiple={true}
          accept=".gltf,.glb"
        />
      </li>
    </ul>
  );
};

export default UploadSection;
