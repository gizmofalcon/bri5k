"use client";

import { useEffect, useRef } from "react";

export function EffortBorder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const CREAM = "#F5F0E1";
    const RAIL_WIDTH = 2;
    const DASH_LENGTH = 12;
    const GAP_LENGTH = 8;
    const TICK_SIZE = 6;

    function render(time: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Intensity based on scroll position (0.15 at top, 0.9 at bottom)
      const intensity = 0.15 + scrollRef.current * 0.75;
      const speed = 30 + intensity * 120;
      const offset = (time * 0.001 * speed) % (DASH_LENGTH + GAP_LENGTH);
      const alpha = 0.1 + intensity * 0.35;

      ctx.strokeStyle = CREAM;
      ctx.lineWidth = RAIL_WIDTH;
      ctx.globalAlpha = alpha;
      ctx.setLineDash([DASH_LENGTH, GAP_LENGTH]);

      // Top edge
      ctx.lineDashOffset = -offset;
      ctx.beginPath();
      ctx.moveTo(0, RAIL_WIDTH / 2);
      ctx.lineTo(canvas.width, RAIL_WIDTH / 2);
      ctx.stroke();

      // Bottom edge
      ctx.lineDashOffset = offset;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - RAIL_WIDTH / 2);
      ctx.lineTo(canvas.width, canvas.height - RAIL_WIDTH / 2);
      ctx.stroke();

      // Left edge
      ctx.lineDashOffset = -offset;
      ctx.beginPath();
      ctx.moveTo(RAIL_WIDTH / 2, 0);
      ctx.lineTo(RAIL_WIDTH / 2, canvas.height);
      ctx.stroke();

      // Right edge
      ctx.lineDashOffset = offset;
      ctx.beginPath();
      ctx.moveTo(canvas.width - RAIL_WIDTH / 2, 0);
      ctx.lineTo(canvas.width - RAIL_WIDTH / 2, canvas.height);
      ctx.stroke();

      ctx.setLineDash([]);

      // Corner ticks
      const tickAlpha = 0.2 + intensity * 0.5;
      ctx.globalAlpha = tickAlpha;
      ctx.lineWidth = RAIL_WIDTH;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(0, TICK_SIZE);
      ctx.lineTo(0, 0);
      ctx.lineTo(TICK_SIZE, 0);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(canvas.width - TICK_SIZE, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(canvas.width, TICK_SIZE);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - TICK_SIZE);
      ctx.lineTo(0, canvas.height);
      ctx.lineTo(TICK_SIZE, canvas.height);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(canvas.width - TICK_SIZE, canvas.height);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(canvas.width, canvas.height - TICK_SIZE);
      ctx.stroke();

      // Scan line during high intensity
      if (intensity > 0.5) {
        const scanAlpha = (intensity - 0.5) * 0.15;
        ctx.globalAlpha = scanAlpha;
        ctx.fillStyle = CREAM;
        const scanY =
          ((time * 0.001 * 40) % canvas.height) | 0;
        ctx.fillRect(0, scanY, canvas.width, 1);
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    />
  );
}
