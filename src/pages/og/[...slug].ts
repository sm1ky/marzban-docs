import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("docs");

const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = OGImageRoute({
  pages,

  param: "slug",

  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      description: page.data.description,
      bgGradient: [[255, 255, 255]],
      border: { color: [56, 111, 228], width: 20, side: "inline-start" },
      padding: 60,
      font: {
        title: {
          size: 78,
          color: [56, 111, 228],
          families: ["Work Sans", "Noto Sans Black"],
          weight: "ExtraBold",
        },
        description: {
          color: [0, 0, 0],
          size: 45,
          lineHeight: 1.25,
          families: ["Work Sans", "Noto Sans"],
          weight: "Normal",
        },
      },
      fonts: [
        "https://api.fontsource.org/v1/fonts/work-sans/latin-400-normal.ttf",
        "https://api.fontsource.org/v1/fonts/work-sans/latin-800-normal.ttf",

        "https://api.fontsource.org/v1/fonts/noto-sans/cyrillic-400-normal.ttf",
        "https://api.fontsource.org/v1/fonts/noto-sans/cyrillic-900-normal.ttf",
      ],
    };
  },
});
