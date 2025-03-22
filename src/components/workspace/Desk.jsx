import { useRef } from "react";

const Desk = () => {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]} receiveShadow>
      <boxGeometry args={[6, 0.1, 3]} />
      <meshPhongMaterial color="#2a3042" specular="#222222" shininess={10} />
    </mesh>
  );
};

export default Desk;
