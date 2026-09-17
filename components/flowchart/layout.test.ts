import { describe, expect, it } from "vitest";

import { initialEdges, initialNodes, reactFlowEdges } from "./elements";
import { getLayoutedElements } from "./layout";

describe("flowchart layout", () => {
  it("positions every node with finite coordinates", () => {
    const { nodes, edges } = getLayoutedElements(
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

  it("lays out horizontally for LR and differs from TB", () => {
    const tb = getLayoutedElements(
      structuredClone(initialNodes),
      structuredClone(reactFlowEdges),
      "TB",
    );
    const lr = getLayoutedElements(
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
