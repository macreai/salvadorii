import React from 'react';

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function LiquidGlassContainer({ children, className = '', ariaLabel = 'Liquid glass container' }: LiquidGlassContainerProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl z-50
        transition-transform ease-in-out p-6
        backdrop-blur-md backdrop-saturate-150 bg-white/10 border border-white/20 shadow-lg
        ${className}
      `}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 opacity-80" />

      <div className="relative z-10 flex justify-center items-center space-x-4">
        {children}
      </div>

      <div className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-multiply bg-gradient-to-b from-black/5 via-transparent to-black/10" />
    </div>
  );
}