"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorTracker() {
  const [pointerType, setPointerType] = useState<"mouse" | "touch" | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [touchActive, setTouchActive] = useState(false);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Touch Coordinates
  const touchX = useMotionValue(-100);
  const touchY = useMotionValue(-100);

  // Smooth springs for outer ring/trail
  const springConfig = { damping: 28, stiffness: 300, mass: 0.4 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let lastTouchTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Ignore simulated mouse events from touch gestures
      if (Date.now() - lastTouchTime < 500) return;
      setPointerType("mouse");

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over clickable items
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".cursor-pointer") ||
          target.getAttribute("role") === "button" ||
          target.closest("[onClick]");
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseDown = () => {
      if (pointerType === "mouse") setIsClicked(true);
    };
    const handleMouseUp = () => setIsClicked(false);

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchTime = Date.now();
      setPointerType("touch");
      setTouchActive(true);
      if (e.touches.length > 0) {
        touchX.set(e.touches[0].clientX);
        touchY.set(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      lastTouchTime = Date.now();
      setPointerType("touch");
      if (e.touches.length > 0) {
        touchX.set(e.touches[0].clientX);
        touchY.set(e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      lastTouchTime = Date.now();
      setTouchActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mouseX, mouseY, touchX, touchY, pointerType]);

  // Render Touch Tracker on mobile/touch pointers
  if (pointerType === "touch") {
    return (
      <motion.div
        style={{
          position: "fixed",
          left: touchX,
          top: touchY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: touchActive ? 1 : 0,
          opacity: touchActive ? 0.6 : 0,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-12 h-12 rounded-full border border-indigo-400 bg-indigo-400/10 pointer-events-none z-50 fixed"
      />
    );
  }

  // Render Cursor Tracker on mouse pointers (PC)
  if (pointerType === "mouse") {
    return (
      <>
        {/* Inner Dot */}
        <motion.div
          style={{
            position: "fixed",
            left: mouseX,
            top: mouseY,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: isClicked ? 0.7 : 1,
          }}
          className="w-2.5 h-2.5 bg-indigo-600 rounded-full pointer-events-none z-50 fixed"
        />
        {/* Smooth Outer Ring */}
        <motion.div
          style={{
            position: "fixed",
            left: trailX,
            top: trailY,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: isHovered ? 1.6 : 1,
            borderColor: isHovered ? "rgba(99, 102, 241, 0.7)" : "rgba(99, 102, 241, 0.25)",
            backgroundColor: isHovered ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.02)",
          }}
          transition={{ type: "tween", duration: 0.12 }}
          className="w-8 h-8 rounded-full border pointer-events-none z-50 fixed"
        />
      </>
    );
  }

  return null;
}
