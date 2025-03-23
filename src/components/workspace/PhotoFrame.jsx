import { useRef, forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const PhotoFrame = forwardRef(({ position }, ref) => {
  const groupRef = useRef();
  const frameRef = useRef();

  useEffect(() => {
    if (ref) {
      ref.current = groupRef.current;
    }
  }, [ref]);

  // Légère animation du cadre
  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[-Math.PI / 12, 0, 0]}>
      {/* Cadre principal */}
      <group ref={frameRef} rotation={[0, Math.PI / 12, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.6, 0.025]} />
          <meshPhongMaterial color={0x2d3748} />
        </mesh>

        {/* Photo (texture placebo) */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.45, 0.55]} />
          <meshBasicMaterial color={0x888888} />
        </mesh>
      </group>

      {/* Support du cadre */}
      <mesh
        position={[-0, -0.15, -0.12]}
        rotation={[Math.PI / 4, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.25, 0.3, 0.025]} />
        <meshPhongMaterial color={0x2d3748} />
      </mesh>
    </group>
  );
});

export default PhotoFrame;
