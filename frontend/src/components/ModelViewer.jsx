import React from "react";
import "@google/model-viewer";

const ModelViewer = ({ modelPath }) => {
  return (
    <model-viewer
      src={modelPath}
      alt="3D Model"
      ar
      ar-modes="webxr scene-viewer quick-look"
      environment-image="neutral"
      auto-rotate
      camera-controls
      style={{ width: "100%", height: "300px", borderRadius: "12px" }}
    ></model-viewer>
  );
};

export default ModelViewer;
