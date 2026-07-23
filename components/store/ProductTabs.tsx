"use client";

import { useEffect, useState } from "react";

const TABS = [
  { id: "intro", label: "상품 소개" },
  { id: "features", label: "특징" },
  { id: "info", label: "안내" },
];

export function ProductTabs() {
  const [active, setActive] = useState(TABS[0].id);

  useEffect(() => {
    const observers = TABS.map((tab) => {
      const el = document.getElementById(tab.id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(tab.id);
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav className="sticky top-12 z-30 -mx-6 flex gap-5 border-b border-ink/10 bg-cream/95 px-6 py-3 backdrop-blur-sm">
      {TABS.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className={`text-sm font-medium transition-colors ${
            active === tab.id ? "text-celadon" : "text-ink/45 hover:text-ink"
          }`}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
