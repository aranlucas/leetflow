import { describe, expect, it } from "vitest";

import { initialEdges, initialNodes, reactFlowEdges } from "./elements";
import { getPolylineMidpoint, isRoutedData } from "./elk-edge";
import { getLayoutedElements } from "./layout";

describe("flowchart layout", () => {
  it("positions every node with finite coordinates", async () => {
    const { nodes, edges } = await getLayoutedElements(
      structuredClone(initialNodes),
      structuredClone(reactFlowEdges),
    );
    expect(nodes).toHaveLength(initialNodes.length);
    expect(edges).toHaveLength(reactFlowEdges.length);
    for (const node of nodes) {
      expect(Number.isFinite(node.position.x)).toBe(true);
      expect(Number.isFinite(node.position.y)).toBe(true);
    }
  });

  it("routes every edge with finite bend points", async () => {
    const { edges } = await getLayoutedElements(
      structuredClone(initialNodes),
      structuredClone(reactFlowEdges),
    );
    for (const edge of edges) {
      expect(isRoutedData(edge.data)).toBe(true);
      if (isRoutedData(edge.data)) {
        for (const bend of edge.data.bendPoints ?? []) {
          expect(Number.isFinite(bend.x)).toBe(true);
          expect(Number.isFinite(bend.y)).toBe(true);
        }
      }
    }
  });

  it("lays out horizontally for LR and differs from TB", async () => {
    const tb = await getLayoutedElements(
      structuredClone(initialNodes),
      structuredClone(reactFlowEdges),
      "TB",
    );
    const lr = await getLayoutedElements(
      structuredClone(initialNodes),
      structuredClone(reactFlowEdges),
      "LR",
    );
    const tbPos = tb.nodes.map((n) => `${n.position.x},${n.position.y}`);
    const lrPos = lr.nodes.map((n) => `${n.position.x},${n.position.y}`);
    expect(tbPos).not.toEqual(lrPos);
  });

  it("wires every edge to a real node", () => {
    const ids = new Set(initialNodes.map((n) => n.id));
    for (const e of initialEdges) {
      expect(ids.has(e.source)).toBe(true);
      expect(ids.has(e.target)).toBe(true);
    }
  });
});

describe("getPolylineMidpoint", () => {
  it("finds the length-weighted middle", () => {
    expect(
      getPolylineMidpoint([
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ]),
    ).toEqual({ x: 50, y: 0 });
    expect(
      getPolylineMidpoint([
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 10, y: 90 },
      ]),
    ).toEqual({ x: 10, y: 40 });
  });

  it("handles degenerate input", () => {
    expect(getPolylineMidpoint([])).toEqual({ x: 0, y: 0 });
    expect(getPolylineMidpoint([{ x: 3, y: 4 }])).toEqual({ x: 3, y: 4 });
  });
});
