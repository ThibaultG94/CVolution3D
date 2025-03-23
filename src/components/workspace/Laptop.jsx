import { useRef, forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Laptop = forwardRef(({ position }, ref) => {
  const groupRef = useRef();
  const screenRef = useRef();

  // Créer la texture de l'écran une seule fois
  const screenMaterial = useRef();

  // Dimensions du laptop pour positionnement cohérent
  const baseWidth = 1.6;
  const baseDepth = 1;
  const baseHeight = 0.08;
  const screenWidth = 1.6;
  const screenHeight = 1;
  const screenDepth = 0.05;
  const screenTilt = -Math.PI / 6; // 30 degrés

  useEffect(() => {
    if (ref) {
      ref.current = groupRef.current;
    }

    // Créer la texture de l'écran lors du montage du composant
    screenMaterial.current = createScreenTexture();
  }, [ref]);

  // Animation subtile de l'écran
  useFrame((state) => {
    if (screenRef.current) {
      // Légère respiration sur l'axe de rotation (beaucoup plus subtile)
      screenRef.current.rotation.x =
        screenTilt + Math.sin(state.clock.elapsedTime * 0.2) * 0.005;
    }
  });

  // Fonction pour créer la texture de l'écran avec du code React
  const createScreenTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; // Increased resolution
    canvas.height = 768; // Increased resolution
    const context = canvas.getContext("2d");

    // Arrière-plan de l'écran
    context.fillStyle = "#1a1f2c";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Simule du code sur l'écran avec police plus grande
    context.font = "24px monospace"; // Larger font

    const codeLines = [
      'import React from "react";',
      "",
      "const Developer = () => {",
      "  const profile = {",
      '    name: "Jean Albert",',
      '    role: "Développeur Front-end",',
      '    skills: ["React", "JavaScript",',
      '             "Node.js", "Tailwind"],',
      '    passion: "Créer des interfaces',
      '              modernes et intuitives"',
      "  };",
      "",
      "  return (",
      '    <div className="profile">',
      "      // Informations et sections du CV",
      "    </div>",
      "  );",
      "};",
      "",
      "export default Developer;",
    ];

    codeLines.forEach((line, index) => {
      // Coloration syntaxique basique avec couleurs plus vives
      if (
        line.includes("import") ||
        line.includes("const") ||
        line.includes("return") ||
        line.includes("export")
      ) {
        context.fillStyle = "#61affe"; // Bleu pour les mots-clés
      } else if (line.includes(":") && !line.includes("</")) {
        context.fillStyle = "#61dafb"; // Cyan pour les propriétés
      } else if (line.includes('"')) {
        context.fillStyle = "#f78c6c"; // Orange pour les chaînes
      } else if (line.includes("<")) {
        context.fillStyle = "#c792ea"; // Violet pour JSX
      } else {
        context.fillStyle = "#e6e6e6"; // Blanc par défaut
      }
      context.fillText(line, 100, 100 + index * 30); // Adjusted spacing and position
    });

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({
      map: texture,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.2,
      emissiveMap: texture,
    });
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Base du laptop */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[baseWidth, baseHeight, baseDepth]} />
        <meshPhongMaterial
          color={0x2d3748}
          specular={0x111111}
          shininess={30}
        />
      </mesh>

      {/* Écran du laptop */}
      <group
        ref={screenRef}
        position={[0, baseHeight / 2 + screenHeight / 2.2, -baseDepth / 1.5]}
        rotation={[screenTilt, 0, 0]}
      >
        {/* Cadre de l'écran */}
        <mesh castShadow>
          <boxGeometry args={[screenWidth, screenHeight, screenDepth]} />
          <meshPhongMaterial color={0x2d3748} />
        </mesh>

        {/* Face avant de l'écran - fond */}
        <mesh position={[0, 0, screenDepth / 2 + 0.001]}>
          <planeGeometry args={[screenWidth * 0.95, screenHeight * 0.95]} />
          <meshBasicMaterial color="#1a1f2c" />
        </mesh>

        {/* Face avant de l'écran - contenu */}
        {screenMaterial.current && (
          <mesh position={[0, 0, screenDepth / 2 + 0.002]}>
            <planeGeometry args={[screenWidth * 0.9, screenHeight * 0.9]} />
            <primitive object={screenMaterial.current} attach="material" />
          </mesh>
        )}
      </group>

      {/* Joint entre l'écran et la base */}
      <mesh
        position={[0, baseHeight / 2, -baseDepth / 2]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.05, 0.05, baseWidth * 0.9, 16]} />
        <meshPhongMaterial color={0x1e2533} />
      </mesh>

      {/* Support du laptop */}
      {/* <mesh
        castShadow
        position={[0, baseHeight / 2, -baseDepth / 4]}
        rotation={[Math.PI / 12, 0, 0]}
      >
        <boxGeometry args={[baseWidth * 0.5, 0.2, baseDepth * 0.6]} />
        <meshPhongMaterial color={0x2c3443} />
      </mesh> */}
    </group>
  );
});

export default Laptop;
