"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function WorkCanvas3D() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // ── 1. Scene, Camera, Renderer ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // ── 2. Floating Cyber Cubes (Project Architecture Blocks) ──
    const cubesGroup = new THREE.Group();
    scene.add(cubesGroup);

    const cubeCount = 14;
    const cubes = [];
    const cubeColors = isDark
      ? [0xff9900, 0x38bdf8, 0xa855f7, 0x10b981, 0xff5500]
      : [0xff9900, 0x0284c7, 0x7c3aed, 0x059669, 0xe11d48];

    for (let i = 0; i < cubeCount; i++) {
      const size = 1.2 + Math.random() * 2.2;
      const geo = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(geo);
      const color = cubeColors[i % cubeColors.length];

      // Glowing Wireframe Edge Cube
      const edgeMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: isDark ? 0.45 : 0.28,
      });
      const wireframe = new THREE.LineSegments(edges, edgeMat);

      // Semi-transparent inner core
      const coreGeo = new THREE.BoxGeometry(size * 0.7, size * 0.7, size * 0.7);
      const coreMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isDark ? 0.08 : 0.04,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);

      const cubeGroup = new THREE.Group();
      cubeGroup.add(wireframe);
      cubeGroup.add(coreMesh);

      // Position distributed in 3D volume around viewer
      cubeGroup.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );

      cubeGroup.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const rotSpeed = {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.006,
      };

      const floatSpeed = 0.5 + Math.random() * 0.8;
      const initialY = cubeGroup.position.y;

      cubesGroup.add(cubeGroup);
      cubes.push({ group: cubeGroup, rotSpeed, floatSpeed, initialY });
    }

    // ── 3. Constellation Node Matrix ──
    const nodeCount = 55;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 70;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0xff9900,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
      blending: THREE.AdditiveBlending,
    });
    const nodesMesh = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodesMesh);

    // ── 4. Ambient Cyber Stardust ──
    const starCount = 280;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 70;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      color: isDark ? 0xa855f7 : 0x64748b,
      transparent: true,
      opacity: isDark ? 0.6 : 0.35,
      blending: THREE.AdditiveBlending,
    });
    const starsMesh = new THREE.Points(starGeo, starMat);
    scene.add(starsMesh);

    // ── 5. Mouse Parallax & Scroll Depth Response ──
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── 6. Resize Handler ──
    const handleResize = () => {
      if (!canvasRef.current) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener("resize", handleResize);

    // ── 7. Animation Loop ──
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX * 4 - targetX) * 0.04;
      targetY += (mouseY * 3 - targetY) * 0.04;

      // Scroll linked camera travel
      const scrollFactor = scrollY * 0.015;
      camera.position.x = targetX;
      camera.position.y = targetY - Math.min(scrollFactor, 18);
      camera.lookAt(0, -Math.min(scrollFactor, 18) * 0.6, 0);

      // Rotate & hover cubes
      cubes.forEach((cube, idx) => {
        cube.group.rotation.x += cube.rotSpeed.x;
        cube.group.rotation.y += cube.rotSpeed.y;
        cube.group.rotation.z += cube.rotSpeed.z;
        cube.group.position.y =
          cube.initialY + Math.sin(elapsedTime * cube.floatSpeed + idx) * 1.5;
      });

      // Slowly rotate stardust
      starsMesh.rotation.y = elapsedTime * 0.02;
      starsMesh.rotation.x = elapsedTime * 0.01;

      // Drift constellation nodes
      const posArr = nodeGeo.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        posArr[i * 3] += nodeVelocities[i].x;
        posArr[i * 3 + 1] += nodeVelocities[i].y;
        posArr[i * 3 + 2] += nodeVelocities[i].z;

        // Wrap around boundaries
        if (Math.abs(posArr[i * 3]) > 35) nodeVelocities[i].x *= -1;
        if (Math.abs(posArr[i * 3 + 1]) > 30) nodeVelocities[i].y *= -1;
        if (Math.abs(posArr[i * 3 + 2]) > 20) nodeVelocities[i].z *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ── 8. Cleanup ──
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose Geometries and Materials
      cubeGeoDispose(scene);
      nodeGeo.dispose();
      nodeMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };

    function cubeGeoDispose(root) {
      root.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: isDark ? 0.85 : 0.65 }}
    />
  );
}
