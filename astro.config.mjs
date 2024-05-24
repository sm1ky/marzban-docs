import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";

export default defineConfig({
  site: "https://marzban-docs.sm1ky.com",
  //  image: {
  //     service: passthroughImageService()
  //  },
  integrations: [
    starlight({
      title: "Marzban",
      plugins: [
        starlightOpenAPI([
          {
            base: "api",
            label: "API",
            schema: "./src/api/openapi.json",
          },
        ]),
      ],
      editLink: {
        baseUrl: "https://github.com/sm1ky/marzban-docs/edit/master",
      },
      components: {
        Sidebar: "./src/components/Sidebar.astro",
        Head: "./src/components/Head.astro",
      },
      favicon: "/public/favicon.ico",
      customCss: ["./src/styles/headings.css"],
      defaultLocale: "root",

      locales: {
        root: {
          label: "Русский",
          lang: "ru",
        },
      },
      logo: {
        light: "/src/assets/logo-light.svg",
        dark: "/src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/Gozargah/Marzban",
        telegram: "https://t.me/gozargah_marzban",
      },
      pagefind: true,
      sidebar: [
        {
          label: "Первые шаги",
          autogenerate: { directory: "start" },
        },
        {
          label: "Интерфейс",
          autogenerate: { directory: "ui" },
        },
        {
          label: "Расширенная настройка",
          autogenerate: { directory: "advanced" },
        },
        {
          label: "Компоненты",
          items: [
            ...openAPISidebarGroups,
            { label: "Узлы", link: "components/marzban_node/" },
            { label: "Подписки", link: "components/subscriptions/" },
            { label: "Telegram бот", link: "components/telegram_bot/" },
            { label: "CLI", link: "components/cli/" },
            { label: "WebHook", link: "components/webhook/" },
          ],
        },
        {
          label: "Руководства",
          autogenerate: { directory: "tutorials" },
        },
      ],
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeExternalLinks,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" },
        },
      ],
    ],
  },
});
