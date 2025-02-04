"use client";

import { useEffect, useRef } from "react";

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson",
];

const maxConfettis = 150;

interface ConfettiParticle {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
}

export default function ConfettiCanvas({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const randomFromTo = (from: number, to: number) =>
      Math.floor(Math.random() * (to - from + 1) + from);

    const createParticles = () => {
      particlesRef.current = Array.from({ length: maxConfettis }, () => ({
        x: Math.random() * W,
        y: Math.random() * H - H,
        r: randomFromTo(11, 33),
        d: Math.random() * maxConfettis + 11,
        color: possibleColors[Math.floor(Math.random() * possibleColors.length)],
        tilt: Math.floor(Math.random() * 33) - 11,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      }));
    };

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, W, H);

      particlesRef.current.forEach((particle, i) => {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y > H) {
          particle.y = -30;
          particle.x = Math.random() * W;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }

        context.beginPath();
        context.lineWidth = particle.r / 2;
        context.strokeStyle = particle.color;
        context.moveTo(particle.x + particle.tilt + particle.r / 3, particle.y);
        context.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.r / 5);
        context.stroke();
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("resize", handleResize);

    if (isActive) {
      createParticles();
      draw();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
