import { describe, expect, it } from "vitest";

import { PATTERN_LIST, PATTERNS } from "./patterns";

describe("pattern library", () => {
  it("covers the flowchart's technique nodes", () => {
    const slugs = [
      "two-pointers",
      "sliding-window",
      "binary-search",
      "hash-map",
      "stack",
      "heap",
      "backtracking",
      "dp",
      "greedy",
      "trie",
      "mono-queue",
      "graph",
    ];
    for (const slug of slugs) {
      expect(PATTERNS[slug], `missing pattern: ${slug}`).toBeDefined();
    }
    expect(PATTERN_LIST).toHaveLength(slugs.length);
  });

  it("gives every pattern a complete study card", () => {
    for (const p of PATTERN_LIST) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.tagline.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.signals.length).toBeGreaterThan(0);
      expect(p.templatePython).toContain("def ");
      expect(p.problems).toHaveLength(3);
    }
  });

  it("links practice problems to LeetCode, consistently", () => {
    const titles = new Map<number, string>();
    for (const p of PATTERN_LIST) {
      const ids = p.problems.map((prob) => prob.id);
      expect(new Set(ids).size, `${p.slug} repeats a problem`).toBe(ids.length);
      for (const prob of p.problems) {
        expect(prob.url).toMatch(/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/u);
        // A problem may teach two patterns (e.g. 239), but never disagree.
        expect(titles.get(prob.id) ?? prob.title).toBe(prob.title);
        titles.set(prob.id, prob.title);
      }
    }
  });
});
