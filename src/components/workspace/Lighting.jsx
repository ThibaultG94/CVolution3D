const Lighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={5} />

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

      {/* Accent light for screen */}
      <pointLight
        position={[0, 1, 0]}
        color="#61dafb"
        intensity={0.8}
        distance={3}
      />
    </>
  );
};

export default Lighting;
