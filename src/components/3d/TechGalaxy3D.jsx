"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// Tech stack data for 3D orbital nodes
const TECH_NODES = [
  {
    name: "React.js",
    category: "Frontend Core",
    level: "95%",
    color: "#61dafb",
    accent: "#00b4d8",
    radius: 5.6,
    speed: 0.55,
    phase: 0.0,
    inclination: 0.25,
    desc: "Component architecture, Custom Hooks, Performance optimization",
  },
  {
    name: "Next.js 14",
    category: "Fullstack / SSR",
    level: "92%",
    color: "#ffffff",
    accent: "#ff9900",
    radius: 6.8,
    speed: -0.42,
    phase: 1.1,
    inclination: -0.35,
    desc: "App Router, Server Actions, Dynamic SEO, Hybrid rendering",
  },
  {
    name: "Node.js",
    category: "Backend Engine",
    level: "90%",
    color: "#68a063",
    accent: "#3e8239",
    radius: 6.0,
    speed: 0.48,
    phase: 2.2,
    inclination: 0.45,
    desc: "Asynchronous I/O, Event-driven microservices, Stream processing",
  },
  {
    name: "MongoDB",
    category: "Database Architecture",
    level: "88%",
    color: "#00ed64",
    accent: "#13aa52",
    radius: 7.4,
    speed: -0.36,
    phase: 3.3,
    inclination: 0.15,
    desc: "Schema design, Aggregation pipelines, Indexing & Scaling",
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    level: "90%",
    color: "#3178c6",
    accent: "#235a97",
    radius: 5.2,
    speed: 0.62,
    phase: 4.4,
    inclination: -0.5,
    desc: "Generics, Strict type validation, Interface modeling",
  },
  {
    name: "Tailwind CSS",
    category: "Design System",
    level: "95%",
    color: "#38bdf8",
    accent: "#0284c7",
    radius: 6.4,
    speed: -0.5,
    phase: 5.2,
    inclination: 0.3,
    desc: "Responsive design, JIT compiler, Micro-animations",
  },
  {
    name: "Three.js",
    category: "3D & WebGL",
    level: "85%",
    color: "#ff9900",
    accent: "#ff5500",
    radius: 7.9,
    speed: 0.38,
    phase: 0.8,
    inclination: -0.2,
    desc: "Procedural geometry, Custom shaders, Interactive 3D viewports",
  },
  {
    name: "Express.js",
    category: "REST API",
    level: "90%",
    color: "#e2e8f0",
    accent: "#94a3b8",
    radius: 5.8,
    speed: -0.45,
    phase: 2.8,
    inclination: 0.4,
    desc: "RESTful architecture, JWT security, Middleware pipelines",
  },
];

