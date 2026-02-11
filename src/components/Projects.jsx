import { Text, RoundedBox, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useState, useEffect, useMemo } from "react";

export const projects = [
  {
    title: "MY Portfolio",
    url: "https://r3f-wawatmos-final.vercel.app/",
    image: "projects/baking.jpg",
    description:
      "A fully interactive 3D portfolio website built with React Three Fiber, featuring custom Blender models, scroll-based animations, and immersive camera transitions that bring the experience to life.",
  },
  {
    title: "Hospital System",
    url: "https://github.com/callmegus4444",
    image: "projects/HospitalManagement.png",
    description:
      "A comprehensive hospital management platform with secure authentication, patient records, appointment scheduling, and admin dashboards — built using MongoDB, Express, React, and Node.js.",
  },
  {
    title: "Awwwards Clone",
    url: "https://github.com/callmegus4444/ochi-clone",
    image: "projects/ochiClone..jpg",
    description:
      "A pixel-perfect recreation of the Ochi Design Awwwards-winning website, featuring buttery-smooth GSAP animations, Locomotive Scroll parallax effects, and Framer Motion micro-interactions.",
  },
  {
    title: "Research Project",
    url: "https://ieeexplore.ieee.org/document/11354622",
    image: "projects/research.jpg",
    description:
      "An IEEE-published intelligent endpoint protection system that leverages machine learning to detect, analyze, and respond to cybersecurity threats in real-time across enterprise networks.",
  },
  {
    title: "Gitmate",
    url: "https://github.com/callmegus4444/gitmate",
    image: "projects/gitmate.png",
    description:
      "A developer productivity tool that integrates with GitHub to fetch real commit data, visualize repository activity, and provide intelligent insights into your coding workflow and contribution patterns.",
  },
  {
    title: "Movie Recommendation",
    url: "https://github.com/callmegus4444/movies_recommender_system01",
    image: "projects/movie.png",
    description:
      "A visually striking Streamlit web application powered by collaborative filtering and content-based algorithms to recommend personalized movies based on user preferences and viewing history.",
  },
];

// —— Typewriter Text ——
const TypewriterText = ({ text, active, speed = 12, ...props }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.substring(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [active, text, speed]);

  return <Text {...props}>{displayed || " "}</Text>;
};

// Track expanded state — stays expanded until currentProject changes
const expandedAtom = atom(false);

