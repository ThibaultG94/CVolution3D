const Lighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={2.5} />

      {/* Main light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* More powerful front light */}
      <directionalLight position={[0, 2, 8]} intensity={1} />

      {/* Light from other side to soften shadows */}
      <directionalLight position={[-5, 6, -2]} intensity={0.4} />

      {/* Accent light for laptop screen */}
      <spotLight
        position={[0, 3, 2]}
        angle={0.3}
        penumbra={0.7}
        intensity={1.5}
        color="#ffffff"
        distance={8}
      />

      {/* Accent light for keyboard */}
      <pointLight
        position={[0, 1, 1]}
        color="#61dafb"
        intensity={0.4}
        distance={3}
      />
    </>
  );
};

export default Lighting;