// Helper to create crisp high-DPI canvas sprite textures
function createNodeTexture(name, color, isDark) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  // Background circle with glow
  const cx = 128;
  const cy = 128;
  const r = 100;

  // Outer ambient glow
  const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 120);
  grad.addColorStop(0, color + (isDark ? "bb" : "dd"));
  grad.addColorStop(0.7, color + "44");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 120, 0, Math.PI * 2);
  ctx.fill();

  // Glass disc background
  ctx.fillStyle = isDark ? "rgba(12, 16, 29, 0.88)" : "rgba(255, 255, 255, 0.92)";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Neon glowing border ring
  ctx.lineWidth = 6;
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.stroke();

  // Text label
  ctx.shadowBlur = 0;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Initials / Short symbol in center
  const words = name.split(" ");
  const symbol = words.length > 1 ? words[0].slice(0, 2) : name.slice(0, 3);

  ctx.fillStyle = color;
  ctx.font = "900 52px system-ui, -apple-system, sans-serif";
  ctx.fillText(symbol.toUpperCase(), cx, cy - 14);

  // Small full name label underneath
  ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
  ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
  ctx.fillText(name, cx, cy + 38);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export default function TechGalaxy3D() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeNode, setActiveNode] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // ── 1. Scene, Camera, Renderer ──
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── 2. Lights ──
    const ambientLight = new THREE.AmbientLight(isDark ? 0xffffff : 0x444444, isDark ? 0.9 : 1.3);
    scene.add(ambientLight);

    const pointLightGold = new THREE.PointLight(0xff9900, 3.5, 30);
    pointLightGold.position.set(0, 0, 0);
    scene.add(pointLightGold);

    const dirLightPurple = new THREE.DirectionalLight(0x8b5cf6, 1.8);
    dirLightPurple.position.set(10, 10, 10);
    scene.add(dirLightPurple);

    const dirLightCyan = new THREE.DirectionalLight(0x06b6d4, 1.2);
    dirLightCyan.position.set(-10, -10, -10);
    scene.add(dirLightCyan);

    // ── 3. Central Quantum Core (Geodesic Pulsing Orb + Rings) ──
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Solid inner plasma core
    const plasmaGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xff7700 : 0xff9900,
      transparent: true,
      opacity: 0.75,
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    coreGroup.add(plasmaMesh);

    // Quantum Gyroscope Rings (Astrolabe)
    const ringMatGold = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff8800,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });

    const ringMatCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
    });

    const ringMatPurple = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.035, 16, 100), ringMatGold);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.03, 16, 100), ringMatCyan);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.025, 16, 100), ringMatPurple);

    ring1.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    ring3.rotation.z = Math.PI / 6;

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // ── 4. Ambient Stardust Particles ──
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colGold = new THREE.Color(0xffb400);
    const colPurple = new THREE.Color(0x9333ea);
    const colCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 11;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.5 ? colGold : Math.random() > 0.5 ? colCyan : colPurple;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.8 : 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 5. Orbiting Tech Nodes ──
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeObjects = [];

    TECH_NODES.forEach((tech, index) => {
      const nodeSubGroup = new THREE.Group();

      // 3D Glowing Sphere Anchor
      const sphereGeo = new THREE.SphereGeometry(0.38, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        emissive: tech.color,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.8,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeSubGroup.add(sphereMesh);

      // Outer Halo Ring
      const haloGeo = new THREE.TorusGeometry(0.55, 0.02, 16, 40);
      const haloMat = new THREE.MeshBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: 0.7,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      nodeSubGroup.add(haloMesh);

      // Billboard Sprite with crisp custom canvas texture
      const texture = createNodeTexture(tech.name, tech.color, isDark);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.5, 1.5, 1);
      sprite.position.y = 0.85;
      nodeSubGroup.add(sprite);

      // Connecting Laser Tether Line (to Core)
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: isDark ? 0.35 : 0.25,
        linewidth: 1,
      });
      const tetherLine = new THREE.Line(lineGeo, lineMat);
      scene.add(tetherLine);

      nodesGroup.add(nodeSubGroup);

      nodeObjects.push({
        group: nodeSubGroup,
        sphere: sphereMesh,
        halo: haloMesh,
        sprite: sprite,
        tether: tetherLine,
        data: tech,
        angle: tech.phase,
      });
    });

    // ── 6. Mouse Interaction & Raycasting ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const targetRotation = new THREE.Vector2(0, 0);
    const currentRotation = new THREE.Vector2(0, 0);

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / width) * 2 - 1;
      mouse.y = -(clientY / height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;
        prevMousePos = { x: e.clientX, y: e.clientY };
      } else {
        // Parallax tilt
        targetRotation.y = mouse.x * 0.35;
        targetRotation.x = -mouse.y * 0.3;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // ── 7. Animation Loop ──
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera / scene tilt interpolation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

      scene.rotation.x = currentRotation.x;
      scene.rotation.y = currentRotation.y + (isRotating ? elapsed * 0.08 : 0);

      // Core pulsing & astrolabe rotations
      coreMesh.rotation.y += delta * 0.6;
      coreMesh.rotation.x += delta * 0.4;
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);

      ring1.rotation.x += delta * 0.8;
      ring1.rotation.y += delta * 0.5;
      ring2.rotation.y += delta * 0.7;
      ring2.rotation.z += delta * 0.4;
      ring3.rotation.z += delta * 0.6;
      ring3.rotation.x += delta * 0.3;

      // Particle rotation
      particles.rotation.y = elapsed * 0.02;

      // Update Tech Orbitals
      nodeObjects.forEach((node) => {
        const t = node.data;
        node.angle += t.speed * delta * 0.8;

        const x = Math.cos(node.angle) * t.radius;
        const z = Math.sin(node.angle) * t.radius;
        const y = Math.sin(node.angle * 2 + t.phase) * (t.radius * t.inclination);

        node.group.position.set(x, y, z);
        node.halo.rotation.z += delta * 1.5;

        // Update tether laser lines to connect to core center
        const linePositions = node.tether.geometry.attributes.position.array;
        // Start: core (0,0,0)
        linePositions[0] = 0;
        linePositions[1] = 0;
        linePositions[2] = 0;
        // End: node position transformed to world
        const worldPos = new THREE.Vector3();
        node.group.getWorldPosition(worldPos);
        linePositions[3] = worldPos.x;
        linePositions[4] = worldPos.y;
        linePositions[5] = worldPos.z;
        node.tether.geometry.attributes.position.needsUpdate = true;
      });

      // Raycast hover detection
      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = nodeObjects.map((n) => n.sphere);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hitSphere = intersects[0].object;
        const hitNode = nodeObjects.find((n) => n.sphere === hitSphere);
        if (hitNode) {
          container.style.cursor = "pointer";
          setActiveNode(hitNode.data);
          hitNode.sphere.scale.set(1.45, 1.45, 1.45);
          hitNode.halo.scale.set(1.3, 1.3, 1.3);
          hitNode.tether.material.opacity = 0.9;
        }
      } else {
        container.style.cursor = isDragging ? "grabbing" : "grab";
        nodeObjects.forEach((n) => {
          n.sphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          n.halo.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          n.tether.material.opacity = isDark ? 0.28 : 0.18;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── 8. Resize Handler ──
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // ── 9. Cleanup ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      // Dispose Three.js objects
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      plasmaGeo.dispose();
      plasmaMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      nodeObjects.forEach((n) => {
        n.sphere.geometry.dispose();
        n.sphere.material.dispose();
        n.halo.geometry.dispose();
        n.halo.material.dispose();
        n.sprite.material.dispose();
        n.tether.geometry.dispose();
        n.tether.material.dispose();
      });

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark, isRotating]);

  return (
    <div
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] rounded-3xl overflow-hidden border backdrop-blur-2xl transition-all duration-300 shadow-[0_0_50px_rgba(255,140,0,0.18)]"
      style={{
        backgroundColor: isDark ? "rgba(6, 8, 20, 0.75)" : "rgba(255, 255, 255, 0.75)",
        borderColor: isDark ? "rgba(255, 153, 0, 0.35)" : "rgba(255, 153, 0, 0.45)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveNode(null);
      }}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge / Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#ff9900]/40 backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9900] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9900]" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-white">
            INTERACTIVE 3D TECH GALAXY
          </span>
        </div>

        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className="pointer-events-auto px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#ff9900]"
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)",
            borderColor: isRotating ? "#ff9900" : "rgba(255,255,255,0.2)",
            color: isRotating ? "#ff9900" : isDark ? "#fff" : "#111",
          }}
        >
          {isRotating ? "⏸ Pause Orbit" : "▶ Resume Orbit"}
        </button>
      </div>

      {/* Floating HUD Tooltip when hovering over a tech node */}
      {activeNode ? (
        <div
          className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md p-4 rounded-2xl border backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] z-20 transition-all duration-300 animate-fadeIn"
          style={{
            backgroundColor: isDark ? "rgba(10, 14, 28, 0.92)" : "rgba(255, 255, 255, 0.95)",
            borderColor: activeNode.color,
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                style={{ backgroundColor: activeNode.color, color: activeNode.color }}
              />
              <h4 className="text-base font-black uppercase tracking-tight" style={{ color: activeNode.color }}>
                {activeNode.name}
              </h4>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-white/10 text-[#ffaa00]">
              {activeNode.level} Mastery
            </span>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            {activeNode.category}
          </p>
          <p className={`text-xs leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {activeNode.desc}
          </p>
        </div>
      ) : (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-300">
            ✦ Drag to rotate 3D view • Hover any node to inspect tech
          </p>
        </div>
      )}
    </div>
  );
}
