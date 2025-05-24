import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Smiley() {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const [isBlinking, setIsBlinking] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [bounceStart, setBounceStart] = useState<number | null>(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Trigger bounce every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceStart(performance.now());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const timeNow = performance.now();
    const maxEyeOffset = 0.05;
    const maxHeadTiltX = 0.2;
    const maxHeadTiltY = 0.3;

    const group = groupRef.current;
    if (!group) return;

    // Eyes follow
    if (leftEyeRef.current && rightEyeRef.current && !isBlinking) {
      leftEyeRef.current.position.x = -0.3 + mouse.current.x * maxEyeOffset;
      leftEyeRef.current.position.y = 0.3 - mouse.current.y * maxEyeOffset;
      rightEyeRef.current.position.x = 0.3 + mouse.current.x * maxEyeOffset;
      rightEyeRef.current.position.y = 0.3 - mouse.current.y * maxEyeOffset;
    }

    // Floating idle
    let yOffset = Math.sin(t * 2) * 0.05;
    let zRot = Math.sin(t) * 0.05;
    let yRot = mouse.current.x * maxHeadTiltY;

    // Bounce override (no spin)
    if (bounceStart) {
      const elapsed = (timeNow - bounceStart) / 1000;
      if (elapsed < 1) {
        yOffset += Math.sin(elapsed * Math.PI) * 0.5;
      } else {
        setBounceStart(null);
      }
    }

    group.rotation.x = -mouse.current.y * maxHeadTiltX;
    group.rotation.y = yRot;
    group.rotation.z = zRot;
    group.position.y = yOffset;
  });

  return (
    <group ref={groupRef} onClick={() => setIsAngry(!isAngry)}>
      {/* Head */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={isAngry ? 0xff3333 : 0xffff00} />
      </mesh>

      {/* Eyes or Blink */}
      {!isBlinking ? (
        <>
          <mesh ref={leftEyeRef} position={[-0.3, 0.3, 1.01]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.3, 0.3, 1.01]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[-0.3, 0.3, 1.01]}>
            <boxGeometry args={[0.14, 0.03, 0.02]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
          <mesh position={[0.3, 0.3, 1.01]}>
            <boxGeometry args={[0.14, 0.03, 0.02]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
        </>
      )}

      {/* Angry Eyebrows */}
      {isAngry && (
        <>
          <mesh position={[-0.3, 0.43, 1.01]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[0.2, 0.03, 0.01]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
          <mesh position={[0.3, 0.43, 1.01]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.2, 0.03, 0.01]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
        </>
      )}

      {/* Mouth */}
      {!isAngry ? (
        <mesh position={[0, -0.3, 1.01]}>
          <boxGeometry args={[0.4, 0.05, 0.01]} />
          <meshStandardMaterial color={0x000000} />
        </mesh>
      ) : (
        <mesh position={[0, -0.35, 1.01]} rotation={[0, 0, Math.PI]}>
          <boxGeometry args={[0.4, 0.05, 0.01]} />
          <meshStandardMaterial color={0x000000} />
        </mesh>
      )}

      {/* Devil Horns */}
      {isAngry && (
        <>
          <mesh position={[-0.5, 0.9, 0.3]} rotation={[Math.PI / 2, 0, -0.3]}>
            <coneGeometry args={[0.2, 0.6, 16]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
          <mesh position={[0.5, 0.9, 0.3]} rotation={[Math.PI / 2, 0, 0.3]}>
            <coneGeometry args={[0.2, 0.6, 16]} />
            <meshStandardMaterial color={0x000000} />
          </mesh>
        </>
      )}
    </group>
  );
}
