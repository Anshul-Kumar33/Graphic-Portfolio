"use client";

import Link from "next/link";
import { useRef, useEffect, type ReactNode } from "react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.25,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    const isDesktopPointer = () => {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDesktopPointer()) return;

      const rect = button.getBoundingClientRect();

      const mouseX = event.clientX - (rect.left + rect.width / 2);
      const mouseY = event.clientY - (rect.top + rect.height / 2);

      const moveX = mouseX * strength;
      const moveY = mouseY * strength;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        button.style.transform = `
          translate3d(${moveX}px, ${moveY}px, 0)
          scale(1.05)
        `;
      });
    };

    const handlePointerLeave = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        button.style.transform = "translate3d(0, 0, 0) scale(1)";
      });
    };

    button.addEventListener("pointermove", handlePointerMove);

    button.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      button.removeEventListener("pointermove", handlePointerMove);

      button.removeEventListener("pointerleave", handlePointerLeave);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [strength]);

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`
        inline-flex
        items-center
        justify-center
        will-change-transform
        transition-transform
        duration-300
        ease-out
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
