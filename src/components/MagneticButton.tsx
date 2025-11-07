import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  strength?: number;
}

const MagneticButton = ({ children, strength = 0.3, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default MagneticButton;
