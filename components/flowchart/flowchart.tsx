"use client";

import { initialEdges, initialNodes } from "./elements";
import { getLayoutedElements } from "./layout";
import ReactFlow, { useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div className="h-[calc(100vh-5rem)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
        fitView
      />
    </div>
  );
}
