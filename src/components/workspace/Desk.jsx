import { useRef } from "react";

const Desk = ({ position = [0, -0.5, 0] }) => {
  const meshRef = useRef();

  const woodColor = "#3c2f22";

  return (
    <mesh ref={meshRef} position={position} receiveShadow>
      <boxGeometry args={[6, 0.1, 3]} />
      <meshStandardMaterial color={woodColor} roughness={0.7} metalness={0.1} />
    </mesh>
  );
};

export default Desk;
