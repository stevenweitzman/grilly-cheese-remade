import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-accent"
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderWidth: isHovering ? 1 : 2,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
