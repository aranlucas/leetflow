import type { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "LeetFlow",
  description:
    "From problem statement to pattern in 30 seconds. Interactive flowcharts, code templates, and curated LeetCode problems.",
  mainNav: [
    {
      title: "Flowchart",
      href: "/#flowchart",
    },
    {
      title: "Patterns",
      href: "/#patterns",
    },
  ],
};
