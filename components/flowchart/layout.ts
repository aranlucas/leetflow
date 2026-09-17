import { graphlib, layout as dagreLayout } from "@dagrejs/dagre";
import { Position, type Edge, type Node } from "@xyflow/react";

const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

interface PositionedNode {
  x: number;
  y: number;
}

/** Read a laid-out position back out of dagre, failing loudly on mismatch. */
function nodePosition(id: string): PositionedNode {
  const node: unknown = dagreGraph.node(id);
  if (
    typeof node === "object" &&
    node !== null &&
    "x" in node &&
    "y" in node &&
    typeof node.x === "number" &&
    typeof node.y === "number"
  ) {
    return { x: node.x, y: node.y };
  }
  throw new Error(`dagre produced no position for node "${id}"`);
}

const nodeWidth = 250;
const nodeHeight = 60;
type direction = "TB" | "LR";

export const getLayoutedElements = <N extends Node, E extends Edge>(
  nodes: N[],
  edges: E[],
  direction: direction = "TB",
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  for (const node of nodes) {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  }

  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target);
  }

  dagreLayout(dagreGraph);

  for (const node of nodes) {
    const nodeWithPosition = nodePosition(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // Dagre anchors at center-center; XY Flow anchors at top-left.
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  }

  return { nodes, edges };
};
