"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import { PATTERNS } from "@/lib/patterns";
import { cn } from "@/lib/utils";

import type { FlowDirection } from "./layout";

export type FlowKind = "start" | "decision" | "technique";

export interface FlowNodeData extends Record<string, unknown> {
  title: string;
  subtitle?: string;
  kind: FlowKind;
  slug?: string;
  /** Set by layout; drives which faces the handles sit on. */
  direction?: FlowDirection;
}

export type FlowNode = Node<FlowNodeData>;

function handlePositions(data: FlowNodeData): {
  target: Position;
  source: Position;
} {
  if (data.direction === "LR") {
    return { target: Position.Left, source: Position.Right };
  }
  return { target: Position.Top, source: Position.Bottom };
}

function Shell({
  selected,
  kind,
  children,
}: {
  selected?: boolean;
  kind: FlowKind;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-[264px] rounded-2xl border bg-white p-4 text-left shadow-sm transition-all dark:bg-zinc-900",
        kind === "start" && "border-amber-400/60 shadow-amber-500/10 dark:border-amber-400/40",
        kind === "decision" && "border-sky-500/30 dark:border-sky-400/30",
        kind === "technique" && "border-zinc-200 dark:border-zinc-800",
        selected ? "shadow-lg ring-2 ring-amber-400" : "hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      {children}
    </div>
  );
}

function KindTag({ kind }: { kind: FlowKind }) {
  const styles: Record<FlowKind, string> = {
    start: "bg-amber-400/15 text-amber-600 dark:text-amber-300",
    decision: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    technique: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  };
  const label: Record<FlowKind, string> = {
    start: "Start",
    decision: "Decision",
    technique: "Pattern",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        styles[kind],
      )}
    >
      {label[kind]}
    </span>
  );
}

export function StartNode({ data, selected }: NodeProps<FlowNode>) {
  const handles = handlePositions(data);
  return (
    <Shell selected={selected} kind="start">
      <Handle type="target" position={handles.target} className="!bg-amber-400" />
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-zinc-950">
          {data.title === "Universal tools" ? "★" : "▶"}
        </span>
        <KindTag kind="start" />
      </div>
      <p className="mt-2 text-sm leading-snug font-bold">{data.title}</p>
      {data.subtitle && (
        <p className="mt-0.5 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
          {data.subtitle}
        </p>
      )}
      <Handle type="source" position={handles.source} className="!bg-amber-400" />
    </Shell>
  );
}

export function DecisionNode({ data, selected }: NodeProps<FlowNode>) {
  const handles = handlePositions(data);
  return (
    <Shell selected={selected} kind="decision">
      <Handle type="target" position={handles.target} className="!bg-sky-500" />
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-sm font-black text-white">
          ?
        </span>
        <KindTag kind="decision" />
      </div>
      <p className="mt-2 text-sm leading-snug font-bold">{data.title}</p>
      {data.subtitle && (
        <p className="mt-0.5 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
          {data.subtitle}
        </p>
      )}
      <Handle type="source" position={handles.source} className="!bg-sky-500" />
    </Shell>
  );
}

export function TechniqueNode({ data, selected }: NodeProps<FlowNode>) {
  const handles = handlePositions(data);
  const pattern = data.slug ? PATTERNS[data.slug] : undefined;
  return (
    <Shell selected={selected} kind="technique">
      <Handle type="target" position={handles.target} className="!bg-emerald-500" />
      <div className="flex items-center gap-2">
        <span
          className={cn("h-2.5 w-2.5 shrink-0 rounded-full", pattern?.accent ?? "bg-emerald-500")}
        />
        <KindTag kind="technique" />
      </div>
      <p className="mt-1.5 text-sm leading-snug font-bold">{data.title}</p>
      {data.subtitle && (
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
          {data.subtitle}
        </p>
      )}
      {pattern && (
        <p className="mt-1.5 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
          {pattern.complexity}
        </p>
      )}
      <Handle type="source" position={handles.source} className="!bg-emerald-500" />
    </Shell>
  );
}

export const nodeTypes = {
  start: StartNode,
  decision: DecisionNode,
  technique: TechniqueNode,
};
