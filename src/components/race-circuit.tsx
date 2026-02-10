"use client";

import { useEffect, useRef } from "react";

export function RaceCircuit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CREAM = "#F5F0E1";
    const TERTIARY = "#4D4742";
    const DPR = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Track follows the screen contour with a small inset
    function getTrackPoints(w: number, h: number): { x: number; y: number }[] {
      const points: { x: number; y: number }[] = [];
      const inset = 24;

      const left = inset;
      const right = w - inset;
      const top = inset;
      const bottom = h - inset;

      // Distribute points along each edge for smooth traversal
      const perSide = 75;

      // Top edge: left to right
      for (let i = 0; i < perSide; i++) {
        points.push({ x: left + (right - left) * (i / perSide), y: top });
      }
      // Right edge: top to bottom
      for (let i = 0; i < perSide; i++) {
        points.push({ x: right, y: top + (bottom - top) * (i / perSide) });
      }
      // Bottom edge: right to left
      for (let i = 0; i < perSide; i++) {
        points.push({ x: right - (right - left) * (i / perSide), y: bottom });
      }
      // Left edge: bottom to top
      for (let i = 0; i < perSide; i++) {
        points.push({ x: left, y: bottom - (bottom - top) * (i / perSide) });
      }

      return points;
    }

    function getAngle(
      points: { x: number; y: number }[],
      idx: number
    ): number {
      const next = points[(idx + 1) % points.length];
      const prev = points[(idx - 1 + points.length) % points.length];
      return Math.atan2(next.y - prev.y, next.x - prev.x);
    }

    function getCumulativeDistances(
      points: { x: number; y: number }[]
    ): number[] {
      const dist = [0];
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        dist.push(dist[i - 1] + Math.sqrt(dx * dx + dy * dy));
      }
      return dist;
    }

    function findPointAtDist(
      trackPoints: { x: number; y: number }[],
      cumDist: number[],
      targetDist: number
    ): { x: number; y: number } {
      let lo = 0;
      let hi = cumDist.length - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (cumDist[mid] < targetDist) lo = mid;
        else hi = mid;
      }
      const segLen = cumDist[hi] - cumDist[lo];
      const segT = segLen > 0 ? (targetDist - cumDist[lo]) / segLen : 0;
      return {
        x: trackPoints[lo].x + (trackPoints[hi].x - trackPoints[lo].x) * segT,
        y: trackPoints[lo].y + (trackPoints[hi].y - trackPoints[lo].y) * segT,
      };
    }

    function render(time: number) {
      if (!ctx || !canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      const trackPoints = getTrackPoints(w, h);
      const cumDist = getCumulativeDistances(trackPoints);
      const totalLen = cumDist[cumDist.length - 1];

      const inset = 24;
      const left = inset;
      const right = w - inset;
      const top = inset;
      const bottom = h - inset;
      const trackW = right - left;
      const trackH = bottom - top;
      const midX = w / 2;
      const midY = h / 2;

      // --- Draw track (sharp rectangle, screen contour) ---
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = TERTIARY;
      ctx.lineWidth = 1;
      ctx.strokeRect(left, top, trackW, trackH);

      // --- Inner lane (dashed) ---
      const innerInset = 40;
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = TERTIARY;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 8]);
      ctx.strokeRect(
        left + innerInset - inset,
        top + innerInset - inset,
        trackW - (innerInset - inset) * 2,
        trackH - (innerInset - inset) * 2
      );
      ctx.setLineDash([]);

      // --- Corner bracket ticks ---
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = CREAM;
      ctx.lineWidth = 1;
      const tickLen = 14;

      // TL
      ctx.beginPath();
      ctx.moveTo(left, top + tickLen);
      ctx.lineTo(left, top);
      ctx.lineTo(left + tickLen, top);
      ctx.stroke();
      // TR
      ctx.beginPath();
      ctx.moveTo(right - tickLen, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, top + tickLen);
      ctx.stroke();
      // BR
      ctx.beginPath();
      ctx.moveTo(right, bottom - tickLen);
      ctx.lineTo(right, bottom);
      ctx.lineTo(right - tickLen, bottom);
      ctx.stroke();
      // BL
      ctx.beginPath();
      ctx.moveTo(left + tickLen, bottom);
      ctx.lineTo(left, bottom);
      ctx.lineTo(left, bottom - tickLen);
      ctx.stroke();

      // --- Midpoint ticks ---
      ctx.globalAlpha = 0.18;
      const midTick = 8;
      // Top mid
      ctx.beginPath();
      ctx.moveTo(midX, top - midTick);
      ctx.lineTo(midX, top + midTick);
      ctx.stroke();
      // Bottom mid
      ctx.beginPath();
      ctx.moveTo(midX, bottom - midTick);
      ctx.lineTo(midX, bottom + midTick);
      ctx.stroke();
      // Left mid
      ctx.beginPath();
      ctx.moveTo(left - midTick, midY);
      ctx.lineTo(left + midTick, midY);
      ctx.stroke();
      // Right mid
      ctx.beginPath();
      ctx.moveTo(right - midTick, midY);
      ctx.lineTo(right + midTick, midY);
      ctx.stroke();

      // --- Runner dot (square) ---
      const speed = 0.06;
      const elapsed = time * 0.001 * speed;
      const progress = elapsed % 1;
      const targetDist = progress * totalLen;
      const pos = findPointAtDist(trackPoints, cumDist, targetDist);

      // Trail (square particles)
      const trailLength = 0.12;
      const trailSteps = 40;
      for (let t = trailSteps; t >= 1; t--) {
        const trailProgress =
          (progress - (t / trailSteps) * trailLength + 1) % 1;
        const trailDist = trailProgress * totalLen;
        const tp = findPointAtDist(trackPoints, cumDist, trailDist);

        const alpha = (1 - t / trailSteps) * 0.3;
        const size = 2 + (1 - t / trailSteps) * 3;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = CREAM;
        ctx.fillRect(tp.x - size / 2, tp.y - size / 2, size, size);
      }

      // Main square dot
      const dotSize = 8;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = CREAM;
      ctx.fillRect(pos.x - dotSize / 2, pos.y - dotSize / 2, dotSize, dotSize);

      // Outer square ring (pulse)
      const pulse = 0.3 + Math.sin(time * 0.004) * 0.15;
      const ringSize = 16;
      ctx.globalAlpha = pulse;
      ctx.strokeStyle = CREAM;
      ctx.lineWidth = 1;
      ctx.strokeRect(
        pos.x - ringSize / 2,
        pos.y - ringSize / 2,
        ringSize,
        ringSize
      );

      // --- Ghost dot (square, fainter) ---
      const ghost1Progress = (elapsed * 0.75 + 0.5) % 1;
      const ghost1Dist = ghost1Progress * totalLen;
      const g1 = findPointAtDist(trackPoints, cumDist, ghost1Dist);

      const ghostSize = 6;
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = CREAM;
      ctx.fillRect(g1.x - ghostSize / 2, g1.y - ghostSize / 2, ghostSize, ghostSize);

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
