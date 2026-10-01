"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 150;
const FRAME_PATH = "/video_150_frames";

/**
 * Returns zero-padded frame filename: frame_001.png to frame_150.png
 */
const getFrameSrc = (index) => {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PATH}/frame_${padded}.png`;
};

export default function ScrollImageSequence({ containerRef, isDark = true }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Map()); // Map<number, HTMLImageElement>
  const loadedIndicesRef = useRef(new Set());
  const targetFrameRef = useRef(TOTAL_FRAMES);
  const currentFrameRef = useRef(TOTAL_FRAMES);
  const lastDrawnImageRef = useRef(null);
  const rafIdRef = useRef(null);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);

  // Find the closest loaded frame to the requested index to prevent blank frames or freezes
  const getClosestLoadedImage = useCallback((targetIndex) => {
    if (loadedIndicesRef.current.has(targetIndex)) {
      return imagesRef.current.get(targetIndex);
    }
    if (loadedIndicesRef.current.size === 0) return null;

    // Search outwards from targetIndex
    let bestIndex = -1;
    let minDiff = Infinity;
    for (const idx of loadedIndicesRef.current) {
      const diff = Math.abs(idx - targetIndex);
      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = idx;
      }
    }
    return bestIndex !== -1 ? imagesRef.current.get(bestIndex) : null;
  }, []);

  // Draw frame on canvas with aspect-fill (cover) and DPR support
  const renderFrame = useCallback((frameIndex, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = getClosestLoadedImage(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (!forceRedraw && lastDrawnImageRef.current === img && canvas.width > 0 && canvas.height > 0) {
      return;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover calculation (fills entire canvas without distortion or visible edges)
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = iw * ratio;
    const drawH = ih * ratio;
    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, drawX, drawY, drawW, drawH);

    lastDrawnImageRef.current = img;
  }, [getClosestLoadedImage]);

  // Adjust canvas buffer dimensions to match retina/DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width || window.innerWidth || 1280;
    const h = rect.height || window.innerHeight || 720;
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      // Force redraw on resize
      renderFrame(Math.round(currentFrameRef.current), true);
    }
  }, [renderFrame]);

  // Progressive preloading strategy (Reversed: starts from frame 150)
  useEffect(() => {
    let isCancelled = false;

    // Helper to load an individual frame
    const loadImage = (index) => {
      if (imagesRef.current.has(index)) return Promise.resolve(imagesRef.current.get(index));

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameSrc(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current.set(index, img);
            loadedIndicesRef.current.add(index);
            if (index === TOTAL_FRAMES) {
              setInitialFrameLoaded(true);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // 1. Immediately load Frame 150 (instant first paint for reversed scroll)
    loadImage(TOTAL_FRAMES).then(() => {
      if (isCancelled) return;
      resizeCanvas();
      renderFrame(TOTAL_FRAMES);

      // 2. Preload coarse keyframes downwards (150, 140, 130... 10, 1)
      const keyframes = [];
      for (let i = TOTAL_FRAMES - 10; i >= 1; i -= 10) {
        keyframes.push(i);
      }
      if (!keyframes.includes(1)) keyframes.push(1);

      Promise.all(keyframes.map(loadImage)).then(() => {
        if (isCancelled) return;

        // 3. Preload all remaining frames downwards in batches of 4 concurrent requests
        const remaining = [];
        for (let i = TOTAL_FRAMES - 1; i >= 1; i--) {
          if (!loadedIndicesRef.current.has(i)) {
            remaining.push(i);
          }
        }

        const BATCH_SIZE = 4;
        const loadBatch = async (offset) => {
          if (isCancelled || offset >= remaining.length) return;
          const slice = remaining.slice(offset, offset + BATCH_SIZE);
          await Promise.all(slice.map(loadImage));
          loadBatch(offset + BATCH_SIZE);
        };

        loadBatch(0);
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [renderFrame, resizeCanvas]);

  // Scroll listener & persistent animation loop
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener?.("change", handleMotionChange);

    // Compute scroll progress relative to hero container
    const updateScrollProgress = () => {
      if (!containerRef?.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetFrameRef.current = TOTAL_FRAMES;
        return;
      }

      // Progress 0.0 at top of hero, 1.0 when scrolled through hero
      // REVERSED: 0% scroll -> frame 150, 100% scroll -> frame 1
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      targetFrameRef.current = TOTAL_FRAMES - progress * (TOTAL_FRAMES - 1);
    };

    // Resize handler with canvas dimension sync
    const handleResize = () => {
      resizeCanvas();
      updateScrollProgress();
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial sync
    resizeCanvas();
    updateScrollProgress();

    // Persistent rAF loop with smooth lerp interpolation
    const LERP_FACTOR = 0.09;
    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
      } else {
        const diff = target - current;
        if (Math.abs(diff) < 0.005) {
          currentFrameRef.current = target;
        } else {
          currentFrameRef.current += diff * LERP_FACTOR;
        }
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      renderFrame(frameToDraw);

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener?.("change", handleMotionChange);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [containerRef, renderFrame, resizeCanvas]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* HTML5 Canvas (Full brightness, zero dimming) */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          initialFrameLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          display: "block",
        }}
      />

      {/* ── Minimal / Near-Zero Overlay (Na ke barabar) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent 45%, rgba(4,6,15,0.3) 100%)"
            : "linear-gradient(90deg, transparent 45%, rgba(248,249,250,0.25) 100%)",
        }}
      />
    </div>
  );
}
