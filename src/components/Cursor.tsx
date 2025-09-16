"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor({ magnetic = false }: { magnetic?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [forceCircle, setForceCircle] = useState(false);

  const translateX = useTransform(x, (val) =>
    hoveredRect ? hoveredRect.left : val - (hoveredRect ? 0 : 12)
  );
  const translateY = useTransform(y, (val) =>
    hoveredRect ? hoveredRect.top : val - (hoveredRect ? 0 : 12)
  );

  useEffect(() => {
    if (!magnetic) return;
    const elements = document.querySelectorAll("[data-magnetic]");

    const handleEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();

      setHoveredRect(rect);
      setForceCircle(el.getAttribute("data-cursor") === "circle");
    };

    const handleLeave = () => {
      setHoveredRect(null);
      setForceCircle(false);
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [magnetic]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  useEffect(() => {
    if (!magnetic) return;
    const elements = document.querySelectorAll("[data-magnetic]");

    const handleEnter = (e: Event) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setHoveredRect(rect);
    };

    const handleLeave = () => {
      setHoveredRect(null);
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [magnetic]);

  return (
    <motion.div
      style={{
        translateX: hoveredRect ? hoveredRect.left - 9 : translateX,
        translateY: hoveredRect ? hoveredRect.top - 9 : translateY,
      }}
      animate={{
        width: hoveredRect ? hoveredRect.width + 18 : 24,
        height: hoveredRect ? hoveredRect.height + 18 : 24,
        borderRadius: forceCircle ? "50%" : "18px",
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={
        "fixed top-0 left-0 mix-blend-difference pointer-events-none z-[9999]" +
        (magnetic ? " bg-white/20 border border-white" : " bg-white")
      }
    />
  );
}
