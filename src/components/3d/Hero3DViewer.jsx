"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useTheme } from "@/context/ThemeContext";

export default function Hero3DViewer() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState("3d"); // "3d" | "photo"
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);

  // References to communicate with Three.js loop
  const sceneStateRef = useRef({
    modelGroup: null,
    materials: [],
    targetRotation: { x: 0.2, y: 0 },
    currentRotation: { x: 0.2, y: 0 },
    zoom: 1,
    targetZoom: 1,
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    resetFlag: false,
  });

  // Toggle wireframe on all meshes of model
  const toggleWireframe = () => {
    const nextState = !isWireframe;
    setIsWireframe(nextState);
    sceneStateRef.current.materials.forEach((mat) => {
      mat.wireframe = nextState;
    });
  };

  // Reset model orientation & zoom
  const resetOrientation = () => {
    sceneStateRef.current.targetRotation.x = 0.2;
    sceneStateRef.current.targetRotation.y = 0;
    sceneStateRef.current.targetZoom = 1;
  };

  useEffect(() => {
    if (activeTab !== "3d") return;

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 500;

    // ── 1. Scene, Camera, Renderer ──
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 9.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ── 2. Lights ──
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xffffff : 0x555555,
      isDark ? 1.4 : 1.8
    );
    scene.add(ambientLight);

    // Key Light: Golden Amber from top front
    const keyLight = new THREE.DirectionalLight(0xff9900, 3.5);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    // Rim Light: Cyber Purple from back left
    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);

    // Fill Light: Soft Cyan from bottom right
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(5, -3, 3);
    scene.add(fillLight);

    // Center pedestal light
    const pedestalLight = new THREE.PointLight(0xff9900, 2.2, 10);
    pedestalLight.position.set(0, -1.8, 0);
    scene.add(pedestalLight);

    // ── 3. Holographic Stage Pedestal & Rings ──
    const stageGroup = new THREE.Group();
    stageGroup.position.y = -1.9;
    scene.add(stageGroup);

    // Platform disc
    const discGeo = new THREE.CylinderGeometry(3.2, 3.4, 0.2, 48);
    const discMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0c101d : 0xe2e8f0,
      roughness: 0.3,
      metalness: 0.85,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    stageGroup.add(discMesh);

    // Outer Glowing Rings
    const ringGeo1 = new THREE.TorusGeometry(3.35, 0.035, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2;
    stageGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2;
    stageGroup.add(ringMesh2);

    // ── 4. Ambient Sparkles / Embers ──
    const sparkCount = 180;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 8;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0xffaa00,
      transparent: true,
      opacity: isDark ? 0.75 : 0.55,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkles);

    // ── 5. Load 3D Spider Model ──
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    sceneStateRef.current.modelGroup = modelGroup;
    sceneStateRef.current.materials = [];

    const loader = new GLTFLoader();
    setIsLoading(true);
    setLoadError(null);

    loader.load(
      "/models/spider.glb",
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.x -= center.x;
        root.position.y -= center.y;
        root.position.z -= center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5.2 / maxDim;
        root.scale.set(scale, scale, scale);

        // Enhance materials
        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];
              materials.forEach((mat) => {
                if (!sceneStateRef.current.materials.includes(mat)) {
                  mat.roughness = 0.28;
                  mat.metalness = 0.72;
                  mat.wireframe = isWireframe;
                  sceneStateRef.current.materials.push(mat);
                }
              });
            }
          }
        });

        modelGroup.add(root);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(pct);
        }
      },
      (err) => {
        console.error("Error loading spider.glb:", err);
        setLoadError("Failed to load 3D model.");
        setIsLoading(false);
      }
    );

    // ── 6. Mouse Interaction & Orbit Controls ──
    const handlePointerDown = (e) => {
      sceneStateRef.current.isDragging = true;
      sceneStateRef.current.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const state = sceneStateRef.current;
      if (state.isDragging) {
        const deltaX = e.clientX - state.prevMouse.x;
        const deltaY = e.clientY - state.prevMouse.y;
        state.targetRotation.y += deltaX * 0.009;
        state.targetRotation.x = Math.max(
          -0.8,
          Math.min(0.8, state.targetRotation.x + deltaY * 0.009)
        );
        state.prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle Parallax
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / height) * 2 - 1);
        camera.position.x = nx * 0.6;
        camera.position.y = 3.2 + ny * 0.4;
        camera.lookAt(0, 0, 0);
      }
    };

    const handlePointerUp = () => {
      sceneStateRef.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const state = sceneStateRef.current;
      const zoomDelta = e.deltaY * 0.001;
      state.targetZoom = Math.max(0.65, Math.min(1.5, state.targetZoom - zoomDelta));
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // ── 7. Animation Loop ──
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const state = sceneStateRef.current;

      // Auto rotation when enabled & not dragging
      if (isAutoSpin && !state.isDragging) {
        state.targetRotation.y += delta * 0.5;
      }

      // Smooth interpolation for rotation & zoom
      state.currentRotation.x += (state.targetRotation.x - state.currentRotation.x) * 0.08;
      state.currentRotation.y += (state.targetRotation.y - state.currentRotation.y) * 0.08;
      state.zoom += (state.targetZoom - state.zoom) * 0.08;

      modelGroup.rotation.x = state.currentRotation.x;
      modelGroup.rotation.y = state.currentRotation.y;
      modelGroup.scale.set(state.zoom, state.zoom, state.zoom);

      // Subtle breathing floating motion
      modelGroup.position.y = Math.sin(elapsed * 1.8) * 0.08;

      // Rotate stage rings in opposite directions
      ringMesh1.rotation.z += delta * 0.4;
      ringMesh2.rotation.z -= delta * 0.3;

      // Sparkles drift
      sparkles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // ── 8. Resize Handler ──
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 450;
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
      container.removeEventListener("wheel", handleWheel);

      renderer.dispose();
      discGeo.dispose();
      discMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeTab, isDark, isAutoSpin, isWireframe]);

  return (
    <div
      className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] aspect-[4/5] min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] rounded-3xl overflow-hidden p-3 sm:p-4 backdrop-blur-2xl border-2 transition-all duration-300 shadow-[0_0_50px_rgba(255,140,0,0.3)] flex flex-col justify-between"
      style={{
        backgroundColor: isDark ? "rgba(12, 16, 29, 0.88)" : "rgba(255, 255, 255, 0.9)",
        borderColor: isDark ? "rgba(255, 153, 0, 0.75)" : "rgba(255, 153, 0, 0.85)",
      }}
    >
      {/* ── Top Header Controls & Mode Switcher ── */}
      <div className="relative z-30 flex items-center justify-between gap-2 mb-2">
        {/* Toggle between 3D Model and Photo */}
        <div className="inline-flex p-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
          <button
            onClick={() => setActiveTab("3d")}
            className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
              activeTab === "3d"
                ? "bg-gradient-to-r from-[#ff9900] to-[#ff5500] text-black shadow-[0_0_15px_rgba(255,153,0,0.6)]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            🕷️ 3D Model
          </button>
          <button
            onClick={() => setActiveTab("photo")}
            className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
              activeTab === "photo"
                ? "bg-gradient-to-r from-[#ff9900] to-[#ff5500] text-black shadow-[0_0_15px_rgba(255,153,0,0.6)]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            👤 Photo
          </button>
        </div>

        {/* Live Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
            {activeTab === "3d" ? "REALTIME 3D" : "AVAILABLE"}
          </span>
        </div>
      </div>

      {/* ── Main Viewport Area ── */}
      <div className="relative flex-1 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
        {activeTab === "3d" ? (
          <>
            {/* WebGL Canvas */}
            <div
              ref={containerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-20">
                <div className="w-12 h-12 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-[#ff9900]">
                    Loading 3D Spider Model...
                  </p>
                  <p className="text-[11px] font-bold text-gray-400 mt-1">
                    {loadingProgress > 0 ? `${loadingProgress}%` : "Decoding Geometry"}
                  </p>
                </div>
              </div>
            )}

            {loadError && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 text-center z-20">
                <p className="text-sm font-bold text-red-400">{loadError}</p>
              </div>
            )}
          </>
        ) : (
          /* Fixed, High-Res Photo Mode */
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Halo ring behind photo */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[#ff9900] shadow-[0_0_45px_rgba(255,140,0,0.85)] pointer-events-none" />

            {/* Photo */}
            <div className="relative w-full h-full">
              <Image
                src="/about.png"
                alt="Arbaz Murme"
                fill
                priority
                className="object-contain object-bottom transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 340px, 450px"
              />
            </div>

            {/* Gradient shadow at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      {/* ── Bottom Controls & Hint Bar ── */}
      <div className="relative z-30 mt-2 flex items-center justify-between gap-2 pt-1 border-t border-white/10">
        {activeTab === "3d" ? (
          <>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsAutoSpin((prev) => !prev)}
                title="Toggle Auto Spin"
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border backdrop-blur-md transition-all duration-200 hover:scale-105 ${
                  isAutoSpin
                    ? "bg-[#ff9900]/20 border-[#ff9900] text-[#ff9900]"
                    : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                {isAutoSpin ? "⏸ Pause" : "▶ Spin"}
              </button>

              <button
                onClick={resetOrientation}
                title="Reset View"
                className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 hover:border-[#ff9900] hover:text-[#ff9900] transition-all"
              >
                ↺ Reset
              </button>

              <button
                onClick={toggleWireframe}
                title="Toggle Wireframe Mesh"
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border backdrop-blur-md transition-all duration-200 ${
                  isWireframe
                    ? "bg-[#ff9900]/20 border-[#ff9900] text-[#ff9900]"
                    : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                🕸 Mesh
              </button>
            </div>

            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Drag • Scroll Zoom
            </p>
          </>
        ) : (
          <div className="w-full text-center py-0.5">
            <p className="text-[11px] font-bold text-[#ff9900]">
              Arbaz Murme • MERN & 3D Web Specialist
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