const Project = (props) => {
  const { project, index, isFront, currentProject } = props;
  const [expanded, setExpanded] = useAtom(expandedAtom);

  const isActive = isFront && expanded;
  const [btnHovered, setBtnHovered] = useState(false);

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Collapse when currentProject changes (user clicks next/prev)
  useEffect(() => {
    setExpanded(false);
  }, [currentProject, setExpanded]);

  // Compact card
  const W = isMobile ? 1.6 : 1.4;
  const compactH = isMobile ? 2.2 : 2;

  // Expanded card
  const expW = isMobile ? 2 : 2.8;
  const expH = isMobile ? 2.6 : 3.4;

  const projectImg = useTexture(project.image);

  // Calculate "contain" fit for image — preserve aspect ratio
  const maxImgW = expW - 0.3;
  const maxImgH = expH * 0.3;

  const imgAspect = useMemo(() => {
    if (projectImg.image) {
      return projectImg.image.width / projectImg.image.height;
    }
    return 16 / 9; // fallback
  }, [projectImg]);

  // Contain: fit image within maxImgW x maxImgH without stretching
  let fitW, fitH;
  if (imgAspect > maxImgW / maxImgH) {
    // Image is wider — constrain by width
    fitW = maxImgW;
    fitH = maxImgW / imgAspect;
  } else {
    // Image is taller — constrain by height
    fitH = maxImgH;
    fitW = maxImgH * imgAspect;
  }

  // Same for compact card image
  const compMaxW = W - 0.2;
  const compMaxH = 0.75;
  let compFitW, compFitH;
  if (imgAspect > compMaxW / compMaxH) {
    compFitW = compMaxW;
    compFitH = compMaxW / imgAspect;
  } else {
    compFitH = compMaxH;
    compFitW = compMaxH * imgAspect;
  }

  return (
    <group {...props}>
      {/* ====== COMPACT CARD (default) ====== */}
      <group
        visible={!isActive}
        onPointerOver={(e) => {
          if (!isFront) return;
          e.stopPropagation();
          setExpanded(true); // Expand and STAY expanded
        }}
      >
        <RoundedBox args={[W, compactH, 0.04]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color="#1a1025"
            roughness={0.2}
            metalness={0.5}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
            emissive="#2d1b69"
            emissiveIntensity={0.2}
          />
        </RoundedBox>

        {/* Purple accent top */}
        <mesh position={[0, compactH / 2 - 0.01, 0.025]}>
          <planeGeometry args={[W - 0.1, 0.012]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>

        <group position-z={0.03}>
          <Text
            fontSize={0.1}
            maxWidth={W - 0.2}
            textAlign="center"
            anchorX="center"
            anchorY="top"
            color="white"
            position={[0, compactH / 2 - 0.1, 0]}
          >
            {project.title.toUpperCase()}
          </Text>

          {/* Image — aspect-ratio preserved */}
          <mesh position={[0, 0.15, 0]}>
            <planeGeometry args={[compFitW, compFitH]} />
            <meshBasicMaterial map={projectImg} toneMapped={false} />
          </mesh>

          <mesh position={[0, -0.25, 0]}>
            <planeGeometry args={[W - 0.3, 0.003]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.6} />
          </mesh>

          <Text
            fontSize={0.055}
            maxWidth={W - 0.2}
            textAlign="center"
            anchorX="center"
            anchorY="top"
            color="#a0a0b8"
            position={[0, -0.32, 0]}
            lineHeight={1.3}
          >
            {project.description.substring(0, 55) + "..."}
          </Text>

          <mesh position={[0, -0.6, 0]}>
            <planeGeometry args={[W - 0.3, 0.003]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.6} />
          </mesh>

          <group position={[0, -0.78, 0]}>
            <RoundedBox args={[0.7, 0.18, 0.01]} radius={0.04} smoothness={4}>
              <meshBasicMaterial color="#a855f7" />
            </RoundedBox>
            <Text fontSize={0.06} color="white" anchorX="center" anchorY="middle" position-z={0.01}>
              VIEW →
            </Text>
          </group>
        </group>
      </group>

      {/* ====== EXPANDED CARD (stays until next/prev) ====== */}
      <motion.group
        visible={isActive}
        animate={{
          scale: isActive ? 1 : 0,
          x: isActive ? [0.08, -0.06, 0.04, -0.02, 0] : 0,
          rotateZ: isActive ? [0.01, -0.008, 0.005, -0.002, 0] : 0,
        }}
        transition={{
          scale: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1], // Smooth overshoot
          },
          x: {
            duration: 0.8,
            delay: 0.3,
          },
          rotateZ: {
            duration: 0.8,
            delay: 0.3,
          },
        }}
      >
        <RoundedBox args={[expW, expH, 0.04]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color="#1a1025"
            roughness={0.12}
            metalness={0.65}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={3}
            emissive="#2d1b69"
            emissiveIntensity={0.4}
          />
        </RoundedBox>

        {/* Top accent */}
        <mesh position={[0, expH / 2 - 0.01, 0.025]}>
          <planeGeometry args={[expW - 0.15, 0.012]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>

        {/* Bottom accent */}
        <mesh position={[0, -expH / 2 + 0.01, 0.025]}>
          <planeGeometry args={[expW - 0.15, 0.012]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>

        <group position-z={0.03}>
          {/* Title */}
          <Text
            fontSize={0.11}
            maxWidth={expW - 0.3}
            textAlign="center"
            anchorX="center"
            anchorY="top"
            color="#e9d5ff"
            position={[0, expH / 2 - 0.1, 0]}
          >
            {project.title.toUpperCase()}
          </Text>

          {/* Image — aspect-ratio preserved "contain" fit */}
          <mesh position={[0, expH * 0.13, 0]}>
            <planeGeometry args={[fitW, fitH]} />
            <meshBasicMaterial map={projectImg} toneMapped={false} />
          </mesh>

          {/* Divider */}
          <mesh position={[0, expH * -0.06, 0]}>
            <planeGeometry args={[expW - 0.4, 0.003]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
          </mesh>

          {/* Typewriter description */}
          <TypewriterText
            text={project.description}
            active={isActive}
            speed={12}
            fontSize={0.075}
            maxWidth={expW - 0.3}
            textAlign="left"
            anchorX="center"
            anchorY="top"
            color="#c8c8e0"
            position={[0, expH * -0.1, 0]}
            lineHeight={1.5}
          />

          {/* Divider */}
          <mesh position={[0, -expH / 2 + 0.65, 0]}>
            <planeGeometry args={[expW - 0.4, 0.003]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
          </mesh>

          {/* View button */}
          <group
            position={[0, -expH / 2 + 0.3, 0]}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.url, "_blank");
            }}
            onPointerOver={(e) => { e.stopPropagation(); setBtnHovered(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setBtnHovered(false); }}
          >
            <RoundedBox args={[1.8, 0.38, 0.001]} radius={0.06} smoothness={4}>
              <meshBasicMaterial color={btnHovered ? "#BE185D" : "#a855f7"} />
            </RoundedBox>
            <Text fontSize={0.11} color="white" anchorX="center" anchorY="middle" position-z={0.01}>
              VIEW PROJECT →
            </Text>
          </group>
        </group>
      </motion.group>
    </group >
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [expanded] = useAtom(expandedAtom);

  const isMobile = viewport.width < 5;
  const radius = isMobile ? 2.5 : 4;
  const totalProjects = projects.length;
  const angleStep = (2 * Math.PI) / totalProjects;
  const projectScale = isMobile ? 0.65 : 1;

  return (
    <group position-y={-viewport.height * 2 + (isMobile ? 0.5 : 1)}>
      {/* Dark overlay when expanded */}
      {expanded && (
        <mesh position={[0, 0, -0.5]}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.45} />
        </mesh>
      )}

      <motion.group
        animate={{ rotateY: -currentProject * angleStep }}
        transition={{ duration: 1, type: "spring", stiffness: 40 }}
      >
        {projects.map((project, index) => {
          const angle = index * angleStep;
          const x = radius * Math.sin(angle);
          const z = radius * Math.cos(angle);

          return (
            <motion.group
              key={"project_" + index}
              position={[x, 0, z]}
              rotation={[0, angle, 0]}
              scale={projectScale}
            >
              <Project
                project={project}
                highlighted={index === currentProject}
                index={index}
                isFront={index === currentProject}
                currentProject={currentProject}
              />
            </motion.group>
          );
        })}
      </motion.group>
    </group>
  );
};