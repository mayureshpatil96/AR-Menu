import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={2} />;
};

const ModelViewer = ({ modelUrl, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        flexDirection: "column",
      }}
    >
      <div style={{ width: "600px", height: "500px" }}>
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <Environment preset="studio" />
          {modelUrl && <Model modelUrl={modelUrl} />}
          <OrbitControls enableZoom />
        </Canvas>
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          backgroundColor: "#f44336",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ✖ Close
      </button>
    </div>
  );
};

export default ModelViewer;
