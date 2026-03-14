"use client";

import { useEffect, useRef, useCallback } from "react";

interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  lineWidth: number;
  hasCornerMarks: boolean;
}

/**
 * ParticleField — анимированные геометрические рамки
 *
 * Пересекающиеся прямоугольные рамки в стиле логотипа NAKO Agency.
 * Символизируют индивидуальный подход — каждая рамка уникальна.
 * Canvas-based, 60fps.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Frame[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const initFrames = useCallback((width: number, height: number) => {
    const frames: Frame[] = [];
    const count = width < 768 ? 6 : 10;

    const colors = [
      "rgba(217, 212, 203, 0.25)", // Muted Stroke
      "rgba(217, 212, 203, 0.15)", // Muted Stroke lighter
      "rgba(196, 191, 181, 0.2)",  // Line Dark
      "rgba(166, 123, 91, 0.35)",  // Terra Clay
      "rgba(166, 123, 91, 0.2)",   // Terra Clay lighter
      "rgba(239, 235, 224, 0.12)", // Warm Sand
    ];

    for (let i = 0; i < count; i++) {
      const isTerra = i < 3;
      const colorIndex = isTerra
        ? 3 + Math.floor(Math.random() * 2)
        : Math.floor(Math.random() * 3);

      const scale = 0.15 + Math.random() * 0.35;

      frames.push({
        x: Math.random() * width,
        y: Math.random() * height,
        width: width * scale * (0.8 + Math.random() * 0.6),
        height: height * scale * (0.5 + Math.random() * 0.5),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        rotation: (Math.random() - 0.5) * 0.08,
        rotationSpeed: (Math.random() - 0.5) * 0.0002,
        color: colors[colorIndex],
        lineWidth: isTerra ? 1.5 : 1,
        hasCornerMarks: Math.random() > 0.5,
      });
    }

    framesRef.current = frames;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initFrames(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const cornerSize = 12;

    const drawCornerMarks = (
      cx: number,
      cy: number,
      fw: number,
      fh: number,
      color: string,
      lineWidth: number
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      const halfW = fw / 2;
      const halfH = fh / 2;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(cx - halfW, cy - halfH + cornerSize);
      ctx.lineTo(cx - halfW, cy - halfH);
      ctx.lineTo(cx - halfW + cornerSize, cy - halfH);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(cx + halfW - cornerSize, cy - halfH);
      ctx.lineTo(cx + halfW, cy - halfH);
      ctx.lineTo(cx + halfW, cy - halfH + cornerSize);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(cx + halfW, cy + halfH - cornerSize);
      ctx.lineTo(cx + halfW, cy + halfH);
      ctx.lineTo(cx + halfW - cornerSize, cy + halfH);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(cx - halfW + cornerSize, cy + halfH);
      ctx.lineTo(cx - halfW, cy + halfH);
      ctx.lineTo(cx - halfW, cy + halfH - cornerSize);
      ctx.stroke();
    };

    const drawCrossMarks = (
      cx: number,
      cy: number,
      fw: number,
      fh: number,
      color: string,
      lineWidth: number
    ) => {
      const size = 6;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 0.8;
      const halfW = fw / 2;
      const halfH = fh / 2;

      const points = [
        { x: cx - halfW, y: cy - halfH },
        { x: cx + halfW, y: cy + halfH },
      ];

      for (const p of points) {
        ctx.beginPath();
        ctx.moveTo(p.x - size, p.y);
        ctx.lineTo(p.x + size, p.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - size);
        ctx.lineTo(p.x, p.y + size);
        ctx.stroke();
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const frames = framesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < frames.length; i++) {
        const f = frames[i];

        // Update position — slow drift
        f.x += f.vx;
        f.y += f.vy;
        f.rotation += f.rotationSpeed;

        // Soft bounce at edges
        const margin = 100;
        if (f.x < -margin) f.vx = Math.abs(f.vx) * 0.8;
        if (f.x > w + margin) f.vx = -Math.abs(f.vx) * 0.8;
        if (f.y < -margin) f.vy = Math.abs(f.vy) * 0.8;
        if (f.y > h + margin) f.vy = -Math.abs(f.vy) * 0.8;

        // Mouse parallax — frames shift slightly toward cursor
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - w / 2;
          const dy = mouse.y - h / 2;
          const parallaxStrength = (i + 1) / frames.length * 0.008;
          f.x += dx * parallaxStrength * 0.02;
          f.y += dy * parallaxStrength * 0.02;
        }

        // Draw frame
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);

        // Main rectangle
        ctx.strokeStyle = f.color;
        ctx.lineWidth = f.lineWidth;
        ctx.strokeRect(-f.width / 2, -f.height / 2, f.width, f.height);

        // Extending lines (like the logo — lines that go beyond the frame)
        const extendLength = 30 + Math.random() * 0.1;
        ctx.globalAlpha = 0.5;

        // Top-right extending line (horizontal)
        ctx.beginPath();
        ctx.moveTo(f.width / 2, -f.height / 2);
        ctx.lineTo(f.width / 2 + extendLength, -f.height / 2);
        ctx.stroke();

        // Bottom-left extending line (horizontal)
        ctx.beginPath();
        ctx.moveTo(-f.width / 2, f.height / 2);
        ctx.lineTo(-f.width / 2 - extendLength, f.height / 2);
        ctx.stroke();

        // Top-left extending line (vertical)
        ctx.beginPath();
        ctx.moveTo(-f.width / 2, -f.height / 2);
        ctx.lineTo(-f.width / 2, -f.height / 2 - extendLength);
        ctx.stroke();

        // Bottom-right extending line (vertical)
        ctx.beginPath();
        ctx.moveTo(f.width / 2, f.height / 2);
        ctx.lineTo(f.width / 2, f.height / 2 + extendLength);
        ctx.stroke();

        ctx.globalAlpha = 1;

        // Corner marks or cross marks
        if (f.hasCornerMarks) {
          drawCornerMarks(0, 0, f.width, f.height, f.color, f.lineWidth);
        } else {
          drawCrossMarks(0, 0, f.width, f.height, f.color, f.lineWidth);
        }

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Static render
      const frames = framesRef.current;
      for (const f of frames) {
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.strokeStyle = f.color;
        ctx.lineWidth = f.lineWidth;
        ctx.strokeRect(-f.width / 2, -f.height / 2, f.width, f.height);
        if (f.hasCornerMarks) {
          drawCornerMarks(0, 0, f.width, f.height, f.color, f.lineWidth);
        }
        ctx.restore();
      }
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initFrames]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

export default ParticleField;
