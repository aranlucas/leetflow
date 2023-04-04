import { Node, Edge, MarkerType } from "reactflow";

const position = { x: 0, y: 0 };
const id = {
  start: "start",
  inputDecisionArray: "input-decision-array",
  inputDecisionGraph: "input-decision-graph",
  twoPointers: "two-pointers",
  questionAskingFor: "question-asking-for",
  backtracking: "backtracking",
  stack: "stack",
  map: "map",
  greedyDecision: "decision-greedy",
  greedy: "greedy",
  dp: "dp",
  always: "always",
  binarySearch: "binary-search",
  notGreedy: "not-greedy",
  slidingWindow: "sliding-window",
  maxMin: "max-min",
  heap: "heap",
  monotonicQueue: "monotonic-queue",
  trie: "trie",
};

export const initialNodes: Node[] = [
  { id: id.start, position, data: { label: "start" }, type: "input" },
  {
    id: id.inputDecisionArray,
    position,
    data: { label: "input is sorted array" },
    type: "default",
  },
  {
    id: id.stack,
    position,
    data: { label: "Stack or monotonic queue" },
    type: "output",
  },
  {
    id: id.binarySearch,
    position,
    data: {
      label: "Binary Search",
    },
    type: "output",
  },
  {
    id: id.inputDecisionGraph,
    position,
    data: { label: "input is graph" },
    type: "default",
  },
  {
    id: id.twoPointers,
    position,
    data: { label: "two-pointers" },
    type: "default",
  },

  {
    id: id.questionAskingFor,
    position,
    data: { label: "question is asking for" },
    type: "default",
  },
  {
    id: id.map,
    position,
    data: { label: "Hash map or set" },
    type: "output",
  },

  {
    id: id.greedyDecision,
    position,
    data: {
      label:
        '"Decisions" need to be made, which are affected by other decisions',
    },
    type: "default",
  },

  {
    id: id.always,
    position,
    data: { label: "Think about for any problem" },
    type: "input",
  },

  {
    id: id.greedy,
    position,
    data: {
      label: "Greedy",
    },
    type: "default",
  },
  {
    id: id.dp,
    position,
    data: {
      label: "Dynamic Programming",
    },
    type: "output",
  },
  {
    id: id.backtracking,
    position,
    data: { label: "backtracking" },
    type: "output",
  },
  {
    id: id.notGreedy,
    position,
    data: { label: "Question is asking for/involves..." },
    type: "default",
  },
  {
    id: id.slidingWindow,
    position,
    data: { label: "Sliding window or counting hash map" },
    type: "output",
  },
  {
    id: id.maxMin,
    position,
    data: { label: "Elements are added/removed in..." },
    type: "default",
  },
  {
    id: id.heap,
    position,
    data: { label: "Heap" },
    type: "output",
  },
  {
    id: id.monotonicQueue,
    position,
    data: { label: "Monotonic Queue" },
    type: "output",
  },
  {
    id: id.trie,
    position,
    data: { label: "Trie" },
    type: "output",
  },
];

const edges: Omit<Edge, "id">[] = [
  {
    source: id.start,
    target: id.inputDecisionArray,
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.start,
    target: id.inputDecisionGraph,
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.inputDecisionArray,
    target: id.binarySearch,
    label: "Yes",

    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.inputDecisionArray,
    target: id.twoPointers,
    label: "Yes",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.inputDecisionArray,
    target: id.questionAskingFor,
    label: "No",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.questionAskingFor,
    target: id.backtracking,
    label: "ALL of something. Permutations/Combinations/Subsets",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.questionAskingFor,
    target: id.stack,
    label: "String building \n Distance between elements",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.questionAskingFor,
    target: id.trie,
    label: "Prefix matching",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.always,
    target: id.map,
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.questionAskingFor,
    target: id.map,
    label: "Finding a specific element",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },

  {
    source: id.questionAskingFor,
    target: id.greedyDecision,
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },

  {
    source: id.greedyDecision,
    target: id.dp,
    label: "Yes",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.greedyDecision,
    target: id.greedy,
    label: "No",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.greedy,
    target: id.binarySearch,
    label:
      'Problem satisfies property where "possible" and "impossible" are two infinite zones separated by threshold',
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.twoPointers,
    target: id.questionAskingFor,
    label: "No",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.greedy,
    target: id.notGreedy,
    label: "Not necessarily greedy",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.notGreedy,
    target: id.slidingWindow,
    label: "Subarrays or substrings",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },

  {
    source: id.notGreedy,
    target: id.maxMin,
    label: "Continuously finding max/min elements",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.maxMin,
    target: id.heap,
    label: "Max/min continously removed",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    source: id.maxMin,
    target: id.monotonicQueue,
    label: "Sliding window fashion",
    type: "smoothstep",

    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
];

export const initialEdges = edges.map((e) => {
  return {
    id: `${e.source}-${e.target}`,
    ...e,
  };
});
