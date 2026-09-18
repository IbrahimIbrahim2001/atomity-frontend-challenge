"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

interface NumberTickerProps {
  value: number;
  className?: string;
}

export function NumberTicker({ value, className = "" }: NumberTickerProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const number = useMotionValue(0);

  const spring = useSpring(number, {
    damping: 20,
    stiffness: 80,
    duration: shouldReduceMotion ? 0 : undefined,
  });

  const isInView = useInView(elementRef, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      number.jump(value);
    } else {
      number.set(value);
    }
  }, [isInView, number, value, shouldReduceMotion]);

  useEffect(() => {
    return spring.on("change", (current) => {
      if (!elementRef.current) return;

      elementRef.current.textContent = Math.round(current).toLocaleString();
    });
  }, [spring]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      0
    </span>
  );
}
