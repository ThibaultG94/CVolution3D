import { useRef, useMemo } from "react";
import * as THREE from "three";
import Lighting from "./Lighting";
import Desk from "./Desk";
import Keyboard from "./Keyboard";
import Laptop from "./Laptop";
import PhotoFrame from "./PhotoFrame";
// import PhotoFrame from "./PhotoFrame";

// Component cable to connect keyboard and laptop
const Cable = ({ start, end, thickness = 0.02, color = 0x222222 }) => {
  const curve = useMemo(() => {
    // Points to create a natural curve
    const startPoint = new THREE.Vector3(...start);
    const endPoint = new THREE.Vector3(...end);
    const midPoint = new THREE.Vector3(
      (startPoint.x + endPoint.x) / 2,
      Math.min(startPoint.y, endPoint.y) - 0.05,
      (startPoint.z + endPoint.z) / 2
    );

    // Create a quadratic curve
    const curve = new THREE.QuadraticBezierCurve3(
      startPoint,
      midPoint,
      endPoint
    );

    return curve;
  }, [start, end]);

  return (
    <mesh>
      <tubeGeometry
        args={[
          curve,
          20, // Segments
          thickness,
          8, // Radial segments
          false, // Closed?
        ]}
      />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

const Workspace = () => {
  // Reference to 3D objects for camera controls
  const laptopRef = useRef();
  const keyboardRef = useRef();
  const photoFrameRef = useRef();

  // Reference dimensions for positioning
  const deskHeight = -0.5; // Desk position Y
  const deskSurfaceY = deskHeight + 0.05; // Height of desk surface

  // Calculated element positions
  const laptopPosition = [0, deskSurfaceY + 0.04, 0]; // Centered on X and Z, slightly raised
  const keyboardPosition = [0, deskSurfaceY + 0.04, 0.0]; // In front of the laptop
  const photoPosition = [-1.8, deskSurfaceY + 0.28, -0.4]; // To the left of the laptop

  return (
    <>
      <Lighting />
      <Desk position={[0, deskHeight, 0]} />
      <Laptop ref={laptopRef} position={laptopPosition} />
      <Keyboard ref={keyboardRef} position={keyboardPosition} />
      <PhotoFrame ref={photoFrameRef} position={photoPosition} />

      {/* Cable from keyboard to laptop */}
      <Cable
        start={[
          keyboardPosition[0],
          keyboardPosition[1] - 0.02,
          keyboardPosition[2] - 0.2,
        ]}
        end={[
          laptopPosition[0],
          laptopPosition[1] + 0.04,
          laptopPosition[2] + 0.3,
        ]}
      />
    </>
  );
};

export default Workspace;
