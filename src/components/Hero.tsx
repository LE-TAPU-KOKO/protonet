import { Download, ArrowRight, ArrowDown } from "lucide-react";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Smiley } from "./smily"; // Make sure this path matches your file structure

// Custom shader for the liquid sphere
const liquidVertexShader = `
  uniform float uTime;
  uniform float uNoiseStrength;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Create flowing noise displacement
    float noise1 = snoise(position * 2.0 + uTime * 0.3);
    float noise2 = snoise(position * 4.0 + uTime * 0.5);
    float noise3 = snoise(position * 8.0 + uTime * 0.7);
    
    float displacement = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2) * uNoiseStrength;
    
    vec3 newPosition = position + normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const liquidFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    // Create flowing colors based on position and time
    float colorMix1 = sin(vPosition.x * 3.0 + uTime * 2.0) * 0.5 + 0.5;
    float colorMix2 = sin(vPosition.y * 3.0 + uTime * 1.5) * 0.5 + 0.5;
    float colorMix3 = sin(vPosition.z * 3.0 + uTime * 1.8) * 0.5 + 0.5;
    
    vec3 color = mix(
      mix(uColor1, uColor2, colorMix1),
      uColor3,
      colorMix2 * colorMix3
    );
    
    // Fresnel effect for glow
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);
    
    // Add rim lighting
    float rimLight = fresnel * 1.5;
    color += rimLight * vec3(0.5, 0.3, 1.0);
    
    // Pulsing intensity
    float pulse = sin(uTime * 3.0) * 0.2 + 0.8;
    color *= pulse;
    
    gl_FragColor = vec4(color, 0.9);
  }
`;

const LiquidSphere = ({ containerRef, darkMode = false }) => {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Camera position
    camera.position.set(0, 0, 8);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x8b5cf6, 0.5, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 0.3, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create liquid sphere
    const geometry = new THREE.IcosahedronGeometry(1, 4);
    const material = new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.15 },
        uColor1: { value: new THREE.Color(darkMode ? 0x1e3a8a : 0x8b5cf6) }, // Dark blue in dark mode, purple in light
        uColor2: { value: new THREE.Color(darkMode ? 0x1e40af : 0xec4899) }, // Slightly lighter blue in dark mode, pink in light
        uColor3: { value: new THREE.Color(darkMode ? 0x3b82f6 : 0x06b6d4) }, // Bright blue in dark mode, cyan in light
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(2.5);
    scene.add(mesh);
    meshRef.current = mesh;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const elapsedTime = Date.now() * 0.001;
      
      if (material.uniforms) {
        material.uniforms.uTime.value = elapsedTime;
      }
      
      if (mesh) {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.008;
        mesh.rotation.z += 0.003;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [containerRef, darkMode]);

  return null;
};

const Button = ({ children, size, variant, className, onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const sizeStyles = {
    lg: "h-11 px-8 text-base",
    default: "h-10 py-2 px-4"
  };
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground"
  };
  
  return (
    <button
      className={`${baseStyles} ${sizeStyles[size || 'default']} ${variantStyles[variant || 'default']} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

interface HeroProps {
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const canvasContainerRef = useRef(null);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* 3D Liquid Sphere Background */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0">
        <LiquidSphere containerRef={canvasContainerRef} darkMode={isDarkMode} />
      </div>

      {/* 3D Smiley Face */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-80 h-80 mix-blend-lighten hidden md:block">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} color="#ec4899" intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
          <Smiley />
        </Canvas>
      </div>

      {/* Glowing particles effect */}
      <div className="absolute inset-0 z-5">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Hi, I'm<br />Ramaswamy B
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 backdrop-blur-sm bg-black/20 px-6 py-3 rounded-full">
          Aspiring AI & Data Scientist | TECH Enthusiast
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="default"
            onClick={() => window.open('public/RAM RESUME.pdf', '_blank')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToProjects}
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white backdrop-blur-sm bg-black/20 transition-all duration-300"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            View My Work
          </Button>
        </div>
      </div>

      {/* Down Arrow Scroll Indicator */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-20 flex flex-col items-center animate-bounce cursor-pointer z-20 hover:scale-110 transition-transform" 
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="mt-1 text-sm text-purple-300 font-medium">Scroll</span>
        <ArrowDown className="h-8 w-8 text-purple-400" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-5 pointer-events-none"></div>
    </section>
  );
};