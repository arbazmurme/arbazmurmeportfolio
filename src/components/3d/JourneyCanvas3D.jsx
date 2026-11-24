"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function JourneyCanvas3D() {
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
    camera.position.set(0, 15, 36);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // ── 2. Winding 3D Spline Path (Career Journey Curve) ──
    const points = [
      new THREE.Vector3(6, 24, 2),
      new THREE.Vector3(-10, 14, -6),
      new THREE.Vector3(12, 2, 4),
      new THREE.Vector3(-8, -10, -4),
      new THREE.Vector3(10, -22, 6),
      new THREE.Vector3(-4, -34, -2),
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = "centripetal";

    // Glowing Neon Spline Tube
    const tubeGeo = new THREE.TubeGeometry(curve, 140, 0.1, 12, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      transparent: true,
      opacity: isDark ? 0.38 : 0.25,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);

    // ── 3. Traveling Energy Pulses (Photons along the path) ──
    const photonCount = 220;
    const photonGeo = new THREE.BufferGeometry();
    const photonPos = new Float32Array(photonCount * 3);
    const photonOffsets = new Float32Array(photonCount);

    for (let i = 0; i < photonCount; i++) {
      photonOffsets[i] = Math.random();
      const p = curve.getPoint(photonOffsets[i]);
      photonPos[i * 3] = p.x;
      photonPos[i * 3 + 1] = p.y;
      photonPos[i * 3 + 2] = p.z;
    }

    photonGeo.setAttribute("position", new THREE.BufferAttribute(photonPos, 3));
    const photonMat = new THREE.PointsMaterial({
      size: 0.28,
      color: 0xffb400,
      transparent: true,
      opacity: isDark ? 0.9 : 0.65,
      blending: THREE.AdditiveBlending,
    });
    const photonPoints = new THREE.Points(photonGeo, photonMat);
    scene.add(photonPoints);

    // ── 4. Floating 3D Geometric Milestone Crystals ──
    const milestoneNodes = [];
    const markerColors = [0xff9900, 0x38bdf8, 0xa855f7, 0x10b981, 0xff5500];

    points.forEach((pt, idx) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pt);

      const geo = new THREE.OctahedronGeometry(0.85, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: markerColors[idx % markerColors.length],
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.6 : 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      nodeGroup.add(mesh);

      const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: markerColors[idx % markerColors.length],
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      nodeGroup.add(ringMesh);

      const innerGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: markerColors[idx % markerColors.length],
        transparent: true,
        opacity: isDark ? 0.85 : 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      nodeGroup.add(innerMesh);

      scene.add(nodeGroup);
      milestoneNodes.push({ group: nodeGroup, mesh, ring: ringMesh });
    });

    // ── 5. Ambient Stardust Particles ──
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 70;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x8b5cf6,
      transparent: true,
      opacity: isDark ? 0.6 : 0.35,
      blending: THREE.AdditiveBlending,
    });
    const stardust = new THREE.Points(starGeo, starMat);
    scene.add(stardust);

    // ── 6. Scroll Tracking & Mouse Parallax ──
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const onPointerMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.015;
      mouseY = (e.clientY - height / 2) * 0.015;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    onScroll(); // initial sync

    // ── 7. Animation Loop ──
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth scroll interpolation
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

      // Smooth mouse parallax
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // Camera flies down through 3D space as you scroll!
      const cameraY = 16 - scrollProgress * 36;
      camera.position.x = targetMouseX * 1.5 + Math.sin(scrollProgress * Math.PI) * 4;
      camera.position.y = cameraY - targetMouseY * 1.2;
      camera.position.z = 36 - Math.sin(scrollProgress * Math.PI) * 6;
      camera.lookAt(0, cameraY - 4, 0);

      // Faster photon travel when scrolling
      const scrollSpeedBoost = Math.abs(targetScrollProgress - scrollProgress) * 5;
      const photonSpeed = (0.06 + scrollSpeedBoost) * delta;

      const posArray = photonGeo.attributes.position.array;
      for (let i = 0; i < photonCount; i++) {
        photonOffsets[i] = (photonOffsets[i] + photonSpeed) % 1;
        const pt = curve.getPoint(photonOffsets[i]);
        posArray[i * 3] = pt.x;
        posArray[i * 3 + 1] = pt.y;
        posArray[i * 3 + 2] = pt.z;
      }
      photonGeo.attributes.position.needsUpdate = true;

      // Rotate milestone crystals
      milestoneNodes.forEach((node, i) => {
        node.mesh.rotation.x += delta * (0.8 + i * 0.2);
        node.mesh.rotation.y += delta * (0.6 + i * 0.15);
        node.ring.rotation.z += delta * 0.4;
      });

      // Slowly rotate stardust
      stardust.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      onScroll();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-0"
      style={{
        opacity: isDark ? 0.9 : 0.65,
      }}
    />
  );
}
