import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Loading from "./components/ui/Loading";
import Controls from "./components/ui/Controls";
import { Canvas } from "@react-three/fiber";
import Workspace from "./components/workspace/Workspace";
import { OrbitControls } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
