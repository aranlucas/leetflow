import { MarkerType, type Edge } from "@xyflow/react";

import { PATTERNS } from "@/lib/patterns";

import type { FlowNode } from "./nodes";

const at = { x: 0, y: 0 };

const technique = (slug: keyof typeof PATTERNS): FlowNode => ({
  id: slug,
  type: "technique",
  position: at,
  data: {
    title: PATTERNS[slug].name,
    subtitle: PATTERNS[slug].tagline,
    kind: "technique",
    slug,
  },
});

const decision = (id: string, title: string, subtitle?: string): FlowNode => ({
  id,
  type: "decision",
  position: at,
  data: { title, subtitle, kind: "decision" },
});

const start = (id: string, title: string, subtitle?: string): FlowNode => ({
  id,
  type: "start",
  position: at,
  data: { title, subtitle, kind: "start" },
});

export const initialNodes: FlowNode[] = [
  start("start", "What is the input?", "Follow the chart — answer each question"),
  decision("q-array", "Sorted array?", "Or sortable / rotated / searchable answer space"),
  decision("q-graph", "Graph, grid, or edges?", "Nodes, islands, prerequisites, paths"),
  technique("two-pointers"),
  technique("binary-search"),
  decision("q-ask", "What is the question asking for?", "Match the output shape to a pattern"),
  technique("stack"),
  technique("trie"),
  technique("backtracking"),
  technique("hash-map"),
  decision(
    "q-decisions",
    "Do decisions affect future decisions?",
    "Overlapping subproblems → DP, else greedy",
  ),
  technique("dp"),
  decision(
    "q-greedy",
    "Is greedy safe?",
    "Threshold / feasibility zones → binary search on answer",
  ),
  technique("greedy"),
  decision(
    "q-shape",
    "Subarrays? Or repeated max/min?",
    "Contiguous → window · extremes → heap/queue",
  ),
  technique("sliding-window"),
  decision("q-extremes", "How are extremes used?", "Random access → heap · windowed → mono queue"),
  technique("heap"),
  technique("mono-queue"),
  technique("graph"),
  start("always", "Universal tools", "Try these on EVERY problem first"),
];

export interface FlowEdge {
  source: string;
  target: string;
  label?: string;
}

const edge = (source: string, target: string, label?: string): FlowEdge => ({
  source,
  target,
  label,
});

export const initialEdges: FlowEdge[] = [
  edge("start", "q-array"),
  edge("start", "q-graph"),
  edge("q-array", "binary-search", "Yes"),
  edge("q-array", "two-pointers", "Sorted + pairs"),
  edge("q-array", "q-ask", "No"),
  edge("two-pointers", "q-ask", "Not pairs"),
  edge("q-graph", "graph", "Yes — traverse"),
  edge("q-graph", "q-ask", "No"),
  edge("q-ask", "stack", "Nesting / distances"),
  edge("q-ask", "trie", "Prefixes"),
  edge("q-ask", "backtracking", "ALL combos"),
  edge("q-ask", "hash-map", "Find / count"),
  edge("q-ask", "q-decisions", "Optimization"),
  edge("q-decisions", "dp", "Yes — overlap"),
  edge("q-decisions", "q-greedy", "No"),
  edge("q-greedy", "binary-search", "Threshold"),
  edge("q-greedy", "greedy", "Greedy works"),
  edge("q-greedy", "q-shape", "Not greedy"),
  edge("q-shape", "sliding-window", "Subarrays"),
  edge("q-shape", "q-extremes", "Max / min"),
  edge("q-extremes", "heap", "Top-K / median"),
  edge("q-extremes", "mono-queue", "Windowed"),
  edge("always", "hash-map", "Map / set first"),
  edge("greedy", "sliding-window", "…or windows"),
];

export const reactFlowEdges: Edge[] = initialEdges.map((e) => ({
  id: `${e.source}→${e.target}${e.label ? `:${e.label}` : ""}`,
  source: e.source,
  target: e.target,
  label: e.label,
  type: "smoothstep",
  animated: false,
  markerEnd: { type: MarkerType.ArrowClosed },
}));
