"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// Tech nodes data distributed across 3D spherical space
const TECH_NODES = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    color: "#61dafb",
    symbol: "⚛",
    level: "95%",
    desc: "Single Page Apps, Custom Hooks, Redux, Performance Tuning",
  },
  {
    id: "nextjs",
    name: "Next.js 14",
    category: "frontend",
    color: "#ffffff",
    symbol: "▲",
    level: "92%",
    desc: "App Router, SSR/SSG, Server Actions, Dynamic SEO",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    color: "#3178c6",
    symbol: "TS",
    level: "90%",
    desc: "Generics, Strict Type Safety, Interfaces, Enterprise Architecture",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    color: "#38bdf8",
    symbol: "🌊",
    level: "95%",
    desc: "Utility-first CSS, Responsive Systems, Micro-interactions",
  },
  {
    id: "threejs",
    name: "Three.js 3D",
    category: "frontend",
    color: "#ff9900",
    symbol: "💎",
    level: "88%",
    desc: "3D WebGL, Procedural Shaders, Interactive Viewports, Physics",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    color: "#68a063",
    symbol: "⚡",
    level: "90%",
    desc: "Event-driven Microservices, Async I/O, High-throughput APIs",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    color: "#e2e8f0",
    symbol: "🚂",
    level: "92%",
    desc: "RESTful architecture, Custom Middlewares, JWT Security",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    color: "#00ed64",
    symbol: "🍃",
    level: "88%",
    desc: "Aggregation Pipelines, Document Modeling, Atlas Scaling",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "backend",
    color: "#00758f",
    symbol: "🐬",
    level: "82%",
    desc: "Relational queries, ACID transactions, Normalized indexing",
  },
  {
    id: "redis",
    name: "Redis Cache",
    category: "backend",
    color: "#dc382d",
    symbol: "🔴",
    level: "80%",
    desc: "In-memory caching, Distributed locks, Session store",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "backend",
    color: "#ffca28",
    symbol: "🔥",
    level: "85%",
    desc: "Auth (OTP/Google), Realtime Firestore, Cloud Storage",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "tools",
    color: "#f05032",
    symbol: "🐙",
    level: "94%",
    desc: "Version Control, Pull Requests, CI/CD GitHub Actions",
  },
  {
    id: "postman",
    name: "Postman API",
    category: "tools",
    color: "#ff6c37",
    symbol: "🚀",
    level: "92%",
    desc: "API automated testing, Environment mocking, Contract tests",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "tools",
    color: "#f38020",
    symbol: "☁️",
    level: "88%",
    desc: "DNS orchestration, Edge caching, DDoS protection",
  },
  {
    id: "seo",
    name: "Dynamic SEO",
    category: "architecture",
    color: "#e37400",
    symbol: "📈",
    level: "90%",
    desc: "Schema JSON-LD, OpenGraph, Web Vitals, Search Indexing",
  },
  {
    id: "rest",
    name: "REST Architecture",
    category: "architecture",
    color: "#a855f7",
    symbol: "⚡",
    level: "92%",
    desc: "Clean code structure, Stateless tokens, Rate limiting",
  },
];

