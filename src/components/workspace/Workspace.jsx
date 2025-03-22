import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Lighting from "./Lighting";
import Desk from "./Desk";
import Keyboard from "./Keyboard";
// import Laptop from "./Laptop";
// import PhotoFrame from "./PhotoFrame";

const Workspace = () => {
  // Référence aux objets 3D pour les contrôles de caméra
  const laptopRef = useRef();
  const keyboardRef = useRef();
  const photoFrameRef = useRef();

  return (
    <>
      <Lighting />
      <Desk />
      {/* <Laptop ref={laptopRef} position={[0, 0.5, 0]} /> */}
      <Keyboard ref={keyboardRef} position={[0, -0.3, 0.5]} />
      {/* <PhotoFrame ref={photoFrameRef} position={[-1.5, 0.4, -0.2]} /> */}
    </>
  );
};

export default Workspace;
