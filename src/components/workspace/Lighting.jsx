const Lighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Main light */}
      <directionalLight
        position={[0, 10, 0]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      {/* Accent light for screen */}
      <pointLight
        position={[0, 1, 0]}
        color="#61dafb"
        intensity={1}
        distance={2}
      />

      {/* Soft front light */}
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
    </>
  );
};

export default Lighting;
