import { Position, type Edge, type Node } from "@xyflow/react";
import type { ElkExtendedEdge, ElkNode } from "elkjs";

// Measured against the actual card sizes in nodes.tsx (w-[264px], cards run
// ~130-150px tall). Elk needs honest dimensions to route around nodes.
const nodeWidth = 264;
const nodeHeight = 150;

export type FlowDirection = "TB" | "LR";

export interface RoutedPoint {
  x: number;
  y: number;
}

function portSide(horizontal: boolean): { incoming: string; outgoing: string } {
  return horizontal
    ? { incoming: "WEST", outgoing: "EAST" }
    : { incoming: "NORTH", outgoing: "SOUTH" };
}

export const getLayoutedElements = async <N extends Node, E extends Edge>(
  nodes: N[],
  edges: E[],
  direction: FlowDirection = "TB",
): Promise<{ nodes: N[]; edges: E[] }> => {
  const horizontal = direction === "LR";
  const sides = portSide(horizontal);

  const elkNodes: ElkNode[] = nodes.map((node) => ({
    id: node.id,
    width: nodeWidth,
    height: nodeHeight,
    properties: { "elk.portConstraints": "FIXED_SIDE" },
    ports: [
      { id: "in", properties: { "elk.port.side": sides.incoming } },
      { id: "out", properties: { "elk.port.side": sides.outgoing } },
    ],
  }));

  const elkEdges: ElkExtendedEdge[] = edges.map((edge) => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
    sourcePort: "out",
    targetPort: "in",
  }));

  // Dynamically imported so elk (~1MB) loads on demand, not with the page.
  // The bundled build runs fully in-process (no worker needed).
  const { default: ELK } = await import("elkjs/lib/elk.bundled.js");
  const laidOut = await new ELK().layout({
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": horizontal ? "RIGHT" : "DOWN",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.layered.spacing.nodeNodeBetweenLayers": "110",
      "elk.spacing.nodeNode": "70",
      "elk.spacing.edgeEdge": "20",
      "elk.spacing.edgeNode": "30",
    },
    children: elkNodes,
    edges: elkEdges,
  });

  const placed = new Map((laidOut.children ?? []).map((child) => [child.id, child]));
  for (const node of nodes) {
    const child = placed.get(node.id);
    node.targetPosition = horizontal ? Position.Left : Position.Top;
    node.sourcePosition = horizontal ? Position.Right : Position.Bottom;
    // Elk anchors at top-left, matching XY Flow.
    node.position = { x: child?.x ?? 0, y: child?.y ?? 0 };
    node.data.direction = direction;
  }

  const routed = new Map((laidOut.edges ?? []).map((edge) => [edge.id, edge]));
  for (const edge of edges) {
    const sections = routed.get(edge.id)?.sections ?? [];
    const bendPoints: RoutedPoint[] = [];
    for (const section of sections) {
      for (const bend of section.bendPoints ?? []) {
        bendPoints.push({ x: bend.x, y: bend.y });
      }
    }
    edge.data = { ...edge.data, bendPoints };
  }

  return { nodes, edges };
};
