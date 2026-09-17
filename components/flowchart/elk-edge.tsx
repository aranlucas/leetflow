"use client";

import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from "@xyflow/react";

import type { RoutedPoint } from "./layout";

export function isRoutedData(data: unknown): data is { bendPoints?: RoutedPoint[] } {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  if (!("bendPoints" in data)) {
    return true;
  }
  return Array.isArray(data.bendPoints);
}

/** Length-weighted midpoint of a polyline, for label placement. */
export function getPolylineMidpoint(points: RoutedPoint[]): RoutedPoint {
  if (points.length === 0) {
    return { x: 0, y: 0 };
  }
  let total = 0;
  const lengths: number[] = [];
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const len = Math.hypot(dx, dy);
    lengths.push(len);
    total += len;
  }
  if (total === 0) {
    return { ...points[0] };
  }
  let target = total / 2;
  for (let i = 1; i < points.length; i += 1) {
    if (target <= lengths[i - 1]) {
      const from = points[i - 1];
      const to = points[i];
      const ratio = lengths[i - 1] === 0 ? 0 : target / lengths[i - 1];
      return { x: from.x + (to.x - from.x) * ratio, y: from.y + (to.y - from.y) * ratio };
    }
    target -= lengths[i - 1];
  }
  const last = points.at(-1);
  return last === undefined ? { x: 0, y: 0 } : { ...last };
}

export function ElkEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  label,
  markerEnd,
  style,
}: EdgeProps) {
  const bends = isRoutedData(data) ? (data.bendPoints ?? []) : [];
  const points: RoutedPoint[] = [{ x: sourceX, y: sourceY }, ...bends, { x: targetX, y: targetY }];
  const path = points.map((point, i) => `${i === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const mid = getPolylineMidpoint(points);

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
      {typeof label === "string" && label.length > 0 && (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-sky-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-sky-300"
            style={{
              transform: `translate(-50%, -50%) translate(${mid.x}px,${mid.y}px)`,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