// Helper to create sleek, high-DPI horizontal capsule billboard badges
function createPillTexture(item, isDark) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = 320;
  const h = 96;
  const r = h / 2;

  // Background Capsule
  ctx.beginPath();
  ctx.moveTo(r, 6);
  ctx.lineTo(w - r, 6);
  ctx.arc(w - r, h / 2, r - 6, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(r, h - 6);
  ctx.arc(r, h / 2, r - 6, Math.PI / 2, -Math.PI / 2);
  ctx.closePath();

  // Glass background
  ctx.fillStyle = isDark ? "rgba(10, 14, 28, 0.92)" : "rgba(255, 255, 255, 0.94)";
  ctx.fill();

  // Neon Glowing Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = item.color;
  ctx.shadowColor = item.color;
  ctx.shadowBlur = 12;
  ctx.stroke();

  // Reset shadow for text
  ctx.shadowBlur = 0;

  // Left Circular Indicator
  const circleX = 42;
  const circleY = h / 2;
  ctx.beginPath();
  ctx.arc(circleX, circleY, 20, 0, Math.PI * 2);
  ctx.fillStyle = item.color + "28";
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = item.color;
  ctx.stroke();

  // Symbol inside circle
  ctx.fillStyle = item.color;
  ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(item.symbol, circleX, circleY + 1);

  // Main Tech Name
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
  ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(item.name, 76, circleY - 10);

  // Proficiency percentage badge
  ctx.fillStyle = item.color;
  ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${item.level} Mastery`, 76, circleY + 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export default function TechGalaxy3D({ activeFilter = "all", onSelectTech }) {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeNode, setActiveNode] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  // Stable reference for animation loop
  const runtimeRef = useRef({
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    targetRot: { x: 0.1, y: 0 },
    currentRot: { x: 0.1, y: 0 },
    nodeObjects: [],
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 700;
    let height = container.clientHeight || 460;

    // ── 1. Scene, Camera, Renderer ──
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Centered camera looking directly at origin (0, 0, 0)
    camera.position.set(0, 0, 13.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // ── 2. Studio Lighting ──
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xffffff : 0x555555,
      isDark ? 1.2 : 1.6
    );
    scene.add(ambientLight);

    const pointLightCore = new THREE.PointLight(0xff9900, 4.0, 25);
    pointLightCore.position.set(0, 0, 0);
    scene.add(pointLightCore);

    const dirLightPurple = new THREE.DirectionalLight(0x8b5cf6, 2.0);
    dirLightPurple.position.set(8, 8, 8);
    scene.add(dirLightPurple);

    const dirLightCyan = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLightCyan.position.set(-8, -8, 8);
    scene.add(dirLightCyan);

    // ── 3. Central Quantum Core (Centered at 0, 0, 0) ──
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Geodesic Wireframe Sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff6600,
      emissiveIntensity: 0.9,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Glowing Inner Plasma Sphere
    const plasmaGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0xff8800,
      transparent: true,
      opacity: 0.85,
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    coreGroup.add(plasmaMesh);

    // Concentric Gyro Rings
    const ringMatGold = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff7700,
      emissiveIntensity: 0.5,
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

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.03, 16, 64), ringMatGold);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.025, 16, 64), ringMatCyan);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.02, 16, 64), ringMatPurple);

    ring1.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    ring3.rotation.z = Math.PI / 6;

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // ── 4. Ambient Sparkles ──
    const sparkCount = 240;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const rad = 3.5 + Math.random() * 8.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sparkPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
      sparkPos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
      sparkPos[i * 3 + 2] = rad * Math.cos(ph);
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffaa00,
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkles);

    // ── 5. Spherical Constellation of Tech Nodes (Fibonacci Sphere) ──
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeObjects = [];
    const sphereRadius = 4.6;
    const totalNodes = TECH_NODES.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    TECH_NODES.forEach((tech, i) => {
      // Fibonacci sphere distribution: perfectly uniform on 3D sphere!
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / totalNodes);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.cos(phi);
      const z = sphereRadius * Math.sin(phi) * Math.sin(theta);

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);

      // Glowing Sphere Anchor
      const sphereGeo = new THREE.SphereGeometry(0.24, 20, 20);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        emissive: tech.color,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.8,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeGroup.add(sphereMesh);

      // Outer Halo Ring
      const haloGeo = new THREE.TorusGeometry(0.34, 0.015, 16, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: 0.75,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(haloMesh);

      // Sleek Pill Texture Billboard Sprite
      const texture = createPillTexture(tech, isDark);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.85, 0.55, 1);
      sprite.position.y = 0.5;
      nodeGroup.add(sprite);

      // Connecting Laser Tether Line (to Core center)
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: isDark ? 0.35 : 0.22,
      });
      const tether = new THREE.Line(lineGeo, lineMat);
      scene.add(tether);

      nodesGroup.add(nodeGroup);

      nodeObjects.push({
        group: nodeGroup,
        sphere: sphereMesh,
        halo: haloMesh,
        sprite: sprite,
        tether: tether,
        data: tech,
        basePos: new THREE.Vector3(x, y, z),
      });
    });

    runtimeRef.current.nodeObjects = nodeObjects;

    // ── 6. Interactive Raycasting & Mouse Rotation ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerDown = (e) => {
      runtimeRef.current.isDragging = true;
      runtimeRef.current.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      mouse.x = (cx / width) * 2 - 1;
      mouse.y = -(cy / height) * 2 + 1;

      const state = runtimeRef.current;
      if (state.isDragging) {
        const dx = e.clientX - state.prevMouse.x;
        const dy = e.clientY - state.prevMouse.y;
        state.targetRot.y += dx * 0.007;
        state.targetRot.x = Math.max(-0.6, Math.min(0.6, state.targetRot.x + dy * 0.007));
        state.prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        // Gentle parallax tilt
        state.targetRot.y = mouse.x * 0.3;
        state.targetRot.x = -mouse.y * 0.25;
      }
    };

    const onPointerUp = () => {
      runtimeRef.current.isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const spheres = nodeObjects.map((n) => n.sphere);
      const intersects = raycaster.intersectObjects(spheres);
      if (intersects.length > 0) {
        const hit = nodeObjects.find((n) => n.sphere === intersects[0].object);
        if (hit && onSelectTech) {
          onSelectTech(hit.data);
        }
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("click", onClick);

    // ── 7. Animation Loop ──
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const state = runtimeRef.current;

      // Smooth rotation interpolation
      state.currentRot.x += (state.targetRot.x - state.currentRot.x) * 0.06;
      state.currentRot.y += (state.targetRot.y - state.currentRot.y) * 0.06;

      // Auto rotation when not dragging
      const autoSpinAngle = isRotating ? elapsed * 0.12 : 0;

      nodesGroup.rotation.x = state.currentRot.x;
      nodesGroup.rotation.y = state.currentRot.y + autoSpinAngle;

      // Central core pulse & spin
      coreMesh.rotation.y += delta * 0.6;
      coreMesh.rotation.x += delta * 0.4;
      const corePulse = 1 + Math.sin(elapsed * 2.8) * 0.05;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      ring1.rotation.x += delta * 0.8;
      ring2.rotation.y += delta * 0.7;
      ring3.rotation.z += delta * 0.6;

      // Rotate stardust
      sparkles.rotation.y = elapsed * 0.03;

      // Raycast hover detection
      raycaster.setFromCamera(mouse, camera);
      const hitSpheres = raycaster.intersectObjects(nodeObjects.map((n) => n.sphere));

      if (hitSpheres.length > 0) {
        const hitSphere = hitSpheres[0].object;
        const hitNode = nodeObjects.find((n) => n.sphere === hitSphere);
        if (hitNode) {
          container.style.cursor = "pointer";
          setActiveNode(hitNode.data);
          hitNode.sphere.scale.set(1.5, 1.5, 1.5);
          hitNode.sprite.scale.set(2.2, 0.65, 1);
          hitNode.tether.material.opacity = 0.95;
        }
      } else {
        container.style.cursor = state.isDragging ? "grabbing" : "grab";
        nodeObjects.forEach((n) => {
          n.sphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          n.sprite.scale.lerp(new THREE.Vector3(1.85, 0.55, 1), 0.1);

          // If category filter is active, highlight matching and dim non-matching
          const isMatch = activeFilter === "all" || n.data.category === activeFilter;
          const targetOpacity = isMatch ? (isDark ? 0.35 : 0.22) : 0.06;
          n.tether.material.opacity = THREE.MathUtils.lerp(
            n.tether.material.opacity,
            targetOpacity,
            0.1
          );
          n.sprite.material.opacity = THREE.MathUtils.lerp(
            n.sprite.material.opacity,
            isMatch ? 1 : 0.25,
            0.1
          );
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── 8. Resize Handler ──
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 700;
      height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // ── 9. Cleanup ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("click", onClick);

      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      plasmaGeo.dispose();
      plasmaMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
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
  }, [isDark, activeFilter, isRotating, onSelectTech]);

  return (
    <div
      className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden border backdrop-blur-2xl transition-all duration-300 shadow-[0_0_60px_rgba(255,140,0,0.18)] flex flex-col justify-between"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at center, rgba(16, 22, 42, 0.9) 0%, rgba(6, 8, 20, 0.95) 75%)"
          : "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(246, 248, 252, 0.92) 75%)",
        borderColor: isDark ? "rgba(255, 153, 0, 0.4)" : "rgba(255, 153, 0, 0.55)",
      }}
    >
      {/* ── Top Floating Overlay HUD ── */}
      <div className="relative z-20 flex items-center justify-between p-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-[#ff9900]/40 backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9900] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9900]" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-white">
            3D HOLOGRAPHIC CONSTELLATION
          </span>
        </div>

        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className="pointer-events-auto px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
            borderColor: isRotating ? "#ff9900" : "rgba(255,255,255,0.2)",
            color: isRotating ? "#ff9900" : isDark ? "#fff" : "#111",
          }}
        >
          {isRotating ? "⏸ Pause Orbit" : "▶ Resume Orbit"}
        </button>
      </div>

      {/* ── 3D WebGL Canvas ── */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* ── Bottom HUD Tooltip or Instruction ── */}
      <div className="relative z-20 p-4 pointer-events-none">
        {activeNode ? (
          <div
            className="pointer-events-auto max-w-md mx-auto p-3.5 rounded-2xl border backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] animate-fadeIn transition-all duration-300"
            style={{
              backgroundColor: isDark ? "rgba(10, 14, 28, 0.95)" : "rgba(255, 255, 255, 0.96)",
              borderColor: activeNode.color,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-base">{activeNode.symbol}</span>
                <h4
                  className="text-sm font-black uppercase tracking-tight"
                  style={{ color: activeNode.color }}
                >
                  {activeNode.name}
                </h4>
              </div>
              <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-white/10 text-[#ffaa00]">
                {activeNode.level}
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {activeNode.desc}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-bold uppercase tracking-widest text-gray-300 backdrop-blur-md">
              ✦ Click & Drag to explore in 360° • Hover or Click node to inspect
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
