import { useRef, useState, forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Keyboard = forwardRef(({ position }, ref) => {
  const groupRef = useRef();
  const keysRef = useRef({});

  // Key interaction states
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);

  // Strong keyboard tilt (45 degrees)
  const keyboardRotation = Math.PI / 4;

  useEffect(() => {
    // Assign external reference to group
    if (ref) {
      ref.current = groupRef.current;
    }
  }, [ref]);

  // Setting special key colors
  const keyColors = {
    H: 0xe34c26, // HTML
    C: 0x264de4, // CSS
    JS: 0xf7df1e, // JavaScript
    R: 0x61dafb, // React
    TW: 0x38b2ac, // Tailwind
    N: 0x339933, // Node.js
    G: 0xf05032, // Git
    VS: 0x007acc, // VS Code
  };

  // Light keyboard animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle “breathing” effect
      groupRef.current.rotation.x =
        keyboardRotation + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }

    // Animation of hover/press keys
    if (hoveredKey && keysRef.current[hoveredKey]) {
      keysRef.current[hoveredKey].position.y =
        0.06 + Math.sin(state.clock.elapsedTime * 8) * 0.003;
    }

    if (pressedKey && keysRef.current[pressedKey]) {
      keysRef.current[pressedKey].position.y = 0.03; // Key pressed
    }
  });

  // Creating an individual key
  const Key = ({
    x,
    y,
    z,
    label,
    color = 0x454e5f,
    width = 0.15,
    depth = 0.15,
  }) => {
    const keyRef = useRef();
    const keyId = `${label}_${x}_${y}_${z}`;

    useEffect(() => {
      if (keyRef.current) {
        keysRef.current[keyId] = keyRef.current;
      }
    }, [keyId]);

    const isSpecialKey = label in keyColors;
    const keyColor = isSpecialKey ? keyColors[label] : color;

    return (
      <group
        ref={keyRef}
        position={[x, y, z]}
        onPointerOver={() => setHoveredKey(keyId)}
        onPointerOut={() => setHoveredKey(null)}
        onPointerDown={() => setPressedKey(keyId)}
        onPointerUp={() => setPressedKey(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[width, 0.03, depth]} />
          <meshPhongMaterial
            color={keyColor}
            specular={0x222222}
            shininess={30}
          />
        </mesh>

        {/* Key text */}
        {label && label !== " " && (
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width * 0.8, depth * 0.8]} />
            <meshBasicMaterial transparent>
              <canvasTexture
                attach="map"
                image={createKeyLabel(label, isSpecialKey)}
              />
            </meshBasicMaterial>
          </mesh>
        )}
      </group>
    );
  };

  // Function to create key label image
  const createKeyLabel = (text, isSpecial) => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    // Different text colors for different keys
    ctx.fillStyle = isSpecial ? "black" : "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 32, 32);

    return canvas;
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[keyboardRotation, 0, 0]}
    >
      {/* Keyboard base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.1, 0.7]} />
        <meshPhongMaterial
          color={0x344055}
          specular={0x444444}
          shininess={20}
        />
      </mesh>

      {/* Front row - Technology keys */}
      {["H", "C", "JS", "R", "TW", "N", "G", "VS"].map((key, index) => (
        <Key
          key={`tech_${key}`}
          x={-0.76 + index * 0.22}
          y={0.06}
          z={-0.25}
          label={key}
          color={keyColors[key]}
        />
      ))}

      {/* Standard rows */}
      {[
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
      ].map((row, rowIndex) => (
        <group key={`row_${rowIndex}`}>
          {row.map((key, keyIndex) => {
            const offset = rowIndex * 0.03; // Offset for QWERTY effect
            const x = -0.8 + offset + keyIndex * 0.18;
            const z = -0.15 + rowIndex * 0.15;

            return (
              <Key
                key={`std_${key}_${rowIndex}_${keyIndex}`}
                x={x}
                y={0.06}
                z={z}
                label={key}
              />
            );
          })}
        </group>
      ))}

      {/* Space bar */}
      <Key x={0} y={0.06} z={0.3} label=" " width={1.2} depth={0.15} />
    </group>
  );
});

export default Keyboard;
