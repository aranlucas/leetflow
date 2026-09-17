export type Difficulty = "Easy" | "Medium" | "Hard";

export interface PracticeProblem {
  title: string;
  id: number;
  difficulty: Difficulty;
  url: string;
}

export interface Pattern {
  slug: string;
  name: string;
  tagline: string;
  /** Tailwind accent dot, used on nodes + cards */
  accent: string;
  description: string;
  signals: string[];
  templateTitle: string;
  templatePython: string;
  complexity: string;
  problems: PracticeProblem[];
}

const lc = (id: number, slug: string) => `https://leetcode.com/problems/${slug}/`;

export const PATTERNS: Record<string, Pattern> = {
  "two-pointers": {
    slug: "two-pointers",
    name: "Two Pointers",
    tagline: "Sorted array? Converge from both ends.",
    accent: "bg-sky-500",
    description:
      "Use two indices moving toward each other (or in lockstep over two inputs). Sorted arrays, pairs/triplets with a target sum, palindromes, and in-place partition problems are the classic tells.",
    signals: [
      "Input is sorted (or can be sorted)",
      "Looking for pairs / triplets with a constraint",
      "Palindrome checks, merging, or in-place removal",
    ],
    templateTitle: "Opposite ends",
    templatePython: `def two_pointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1`,
    complexity: "O(n) time · O(1) space",
    problems: [
      {
        id: 125,
        title: "Valid Palindrome",
        difficulty: "Easy",
        url: lc(125, "valid-palindrome"),
      },
      {
        id: 11,
        title: "Container With Most Water",
        difficulty: "Medium",
        url: lc(11, "container-with-most-water"),
      },
      { id: 15, title: "3Sum", difficulty: "Medium", url: lc(15, "3sum") },
    ],
  },
  "sliding-window": {
    slug: "sliding-window",
    name: "Sliding Window",
    tagline: "Subarrays / substrings with a constraint.",
    accent: "bg-emerald-500",
    description:
      "Maintain a window [l, r] and expand/shrink it while tracking a constraint (sum, distinct chars, frequency map). If the problem asks about contiguous subarrays or substrings, start here.",
    signals: [
      "Asks about subarrays / substrings",
      "Constraint: sum, length, distinct elements",
      "'Longest / shortest / count' + contiguous",
    ],
    templateTitle: "Variable window + counter",
    templatePython: `from collections import Counter

def sliding_window(s, k):
    need = Counter()
    left = 0
    best = 0
    for right, ch in enumerate(s):
        need[ch] += 1
        while not valid(need):   # shrink until valid
            need[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
    complexity: "O(n) time · O(k) space",
    problems: [
      {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        url: lc(3, "longest-substring-without-repeating-characters"),
      },
      {
        id: 76,
        title: "Minimum Window Substring",
        difficulty: "Hard",
        url: lc(76, "minimum-window-substring"),
      },
      {
        id: 239,
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        url: lc(239, "sliding-window-maximum"),
      },
    ],
  },
  "binary-search": {
    slug: "binary-search",
    name: "Binary Search",
    tagline: "Sorted input or a monotonic 'possible?' predicate.",
    accent: "bg-violet-500",
    description:
      "Sorted arrays are the obvious case, but the real power move is binary-search-on-answer: when feasibility is monotonic (if x works, everything above/below works), search the answer space.",
    signals: [
      "Sorted / rotated sorted input",
      "'Find minimum maximum' / capacity / threshold",
      "O(log n) hint or monotonic predicate",
    ],
    templateTitle: "Lower-bound search",
    templatePython: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# on answer: find smallest x with feasible(x) == True
def search_answer(lo, hi, feasible):
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
    complexity: "O(log n) time · O(1) space",
    problems: [
      {
        id: 704,
        title: "Binary Search",
        difficulty: "Easy",
        url: lc(704, "binary-search"),
      },
      {
        id: 33,
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        url: lc(33, "search-in-rotated-sorted-array"),
      },
      {
        id: 875,
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        url: lc(875, "koko-eating-bananas"),
      },
    ],
  },
  "hash-map": {
    slug: "hash-map",
    name: "Hash Map / Set",
    tagline: "O(1) lookups, frequencies, complements.",
    accent: "bg-amber-500",
    description:
      "Your default tool. Complements (Two Sum), frequencies, dedup, grouping, and memoization. If you need to 'find a specific element' or count things fast, reach for the map.",
    signals: [
      "Need fast lookup / contains / frequency",
      "Pairs with target, anagrams, duplicates",
      "Subarray sums (prefix-sum + map)",
    ],
    templateTitle: "Complement + prefix sums",
    templatePython: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i

from collections import Counter
def count_subarrays(nums, k):
    pref, ans = 0, 0
    freq = Counter({0: 1})
    for x in nums:
        pref += x
        ans += freq[pref - k]
        freq[pref] += 1
    return ans`,
    complexity: "O(n) time · O(n) space",
    problems: [
      { id: 1, title: "Two Sum", difficulty: "Easy", url: lc(1, "two-sum") },
      {
        id: 49,
        title: "Group Anagrams",
        difficulty: "Medium",
        url: lc(49, "group-anagrams"),
      },
      {
        id: 128,
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        url: lc(128, "longest-consecutive-sequence"),
      },
    ],
  },
  stack: {
    slug: "stack",
    name: "Stack",
    tagline: "Nesting, matching, next-greater, undo.",
    accent: "bg-orange-500",
    description:
      "Parentheses, string building with backspaces, daily temperatures, histogram areas. If distance/order between elements matters or things nest, a stack (often monotonic) is the answer.",
    signals: [
      "Parentheses / nesting / validity",
      "Next greater / previous smaller element",
      "String building with deletions",
    ],
    templateTitle: "Monotonic stack",
    templatePython: `def daily_temperatures(t):
    ans = [0] * len(t)
    st = []  # decreasing stack of indices
    for i, x in enumerate(t):
        while st and t[st[-1]] < x:
            j = st.pop()
            ans[j] = i - j
        st.append(i)
    return ans`,
    complexity: "O(n) time · O(n) space",
    problems: [
      {
        id: 20,
        title: "Valid Parentheses",
        difficulty: "Easy",
        url: lc(20, "valid-parentheses"),
      },
      {
        id: 739,
        title: "Daily Temperatures",
        difficulty: "Medium",
        url: lc(739, "daily-temperatures"),
      },
      {
        id: 84,
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        url: lc(84, "largest-rectangle-in-histogram"),
      },
    ],
  },
  heap: {
    slug: "heap",
    name: "Heap",
    tagline: "Repeated max / min under inserts + deletes.",
    accent: "bg-rose-500",
    description:
      "Continuously need the largest/smallest? Heap. Top-K, merge K sorted lists, running median (two heaps). Python's heapq is a min-heap — negate for max.",
    signals: [
      "Top K / Kth largest / smallest",
      "Merge sorted streams",
      "Running median or scheduling",
    ],
    templateTitle: "Top-K with heapq",
    templatePython: `import heapq

def top_k(nums, k):
    return heapq.nlargest(k, nums)

def kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    return h[0]`,
    complexity: "O(n log k) time · O(k) space",
    problems: [
      {
        id: 215,
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        url: lc(215, "kth-largest-element-in-an-array"),
      },
      {
        id: 347,
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        url: lc(347, "top-k-frequent-elements"),
      },
      {
        id: 295,
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        url: lc(295, "find-median-from-data-stream"),
      },
    ],
  },
  backtracking: {
    slug: "backtracking",
    name: "Backtracking",
    tagline: "Enumerate ALL subsets / permutations / paths.",
    accent: "bg-fuchsia-500",
    description:
      "The word 'all' is the tell: all subsets, permutations, combinations, board placements. Build candidates incrementally, recurse, undo. Prune invalid branches early.",
    signals: [
      "Asks for ALL solutions / permutations / subsets",
      "Combinatorial explosion, small n (≤ 20)",
      "Board / grid placement with constraints",
    ],
    templateTitle: "Choose → recurse → unchoose",
    templatePython: `def subsets(nums):
    ans, cur = [], []
    def backtrack(i):
        if i == len(nums):
            ans.append(cur.copy())
            return
        cur.append(nums[i])   # take
        backtrack(i + 1)
        cur.pop()             # skip
        backtrack(i + 1)
    backtrack(0)
    return ans`,
    complexity: "O(2^n / n!) time · O(n) space",
    problems: [
      {
        id: 78,
        title: "Subsets",
        difficulty: "Medium",
        url: lc(78, "subsets"),
      },
      {
        id: 46,
        title: "Permutations",
        difficulty: "Medium",
        url: lc(46, "permutations"),
      },
      {
        id: 51,
        title: "N-Queens",
        difficulty: "Hard",
        url: lc(51, "n-queens"),
      },
    ],
  },
  dp: {
    slug: "dp",
    name: "Dynamic Programming",
    tagline: "Overlapping subproblems + optimal substructure.",
    accent: "bg-indigo-500",
    description:
      "Decisions affect future decisions and subproblems repeat. Look for: min/max cost, counting ways, true/false feasibility over prefixes. Define the state, then the recurrence.",
    signals: [
      "Min / max / count ways over sequences",
      "Choices affect later choices",
      "Prefix / substring optimality (knapsack, LIS, edit)",
    ],
    templateTitle: "1-D DP + memo",
    templatePython: `from functools import lru_cache

def coin_change(coins, amount):
    @lru_cache(None)
    def dp(rem):
        if rem == 0:
            return 0
        if rem < 0:
            return float("inf")
        return 1 + min(dp(rem - c) for c in coins)
    ans = dp(amount)
    return ans if ans != float("inf") else -1`,
    complexity: "O(n · target) time · O(target) space",
    problems: [
      {
        id: 70,
        title: "Climbing Stairs",
        difficulty: "Easy",
        url: lc(70, "climbing-stairs"),
      },
      {
        id: 300,
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        url: lc(300, "longest-increasing-subsequence"),
      },
      {
        id: 322,
        title: "Coin Change",
        difficulty: "Medium",
        url: lc(322, "coin-change"),
      },
    ],
  },
  greedy: {
    slug: "greedy",
    name: "Greedy",
    tagline: "Local optimum = global optimum. Prove it.",
    accent: "bg-lime-600",
    description:
      "When a locally optimal choice never hurts the future (interval scheduling, jumps, refueling), greedy wins. Sort by end time / farthest reach and commit. If you're unsure, try to break it with a counterexample first.",
    signals: [
      "Intervals, jumps, refuel / coverage",
      "Sort + single pass feels sufficient",
      "No revisiting past decisions needed",
    ],
    templateTitle: "Jump game reach",
    templatePython: `def can_jump(nums):
    reach = 0
    for i, x in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + x)
    return True`,
    complexity: "O(n log n) time · O(1) space",
    problems: [
      {
        id: 55,
        title: "Jump Game",
        difficulty: "Medium",
        url: lc(55, "jump-game"),
      },
      {
        id: 134,
        title: "Gas Station",
        difficulty: "Medium",
        url: lc(134, "gas-station"),
      },
      {
        id: 763,
        title: "Partition Labels",
        difficulty: "Medium",
        url: lc(763, "partition-labels"),
      },
    ],
  },
  trie: {
    slug: "trie",
    name: "Trie",
    tagline: "Prefix matching over many words.",
    accent: "bg-teal-500",
    description:
      "Autocomplete, prefix search, word-break over a dictionary, Word Search II. A trie shares prefixes so lookups cost O(word length) regardless of dictionary size.",
    signals: [
      "Prefix / autocomplete queries",
      "Many words, many queries",
      "Board + dictionary search",
    ],
    templateTitle: "Minimal trie",
    templatePython: `class Trie:
    def __init__(self):
        self.next = {}
        self.word = False
    def insert(self, w):
        node = self
        for ch in w:
            node = node.next.setdefault(ch, Trie())
        node.word = True
    def starts_with(self, p):
        node = self
        for ch in p:
            node = node.next.get(ch)
            if not node:
                return False
        return True`,
    complexity: "O(L) per op · O(total chars) space",
    problems: [
      {
        id: 208,
        title: "Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        url: lc(208, "implement-trie-prefix-tree"),
      },
      {
        id: 648,
        title: "Replace Words",
        difficulty: "Medium",
        url: lc(648, "replace-words"),
      },
      {
        id: 212,
        title: "Word Search II",
        difficulty: "Hard",
        url: lc(212, "word-search-ii"),
      },
    ],
  },
  "mono-queue": {
    slug: "mono-queue",
    name: "Monotonic Queue",
    tagline: "Sliding-window max / min in O(n).",
    accent: "bg-cyan-500",
    description:
      "A deque that keeps candidates in decreasing (or increasing) order so the front is always the current window's max/min. The upgrade when a heap in a sliding window is too slow.",
    signals: [
      "Sliding window + max / min query",
      "Heap solution TLEs",
      "Next greater / trapping rain water",
    ],
    templateTitle: "Sliding window max",
    templatePython: `from collections import deque

def max_sliding_window(nums, k):
    dq, ans = deque(), []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] < x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            ans.append(nums[dq[0]])
    return ans`,
    complexity: "O(n) time · O(k) space",
    problems: [
      {
        id: 496,
        title: "Next Greater Element I",
        difficulty: "Easy",
        url: lc(496, "next-greater-element-i"),
      },
      {
        id: 42,
        title: "Trapping Rain Water",
        difficulty: "Hard",
        url: lc(42, "trapping-rain-water"),
      },
      {
        id: 239,
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        url: lc(239, "sliding-window-maximum"),
      },
    ],
  },
  graph: {
    slug: "graph",
    name: "Graph (BFS / DFS)",
    tagline: "Islands, clones, courses, shortest paths.",
    accent: "bg-blue-600",
    description:
      "Grid or edge-list input? Think traversal. Islands/flood-fill → DFS/BFS, shortest unweighted path → BFS, ordering with prerequisites → topological sort, connectivity → Union-Find.",
    signals: [
      "Grid of 1s/0s, nodes + edges",
      "Shortest path / connected components",
      "Prerequisites / course ordering",
    ],
    templateTitle: "BFS + topological sort",
    templatePython: `from collections import deque

def num_islands(grid):
    R, C = len(grid), len(grid[0])
    def bfs(r, c):
        q = deque([(r, c)])
        grid[r][c] = "0"
        while q:
            x, y = q.popleft()
            for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx, ny = x+dx, y+dy
                if 0 <= nx < R and 0 <= ny < C and grid[nx][ny] == "1":
                    grid[nx][ny] = "0"
                    q.append((nx, ny))
    ans = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == "1":
                bfs(r, c)
                ans += 1
    return ans`,
    complexity: "O(V + E) time · O(V) space",
    problems: [
      {
        id: 200,
        title: "Number of Islands",
        difficulty: "Medium",
        url: lc(200, "number-of-islands"),
      },
      {
        id: 133,
        title: "Clone Graph",
        difficulty: "Medium",
        url: lc(133, "clone-graph"),
      },
      {
        id: 207,
        title: "Course Schedule",
        difficulty: "Medium",
        url: lc(207, "course-schedule"),
      },
    ],
  },
};

export const PATTERN_LIST = Object.values(PATTERNS);

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/30",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/30",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/30",
};
