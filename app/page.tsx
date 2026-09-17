"use client";

import { ArrowDown, Compass, FlaskConical, Timer, Workflow } from "lucide-react";
import { useState } from "react";

import FlowChart from "@/components/flowchart/flowchart";
import { DIFFICULTY_STYLES, PATTERN_LIST } from "@/lib/patterns";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Compass,
    title: "1. Name the input",
    text: "Sorted array? Grid? Edges? The top of the chart splits the universe in two.",
  },
  {
    icon: Workflow,
    title: "2. Walk the decisions",
    text: "Click a blue decision node and pick the answer that matches your problem.",
  },
  {
    icon: FlaskConical,
    title: "3. Steal the template",
    text: "Every pattern ships a Python starter plus 3 curated LeetCode problems.",
  },
];

function scrollToChart() {
  document.querySelector("#flowchart")?.scrollIntoView({ behavior: "smooth" });
}

export default function IndexPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = q
    ? PATTERN_LIST.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q),
      )
    : PATTERN_LIST;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200/70 dark:border-zinc-800">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(251,191,36,0.18),transparent),radial-gradient(40%_35%_at_80%_20%,rgba(16,185,129,0.12),transparent)]"
        />
        <div className="relative container py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">
            <Timer className="h-3.5 w-3.5" /> From problem statement → pattern in 30 seconds
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Stop guessing.
            <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Follow the flow.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            LeetFlow is an interactive decision chart for LeetCode-style problems. Answer 2–4
            questions about your input and output, land on the right pattern, copy the template, and
            solve the 3 problems that teach it best.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={scrollToChart}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-amber-400 dark:text-zinc-950"
            >
              Start the flowchart <ArrowDown className="h-4 w-4" />
            </button>
            <a
              href="#patterns"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-bold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Browse 12 patterns
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-zinc-200 bg-white/70 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
              >
                <s.icon className="h-5 w-5 text-amber-500" />
                <p className="mt-2 text-sm font-bold">{s.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App */}
      <main className="container py-8">
        <FlowChart />
      </main>

      {/* Pattern grid */}
      <section id="patterns" className="border-t border-zinc-200/70 dark:border-zinc-800">
        <div className="container py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Pattern library</h2>
              <p className="mt-1 text-sm text-zinc-500">
                12 patterns · each with signals, a Python template, and 3 problems.
              </p>
            </div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              aria-label="Filter patterns"
              placeholder="Filter patterns…"
              className="w-full max-w-xs rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", p.accent)} />
                  <h3 className="text-base font-bold">{p.name}</h3>
                </div>
                <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">{p.tagline}</p>
                <p className="mt-2 font-mono text-[11px] text-zinc-400">{p.complexity}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.problems.map((prob) => (
                    <a
                      key={prob.id}
                      href={prob.url}
                      target="_blank"
                      rel="noreferrer"
                      title={`${prob.id}. ${prob.title}`}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 transition hover:opacity-80",
                        DIFFICULTY_STYLES[prob.difficulty],
                      )}
                    >
                      {prob.id}
                    </a>
                  ))}
                  <span className="px-1 py-0.5 text-[11px] text-zinc-400">Open on LeetCode →</span>
                </div>
                <button
                  type="button"
                  onClick={scrollToChart}
                  className="mt-4 rounded-xl bg-zinc-100 py-2 text-[13px] font-bold transition group-hover:bg-amber-400 group-hover:text-zinc-950 dark:bg-zinc-800"
                >
                  Open in flowchart
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200/70 dark:border-zinc-800">
        <div className="container flex flex-col gap-1 py-6 text-[13px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-bold text-zinc-800 dark:text-zinc-100">LeetFlow</span> — learn the
            pattern, then solve the problem.
          </p>
          <p>Templates are starters, not solutions. Struggle first, then peek.</p>
        </div>
      </footer>
    </div>
  );
}
