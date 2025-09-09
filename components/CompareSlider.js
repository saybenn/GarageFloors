"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * CompareSlider – horizontal draggable divider with mouse, touch, and keyboard support.
 * Props:
 *  - initial (0–100): starting position, default 50
 *  - ariaLabel (string): a11y label for the slider
 *  - onChange (fn): optional callback with new percent
 *  - children (fn): render-prop receiving current percent (0–100)
 */
export default function CompareSlider({
  initial = 50,
  ariaLabel,
  onChange,
  children,
}) {
  const [pos, setPos] = useState(() => clamp(initial));
  const trackRef = useRef(null);
  const draggingRef = useRef(false);

  const setPosition = useCallback(
    (next) => {
      const clamped = clamp(next);
      setPos((prev) => {
        if (prev !== clamped) onChange?.(clamped);
        return clamped;
      });
    },
    [onChange]
  );

  const percentFromClientX = useCallback(
    (clientX) => {
      const el = trackRef.current;
      if (!el) return pos;
      const rect = el.getBoundingClientRect();
      const raw = ((clientX - rect.left) / rect.width) * 100;
      return clamp(raw);
    },
    [pos]
  );

  // Mouse handlers
  const onMouseDown = (e) => {
    draggingRef.current = true;
    setPosition(percentFromClientX(e.clientX));
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp, {
      passive: true,
      once: true,
    });
  };
  // const onMouseMove = (e) => {
  //   if (!draggingRef.current) return;
  //   requestAnimationFrame(() => setPosition(percentFromClientX(e.clientX)));
  // };
  // Better: memoize
  const onMouseMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      requestAnimationFrame(() => setPosition(percentFromClientX(e.clientX)));
    },
    [percentFromClientX, setPosition]
  );
  const onMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onMouseMove);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    draggingRef.current = true;
    const t = e.touches[0];
    setPosition(percentFromClientX(t.clientX));
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, {
      passive: true,
      once: true,
    });
  };
  const onTouchMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      const t = e.touches[0];
      e.preventDefault();
      requestAnimationFrame(() => setPosition(percentFromClientX(t.clientX)));
    },
    [percentFromClientX, setPosition]
  );

  const onTouchEnd = () => {
    draggingRef.current = false;
    window.removeEventListener("touchmove", onTouchMove);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [onMouseMove, onTouchMove]);

  // Keyboard a11y
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition(pos - step);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition(pos + step);
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full h-full cursor-ew-resize select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      aria-label={ariaLabel}
    >
      {typeof children === "function" ? children(pos) : children}

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-black/50 dark:bg-white/60"
        style={{ left: `${pos}%`, transform: "translateX(-0.5px)" }}
      />

      {/* Handle */}
      <button
        type="button"
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 min-h-9 w-9 min-w-9 rounded-full bg-white/90 text-black shadow-lg ring-2 ring-black/10 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-primary,theme(colors.blue.500))]"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <span className="sr-only">{ariaLabel}</span>
        <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-black/40" />
      </button>
    </div>
  );
}

function clamp(n) {
  return Math.max(0, Math.min(100, n));
}
