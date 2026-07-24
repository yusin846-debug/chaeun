"use client";

import { motion } from "motion/react";
import { OHAENG, OHAENG_CYCLE, OhaengId, getGenerator } from "@/lib/content";

interface OhaengWheelProps {
  highlight?: OhaengId | null;
  revealConnection?: boolean;
  showCycleArrows?: boolean;
  size?: number;
}

function bowPath(from: { x: number; y: number }, to: { x: number; y: number }, trim: number, bow: number) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = mx - CENTER;
  const dy = my - CENTER;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const cx = mx + (dx / dist) * bow;
  const cy = my + (dy / dist) * bow;
  const dirX = to.x - from.x;
  const dirY = to.y - from.y;
  const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
  const sx = from.x + (dirX / len) * trim;
  const sy = from.y + (dirY / len) * trim;
  const ex = to.x - (dirX / len) * trim;
  const ey = to.y - (dirY / len) * trim;
  return `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

const CENTER = 120;
const RADIUS = 88;
const NODE_R = 15;

function nodePosition(index: number) {
  const angle = (-90 + index * 72) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

const POSITIONS: Record<OhaengId, { x: number; y: number }> = OHAENG_CYCLE.reduce(
  (acc, id, i) => {
    acc[id] = nodePosition(i);
    return acc;
  },
  {} as Record<OhaengId, { x: number; y: number }>,
);

export function OhaengWheel({
  highlight = null,
  revealConnection = true,
  showCycleArrows = false,
  size = 240,
}: OhaengWheelProps) {
  const generator = highlight ? getGenerator(highlight) : null;

  return (
    <svg
      viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
      width={size}
      height={size}
      className="mx-auto"
    >
      {showCycleArrows && (
        <defs>
          <marker id="ohaeng-arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0 0 6 3 0 6Z" fill="var(--color-ink)" fillOpacity={0.35} />
          </marker>
        </defs>
      )}

      {showCycleArrows ? (
        OHAENG_CYCLE.map((id, i) => {
          const next = OHAENG_CYCLE[(i + 1) % OHAENG_CYCLE.length];
          return (
            <path
              key={id}
              d={bowPath(POSITIONS[id], POSITIONS[next], NODE_R + 4, RADIUS * 0.15)}
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity={0.12}
              strokeWidth={1.5}
              markerEnd="url(#ohaeng-arrowhead)"
            />
          );
        })
      ) : (
        <polygon
          points={OHAENG_CYCLE.map((id) => `${POSITIONS[id].x},${POSITIONS[id].y}`).join(
            " ",
          )}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={0.12}
          strokeWidth={1.5}
        />
      )}

      {highlight && generator && revealConnection && (
        <motion.line
          x1={POSITIONS[generator].x}
          y1={POSITIONS[generator].y}
          x2={POSITIONS[highlight].x}
          y2={POSITIONS[highlight].y}
          stroke={OHAENG[highlight].color}
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      )}

      {OHAENG_CYCLE.map((id) => {
        const pos = POSITIONS[id];
        const isHighlight = id === highlight;
        const isGenerator = id === generator && revealConnection;
        const active = isHighlight || isGenerator;
        return (
          <g key={id}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              initial={false}
              animate={{
                r: isHighlight ? NODE_R + 4 : NODE_R,
                fill: active ? OHAENG[id].color : "var(--color-cream)",
              }}
              stroke={active ? OHAENG[id].color : "var(--color-ink)"}
              strokeOpacity={active ? 1 : 0.25}
              strokeWidth={1.5}
              transition={{ duration: 0.4 }}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={13}
              fontWeight={600}
              fill={active ? "var(--color-cream)" : "var(--color-ink)"}
              opacity={active ? 1 : 0.55}
            >
              {OHAENG[id].label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
