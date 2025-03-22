import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Workspace from "./components/workspace/Workspace";
import Controls from "./components/ui/Controls";
import Loading from "./components/ui/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {isLoading && <Loading />}

      <Controls />

      <div className="info">
        Utilisez la souris pour explorer le workspace 3D du développeur
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 1.5, 4], fov: 45 }}
        className="canvas"
      >
        <color attach="background" args={["#0c1221"]} />
        <Workspace />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

export default App;
