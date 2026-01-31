import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export const rocketModeAtom = atom(false);

export const Rocket = () => {
    const { scene } = useGLTF("/models/rocket.gltf");
    const [rocketMode] = useAtom(rocketModeAtom);
    const rocketRef = useRef();
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;
    const baseScale = isMobile ? 0.02 : 0.035;
    const launchTimeRef = useRef(0);
    const flameRef = useRef();

    useFrame((state) => {
        if (!rocketRef.current) return;

        if (rocketMode) {
            // ... (existing rocket motion logic) ...
            if (launchTimeRef.current === 0) {
                launchTimeRef.current = state.clock.elapsedTime;
            }

            const t = state.clock.elapsedTime - launchTimeRef.current;

            // Phase 1: Fly In (0s - 1s)
            if (t < 1) {
                const progress = t;
                const ease = 1 - Math.pow(1 - progress, 3);
                const startX = viewport.width / 3;
                const startY = -viewport.height * 2 - 5;
                const targetY = -viewport.height * 2;

                rocketRef.current.position.x = startX * (1 - ease);
                rocketRef.current.position.y = startY + (targetY - startY) * ease;
                rocketRef.current.rotation.z = -Math.PI / 4 * (1 - ease);
                rocketRef.current.scale.set(baseScale, baseScale, baseScale);
            }
            // Phase 2: Hover / Ascent (1s - 5s)
            else if (t < 5) {
                rocketRef.current.position.x = 0;
                rocketRef.current.position.y = -viewport.height * 2 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
                rocketRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.05;
                rocketRef.current.scale.set(baseScale, baseScale, baseScale);
            }
            // Phase 3: Fly Out (5s+) target: clear screen by t=7
            else {
                const exitT = t - 5;
                rocketRef.current.position.y = -viewport.height * 2 + (exitT * exitT * 50);

                // Dynamic Shrink
                const shrinkFactor = Math.max(0, 1 - (exitT / 2));
                const newScale = (baseScale * 0.3) + (baseScale * 0.7 * shrinkFactor);
                rocketRef.current.scale.set(newScale, newScale, newScale);
            }

            rocketRef.current.rotation.y += 0.05;

            // Animate Flame
            if (flameRef.current) {
                flameRef.current.scale.y = 1 + Math.random() * 0.5; // Flicker length
                flameRef.current.scale.x = 1 + Math.random() * 0.2; // Flicker width
            }

        } else {
            launchTimeRef.current = 0;
            if (rocketRef.current) {
                rocketRef.current.scale.set(baseScale, baseScale, baseScale);
            }
        }
    });

    return (
        <group
            ref={rocketRef}
            position={[0, -100, 0]}
            visible={rocketMode}
            scale={[baseScale, baseScale, baseScale]}
        >
            <primitive object={scene} />

            {/* Dynamic Particle Fire - Scaled & Positioned */}
            <group position={[0, -15, 0]} scale={[30, 30, 30]}>
                <ParticleFire />
            </group>
        </group>
    );
};

const ParticleFire = () => {
    const { viewport } = useThree();
    const fireRef = useRef();

    // Custom Shader for Fire/Smoke
    const fireMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color("#f27d0c") }, // Orange
            uColorEnd: { value: new THREE.Color("#b72f17") },   // Red
        },
        vertexShader: `
      uniform float uTime;
      attribute float aTimeOffset;
      attribute float aSpeed;
      attribute float aSize;
      varying float vLife;
      
      void main() {
        // Continuous cycle 0..1
        float life = mod(uTime * aSpeed + aTimeOffset, 1.0);
        vLife = life;
        
        // Move DOWN (Negative Y)
        vec3 pos = position;
        pos.y -= life * 10.0; // Drop distance
        
        // Spread Out (Cone shape)
        pos.x += position.x * life * 2.0; 
        pos.z += position.z * life * 2.0;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Size attenuation fading with life
        gl_PointSize = aSize * (150.0 / -mvPosition.z) * (1.2 - life); 
      }
    `,
        fragmentShader: `
      uniform vec3 uColorStart;
      uniform vec3 uColorEnd;
      varying float vLife;
      
      void main() {
        // Circular Particle
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        
        // Soft edge glow
        float alpha = 1.0 - smoothstep(0.2, 0.5, d);
        
        // Color transition
        vec3 color = mix(uColorStart, uColorEnd, vLife);
        
        gl_FragColor = vec4(color, alpha * (1.0 - vLife)); // Fade out
      }
    `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }), []);

    // Generate Particles
    const count = 300; // Count for the tail
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const pos = [];
        const timeOffset = [];
        const speed = [];
        const size = [];

        for (let i = 0; i < count; i++) {
            // Start in a small disk at origin
            pos.push((Math.random() - 0.5) * 0.5); // X
            pos.push(0);                           // Y (Top)
            pos.push((Math.random() - 0.5) * 0.5); // Z

            timeOffset.push(Math.random());
            speed.push(0.5 + Math.random() * 0.5);
            size.push(10 + Math.random() * 20); // Base size
        }

        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        geo.setAttribute('aTimeOffset', new THREE.Float32BufferAttribute(timeOffset, 1));
        geo.setAttribute('aSpeed', new THREE.Float32BufferAttribute(speed, 1));
        geo.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1));
        return geo;
    }, []);

    useFrame((state) => {
        if (fireMaterial) {
            fireMaterial.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return <points ref={fireRef} geometry={geometry} material={fireMaterial} />;
};
