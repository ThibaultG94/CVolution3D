import { useRef, useState, forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const Keyboard = forwardRef(({ position }, ref) => {
  const groupRef = useRef();
  const keysRef = useRef({});

  // Key interaction states
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);

  // Keyboard tilt
  const keyboardRotation = Math.PI / 15;

  const keySpacingX = 0.11; // Horizontal space between keys

  useEffect(() => {
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

  // More subtle hover animation
  useFrame(() => {
    if (hoveredKey && keysRef.current[hoveredKey]) {
      keysRef.current[hoveredKey].position.y =
        0.06 + Math.sin(Date.now() * 0.005) * 0.001;
    }

    if (pressedKey && keysRef.current[pressedKey]) {
      keysRef.current[pressedKey].position.y = 0.04;
    }
  });

  // Creating an individual key
  const Key = ({
    x,
    y,
    z,
    label,
    color = 0x454e5f,
    width = 0.1,
    depth = 0.1,
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
          <boxGeometry args={[width * 0.93, 0.03, depth * 0.93]} />
          <meshPhongMaterial
            color={keyColor}
            specular={0x222222}
            shininess={30}
          />
        </mesh>

        {/* Key text */}
        {label && label !== " " && (
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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

    ctx.fillStyle = isSpecial ? "black" : "white";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 32, 32);

    return canvas;
  };

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1] + 0.05, position[2]]}
      rotation={[keyboardRotation, 0, 0]}
    >
      {/* Keyboard base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.1, 0.7]} />
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
          x={-0.4 + index * keySpacingX}
          y={0.06}
          z={-0.25}
          label={key}
          color={keyColors[key]}
        />
      ))}

      {/* AZERTY - first row of digits */}
      {["&", "é", '"', "'", "(", "-", "è", "_", "ç", "à"].map((key, index) => (
        <Key
          key={`num_${key}`}
          x={-0.55 + index * keySpacingX}
          y={0.06}
          z={-0.14}
          label={key}
        />
      ))}

      {/* AZERTY - second row */}
      {["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key, index) => (
        <Key
          key={`row1_${key}`}
          x={-0.5 + index * keySpacingX}
          y={0.06}
          z={-0.03}
          label={key}
        />
      ))}

      {/* AZERTY - third row */}
      {["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"].map((key, index) => (
        <Key
          key={`row2_${key}`}
          x={-0.45 + index * keySpacingX}
          y={0.06}
          z={0.08}
          label={key}
        />
      ))}

      {/* AZERTY - fourth row */}
      {["W", "X", "C", "V", "B", "N", ",", ";", ":", "!"].map((key, index) => (
        <Key
          key={`row3_${key}`}
          x={-0.4 + index * keySpacingX}
          y={0.06}
          z={0.19}
          label={key}
        />
      ))}

      {/* Space bar - positioned in the center and on the bayse */}
      <Key x={0} y={0.06} z={0.3} label=" " width={0.8} depth={0.08} />
    </group>
  );
});

export default Keyboard;
