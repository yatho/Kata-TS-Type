import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  workshopSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "🎢 Introduction",
    },
    {
      type: "doc",
      id: "setup",
      label: "⚙️ Installation",
    },
    {
      type: "category",
      label: "Modules",
      collapsed: false,
      items: [
        "modules/01-branded-types",
        "modules/02-discriminated-unions",
        "modules/03-exhaustiveness",
        "modules/04-template-literal-types",
        "modules/05-illegal-states",
        "modules/06-parsing-boundary",
      ],
    },
    {
      type: "doc",
      id: "going-further",
      label: "🚀 Aller plus loin",
    },
  ],
};

export default sidebars;
