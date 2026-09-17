"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
} from "@xyflow/react";
import {
  ArrowUpRight,
  BookOpenCheck,
  Check,
  Copy,
  GitBranch,
  ListFilter,
  RotateCcw,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DIFFICULTY_STYLES, PATTERNS, PATTERN_LIST } from "@/lib/patterns";
import { cn } from "@/lib/utils";

import { initialNodes, reactFlowEdges } from "./elements";
import { getLayoutedElements } from "./layout";
import { nodeTypes, type FlowNode } from "./nodes";

import "@xyflow/react/dist/style.css";

type Direction = "TB" | "LR";
const LEARNED_KEY = "leetflow-learned";

function PatternDetail({
  slug,
  learned,
  onToggleLearned,
}: {
  slug: string;
  learned: boolean;
  onToggleLearned: (slug: string) => void;
}) {
  const p = PATTERNS[slug];
  const [copied, setCopied] = useState(false);
  if (!p) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full", p.accent)} />
          <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            Pattern
          </span>
        </div>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{p.name}</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{p.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[11px]">
            {p.complexity}
          </Badge>
          <Button
            size="sm"
            variant={learned ? "subtle" : "default"}
            onClick={() => {
              onToggleLearned(slug);
            }}
            className="h-7 text-xs"
          >
            {learned ? (
              <>
                <Check className="mr-1 h-3.5 w-3.5" /> Learned
              </>
            ) : (
              <>
                <BookOpenCheck className="mr-1 h-3.5 w-3.5" /> Mark learned
              </>
            )}
          </Button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{p.description}</p>

      <div>
        <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Recognize it</h3>
        <ul className="mt-2 space-y-1.5">
          {p.signals.map((s) => (
            <li key={s} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-200">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
            {p.templateTitle} · Python
          </h3>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={() => {
              void navigator.clipboard?.writeText(p.templatePython);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1500);
            }}
          >
            {copied ? (
              <Check className="mr-1 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-1 h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="mt-2 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-[12px] leading-relaxed text-zinc-100 dark:bg-black dark:ring-1 dark:ring-zinc-800">
          {p.templatePython}
        </pre>
      </div>

      <div>
        <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Practice next</h3>
        <div className="mt-2 space-y-2">
          {p.problems.map((prob) => (
            <a
              key={prob.id}
              href={prob.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-3 py-2.5 transition hover:border-amber-400/60 hover:shadow-sm dark:border-zinc-800"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-zinc-400">{prob.id}</span>
                <span className="text-sm font-medium group-hover:underline">{prob.title}</span>
              </div>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                    DIFFICULTY_STYLES[prob.difficulty],
                  )}
                >
                  {prob.difficulty}
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-amber-500" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecisionDetail({
  nodeId,
  nodes,
  edges,
  onJump,
}: {
  nodeId: string;
  nodes: FlowNode[];
  edges: Edge[];
  onJump: (id: string) => void;
}) {
  const node = nodes.find((n) => n.id === nodeId);
  const outgoing = edges.filter((e) => e.source === nodeId);
  if (!node) {
    return null;
  }
  const { title, subtitle } = node.data;
  return (
    <div className="space-y-5">
      <div>
        <span className="text-xs font-semibold tracking-widest text-sky-600 uppercase dark:text-sky-300">
          Decision point
        </span>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      <div>
        <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Choose your answer
        </h3>
        <div className="mt-2 space-y-2">
          {outgoing.map((e) => {
            const target = nodes.find((n) => n.id === e.target);
            const t = target?.data;
            const isPattern = target?.type === "technique";
            const label = typeof e.label === "string" ? e.label : undefined;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  onJump(e.target);
                }}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-200 px-3 py-2.5 text-left transition hover:border-sky-400/60 hover:bg-sky-500/5 dark:border-zinc-800"
              >
                <span>
                  {label && (
                    <span className="mr-2 inline-flex rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-bold text-sky-600 dark:text-sky-300">
                      {label}
                    </span>
                  )}
                  <span className="text-sm font-medium">{t?.title}</span>
                  {isPattern && t?.slug && (
                    <span className="block text-xs text-zinc-500">{PATTERNS[t.slug]?.tagline}</span>
                  )}
                </span>
                <span className="text-sky-500">→</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="rounded-xl bg-zinc-100 p-3 text-xs leading-relaxed text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300">
        Tip: answer honestly — the fastest way to learn patterns is to walk the chart with a real
        problem open in another tab.
      </p>
    </div>
  );
}

function Canvas() {
  const [direction, setDirection] = useState("TB" as Direction);
  const [nodes, setNodes, onNodesChange] = useNodesState([] as FlowNode[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [learned, setLearned] = useState<string[]>([]);
  const { fitView, setCenter } = useReactFlow();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LEARNED_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (
          Array.isArray(parsed) &&
          parsed.every((entry): entry is string => typeof entry === "string")
        ) {
          setLearned(parsed);
        }
      }
    } catch {
      // LocalStorage is unavailable (private mode, SSR); ignore.
    }
  }, []);

  const toggleLearned = useCallback((slug: string) => {
    setLearned((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(LEARNED_KEY, JSON.stringify(next));
      } catch {
        // LocalStorage is unavailable (private mode, SSR); ignore.
      }
      return next;
    });
  }, []);

  const relayout = useCallback(
    (dir: Direction) => {
      const { nodes: n, edges: e } = getLayoutedElements(initialNodes, reactFlowEdges, dir);
      setNodes(n);
      setEdges(e);
      setTimeout(() => {
        void fitView({ padding: 0.2, duration: 300 });
      }, 50);
    },
    [fitView, setEdges, setNodes],
  );

  useEffect(() => {
    relayout(direction);
  }, [direction, relayout]);

  const openNode = useCallback(
    (id: string) => {
      setSelectedId(id);
      setSheetOpen(true);
      const n = nodes.find((x) => x.id === id);
      if (n) {
        void setCenter(n.position.x + 132, n.position.y + 75, {
          zoom: 1.1,
          duration: 400,
        });
      }
    },
    [nodes, setCenter],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return PATTERN_LIST;
    }
    return PATTERN_LIST.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.signals.some((s) => s.toLowerCase().includes(q)),
    );
  }, [query]);

  const selectedNode = nodes.find((n) => n.id === selectedId);
  const selectedKind = selectedNode?.type;
  const selectedSlug = selectedNode?.data.slug;

  return (
    <div id="flowchart" className="grid gap-4 lg:grid-cols-[300px_1fr]">
      {/* Sidebar */}
      <aside className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-sm font-bold">
              <ListFilter className="h-4 w-4 text-amber-500" /> Pattern finder
            </h2>
            <span className="text-xs text-zinc-500">
              {learned.length}/{PATTERN_LIST.length} learned
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all"
              style={{ width: `${(learned.length / PATTERN_LIST.length) * 100}%` }}
            />
          </div>
          <div className="relative mt-3">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-zinc-400" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search: sliding, heap, prefix…"
              aria-label="Search patterns"
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[340px] lg:h-[calc(70vh-240px)] lg:min-h-[320px]">
          <div className="space-y-1 p-2">
            {filtered.map((p) => {
              const done = learned.includes(p.slug);
              return (
                <button
                  key={p.slug}
                  type="button"
                  aria-label={p.name}
                  onClick={() => {
                    openNode(p.slug);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800/70",
                    selectedId === p.slug && "bg-amber-400/10 ring-1 ring-amber-400/50",
                  )}
                >
                  <span className={cn("h-2 w-2 shrink-0 rounded-full", p.accent)} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[13px] leading-tight font-semibold">
                      {p.name}
                      {done && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                    </span>
                    <span className="block truncate text-xs text-zinc-500">{p.tagline}</span>
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-zinc-500">
                No patterns match “{query}”.
              </p>
            )}
          </div>
        </ScrollArea>
      </aside>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 p-3 dark:border-zinc-800">
          <span className="flex items-center gap-1.5 text-sm font-bold">
            <GitBranch className="h-4 w-4 text-amber-500" /> Which pattern fits?
          </span>
          <span className="hidden text-xs text-zinc-500 sm:inline">
            Click any node — decisions walk you forward, patterns give templates
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex overflow-hidden rounded-lg border border-zinc-200 text-xs font-semibold dark:border-zinc-700">
              {(["TB", "LR"] as Direction[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setDirection(d);
                  }}
                  className={cn(
                    "px-2.5 py-1.5",
                    direction === d
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                >
                  {d === "TB" ? "Top ↓" : "Left →"}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => {
                relayout(direction);
              }}
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
            </Button>
          </div>
        </div>
        <div className="h-[70vh] max-h-[860px] min-h-[560px] w-full lg:h-[72vh]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => {
              openNode(node.id);
            }}
            nodesDraggable={false}
            nodesConnectable={false}
            proOptions={{ hideAttribution: true }}
            fitView
            minZoom={0.3}
            defaultEdgeOptions={{
              style: { strokeWidth: 1.6, stroke: "#a1a1aa" },
              labelStyle: { fontSize: 10, fontWeight: 700 },
              labelBgStyle: { fill: "white", fillOpacity: 0.9 },
              labelBgPadding: [6, 3] as [number, number],
              labelBgBorderRadius: 8,
            }}
          >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} />
            <Controls showInteractive={false} />
            <MiniMap pannable zoomable className="!bg-white dark:!bg-zinc-900" />
          </ReactFlow>
        </div>
      </div>

      {/* Detail sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent position="right" size="content" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="sr-only">Pattern details</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full pr-1">
            {selectedKind === "technique" && selectedSlug ? (
              <PatternDetail
                slug={selectedSlug}
                learned={learned.includes(selectedSlug)}
                onToggleLearned={toggleLearned}
              />
            ) : selectedId ? (
              <DecisionDetail nodeId={selectedId} nodes={nodes} edges={edges} onJump={openNode} />
            ) : null}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function FlowChart() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
