"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const youFocus = ["Marketing & campaigns", "Sales & customers", "Growth strategy"];
const ourFocus = ["Web & backend", "Mobile apps", "Launch & maintenance"];

export function Manifesto() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    let animationId: number;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const geometry = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const isPurple = Math.random() > 0.5;
      colors[i * 3] = isPurple ? 123 / 255 : 0;
      colors[i * 3 + 1] = isPurple ? 47 / 255 : 200 / 255;
      colors[i * 3 + 2] = isPurple ? 255 / 255 : 255 / 255;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = (time: number) => {
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(time * 0.0003 + i) * 0.01;
        pos[i * 3] += Math.cos(time * 0.0002 + i) * 0.005;
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    animationId = requestAnimationFrame(animate);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      cards.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: cards, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg section-padding">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="container relative z-10">
        <SectionTag>(How We Work Together)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["YOU → APPROOTS →", "LAUNCH."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.07] bg-bg-surface/80 p-10 backdrop-blur-sm">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-brand-cyan">
              You — Your focus
            </p>
            <h3 className="mt-4 font-satoshi text-2xl font-black uppercase text-text-heading">
              Growth, customers, revenue
            </h3>
            <ul className="mt-6 space-y-3">
              {youFocus.map((item) => (
                <li
                  key={item}
                  className="font-inter text-base text-text-body before:mr-2 before:text-brand-purple before:content-['→']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-bg-surface/80 p-10 backdrop-blur-sm">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-brand-purple">
              AR — Our focus
            </p>
            <h3 className="mt-4 font-satoshi text-2xl font-black uppercase text-text-heading">
              Product, code, launch
            </h3>
            <ul className="mt-6 space-y-3">
              {ourFocus.map((item) => (
                <li
                  key={item}
                  className="font-inter text-base text-text-body before:mr-2 before:text-brand-cyan before:content-['→']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center font-satoshi text-xl font-black uppercase tracking-wide text-text-heading">
          One partnership. Clear roles. No overlap.
        </p>
      </div>
    </section>
  );
}
