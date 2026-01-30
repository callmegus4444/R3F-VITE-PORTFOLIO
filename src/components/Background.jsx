import { Sphere, useScroll, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

export const Background = ({ darkMode }) => {
  const material = useRef();
  const sparklesRef = useRef();
  const color = useRef({
    color: "#b9bcff",
  });
  const data = useScroll();
  const tl = useRef();
  const { mouse, viewport } = useThree();

  // Mouse position for particle interaction
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Only trigger color change after scroll passes 0.2
    const scroll = data.scroll.current;
    const mappedScroll = Math.max(0, (scroll - 0.2) / 0.8);
    tl.current.progress(mappedScroll);
    material.current.color = new THREE.Color(color.current.color);

    // Animate sparkles based on mouse - REMOVED GLOBAL SWAY
    // if (sparklesRef.current) {
    //   sparklesRef.current.position.x = mousePos.current.x * 0.05;
    //   sparklesRef.current.position.y = mousePos.current.y * 0.05;
    // }
  });

  useEffect(() => {
    // Recreate timeline when mode changes
    tl.current = gsap.timeline({ paused: true });

    // Initial color set
    color.current.color = darkMode ? "#1a1a1a" : "#b9bcff";
    if (material.current) material.current.color.set(color.current.color);

    if (darkMode) {
      // Dark Mode Scroll Colors (Dark Gray -> Deep Blue -> Midnight)
      tl.current.to(color.current, { color: "#2d3748" }); // Dark Gray
      tl.current.to(color.current, { color: "#1e1b4b" }); // Indigo 950
      tl.current.to(color.current, { color: "#0f172a" }); // Slate 900
    } else {
      // Light Mode Scroll Colors
      tl.current.to(color.current, { color: "#1a1a1a" }); // Black/Dark
      tl.current.to(color.current, { color: "#7a7ca5" }); // Purple/Blue
      tl.current.to(color.current, { color: "#9b96dd" }); // Lighter Purple
    }
  }, [darkMode]);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>

      {/* Snowfall / Sparkle Effect - reacts to mouse */}
      <group ref={sparklesRef}>
        <Sparkles
          count={500}
          scale={35}
          size={6}
          speed={0.4}
          opacity={0.7}
          color={darkMode ? "#ffffff" : "#4f46e5"}
        />
        <Sparkles
          count={250}
          scale={35}
          size={4}
          speed={0.2}
          opacity={0.4}
          color={darkMode ? "#e0e7ff" : "#818cf8"}
        />
      </group>

      {/* Ambient floating particles */}
      <Sparkles
        count={50}
        scale={25}
        size={2}
        speed={0.1}
        opacity={0.3}
        color="#c7d2fe"
      />
    </group>
  );
};
