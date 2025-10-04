import { useEffect, useRef, useState } from "react";

type LoadingProgressProps = {
  size?: number;
  stroke?: number;
  duration?: number;
  footerLabel?: string;
};

function LoadingSpinner({
  size = 65,
  stroke = 3,
  duration = 3000,
  footerLabel,
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setProgress(100);
      return;
    }

    const tick: FrameRequestCallback = (t) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="flex flex-col justify-center items-center relative h-full"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-zinc-700"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-emerald-300"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              transition: "stroke 150ms linear",
            }}
          />
        </svg>
        <p className="w-full h-full flex items-center justify-center absolute text-white text-sm font-medium">
          {Math.round(progress)}%
        </p>
      </div>

      {footerLabel && (
        <div className="absolute bottom-3 text-white text-xs font-semibold">
          {footerLabel}
        </div>
      )}
    </div>
  );
}
export default LoadingSpinner;
