"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../ui/sheet";
import { initialEdges, initialNodes } from "./elements";
import { getLayoutedElements } from "./layout";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import ReactFlow, { Node, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-[calc(100vh-5rem)] w-full">
        <ReactFlow
          onNodeClick={(_, node) => {
            setSelectedNode(node);
            setOpen(true);
          }}
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
          fitView
        />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent position="right" size="sm">
          <pre>{JSON.stringify(selectedNode, null, 2)}</pre>
        </SheetContent>
      </Sheet>
    </>
  );
}
