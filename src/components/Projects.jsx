import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const projects = [
  {
    title: "MY Portfolio",
    url: "https://r3f-wawatmos-final.vercel.app/",
    image: "projects/baking.jpg",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "Hospital System",
    url: "https://github.com/callmegus4444",
    image: "projects/HospitalManagement.png",
    description: "Created a fully secured System using mongoDb , express and react",
  },
  {
    title: "Awwwards Clone",
    url: "https://github.com/callmegus4444/ochi-clone",
    image: "projects/ochiClone..jpg",
    description: "Use React,Gsap and framer motion to clone Awwwards",
  },
  {
    title: "Research Project",
    url: "",
    image: "projects/research.jpg",
    description: "using Deep learning models to detect pre impact fall",
  },
  {
    title: "Gitmate",
    url: "https://github.com/callmegus4444/gitmate",
    image: "projects/gitmate.png",
    description: " GitHub Integration: Link repositories and fetch real commit data",
  },


];

const Project = (props) => {
  const { project, highlighted } = props;
  const background = useRef();
  const bgOpacity = useMotionValue(0.4);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        ref={background}
      >
        <planeGeometry args={[2.5, 2.3]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>

      <motion.group
        animate={{
          scale: hovered ? 1.1 : 1, // Smooth zoom effect on hover
          z: hovered ? 0.2 : 0, // Pop out slightly
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <Image
          scale={[2.4, 1.4, 1]}
          url={project.image}
          toneMapped={false}
          position-y={0.3}
        />
        <Text
          maxWidth={2.2}
          anchorX={"left"}
          anchorY={"top"}
          fontSize={0.22}
          position={[-1.1, -0.5, 0]}
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          maxWidth={2.2}
          anchorX="left"
          anchorY="top"
          fontSize={0.12}
          position={[-1.1, -0.75, 0]}
        >
          {project.description}
        </Text>
      </motion.group>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  // Mobile detection
  const isMobile = viewport.width < 5;

  // Carousel Configuration - Responsive
  const radius = isMobile ? 3 : 4.5;
  const totalProjects = projects.length;
  const angleStep = (2 * Math.PI) / totalProjects;

  // Scale factor for mobile
  const projectScale = isMobile ? 0.6 : 1;

  return (
    <group position-y={-viewport.height * 2 + (isMobile ? 0.5 : 1)}>
      {/* Rotate the entire group to bring current project to front */}
      <motion.group
        animate={{
          rotateY: -currentProject * angleStep,
        }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 40,
        }}
      >
        {projects.map((project, index) => {
          const angle = index * angleStep;
          const x = radius * Math.sin(angle);
          const z = radius * Math.cos(angle);
          const rotY = angle;

          return (
            <motion.group
              key={"project_" + index}
              position={[x, 0, z]}
              rotation={[0, rotY, 0]}
              scale={projectScale}
            >
              <Project
                project={project}
                highlighted={index === currentProject}
              />
            </motion.group>
          );
        })}
      </motion.group>
    </group>
  );
};