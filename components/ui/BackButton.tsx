"use client";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export function BackButton({ onClick, className = "" }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="이전으로"
      className={`absolute left-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-pine transition-colors hover:bg-pine/10 sm:left-6 sm:top-6 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
