import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Type-Driven Kata",
  tagline: "Rendre les états invalides impossibles à représenter",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://your-org.github.io",
  baseUrl: "/Kata-TS-Type",

  organizationName: "yatho",
  projectName: "Type-Driven-TS",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Type-Driven Kata",
      items: [
        {
          type: "docSidebar",
          sidebarId: "workshopSidebar",
          position: "left",
          label: "Modules",
        },
        {
          href: "https://github.com/yatho/Kata-TS-Type",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Workshop",
          items: [
            { label: "Introduction", to: "/" },
            { label: "Installation", to: "/setup" },
          ],
        },
        {
          title: "Concepts",
          items: [
            { label: "Branded Types", to: "/modules/01-branded-types" },
            {
              label: "Unions discriminées",
              to: "/modules/02-discriminated-unions",
            },
            { label: "États illégaux", to: "/modules/05-illegal-states" },
          ],
        },
        {
          title: "Ressources",
          items: [
            {
              label: "TypeScript Handbook",
              href: "https://www.typescriptlang.org/docs/handbook/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Type-Driven Kata`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["typescript", "bash"],
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
