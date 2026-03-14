"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  pulse: number;
  pulseSpeed: number;
}

/**
 * ParticleField — эффектные плавающие частицы в цветах бренда
 *
 * Крупные светящиеся точки с glow-эффектом, соединения между ними,
 * и интерактивная реакция на мышь. Canvas-based, 60fps.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 8000), 120);
    const particles: Particle[] = [];

    const colorSets = [
      { color: "rgba(166, 123, 91, 0.8)", glow: "rgba(166, 123, 91, 0.3)" },   // Terra Clay
      { color: "rgba(166, 123, 91, 0.5)", glow: "rgba(166, 123, 91, 0.15)" },  // Terra Clay soft
      { color: "rgba(217, 212, 203, 0.6)", glow: "rgba(217, 212, 203, 0.2)" }, // Muted Stroke
      { color: "rgba(239, 235, 224, 0.4)", glow: "rgba(239, 235, 224, 0.1)" }, // Warm Sand
      { color: "rgba(249, 247, 242, 0.5)", glow: "rgba(249, 247, 242, 0.15)" }, // Soft Ivory
      { color: "rgba(196, 191, 181, 0.5)", glow: "rgba(196, 191, 181, 0.15)" }, // Line Dark
    ];

    for (let i = 0; i < count; i++) {
      const colorSet = colorSets[Math.floor(Math.random() * colorSets.length)];
      const baseRadius = Math.random() * 2.5 + 1;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: baseRadius,
        baseRadius,
        color: colorSet.color,
        glowColor: colorSet.glow,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    particlesRef.current = particles;
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
      initParticles(rect.width, rect.height);
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

    const connectionDistance = 180;
    const mouseRadius = 200;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 1;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < connectionDistance) {
            const alpha = (1 - cdist / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(166, 123, 91, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(166, 123, 91, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse animation
        p.pulse += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulse) * 0.8;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse interaction — attract gently, repel when too close
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          if (dist < 60) {
            // Repel when very close
            const force = (60 - dist) / 60 * 0.04;
            p.vx -= dx / dist * force;
            p.vy -= dy / dist * force;
          } else {
            // Attract gently
            const force = (mouseRadius - dist) / mouseRadius * 0.008;
            p.vx += dx / dist * force;
            p.vy += dy / dist * force;
          }
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Glow effect
        const glowRadius = p.radius * 4;
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );
        gradient.addColorStop(0, p.glowColor);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      const particles = particlesRef.current;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

export default ParticleField;
