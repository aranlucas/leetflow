import { Node, Edge, MarkerType } from "reactflow";

const position = { x: 0, y: 0 };

export const initialNodes: Node[] = [
  { id: "1", position, data: { label: "1" }, type: "input" },
  { id: "2", position, data: { label: "2" }, type: "output" },
];
export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "label",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
];
