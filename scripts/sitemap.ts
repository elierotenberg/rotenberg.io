import { dirname, join } from "path";
import { promises } from "fs";
import { fileURLToPath } from "url";

import { config } from "dotenv";
import { globby } from "globby";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));

config({
  path: join(__dirname, `..`, `.env.production`),
});

export const sitemap = async (): Promise<void> => {
  const paths = await globby(`**/*.{html,pdf}`, {
    cwd: join(__dirname, `..`, `out`),
  });
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      <url>
      ${paths
        .map((path) => path.replace(/\.html/, ``))
        .map((path) => path.replace(/index$/, ``))
        .map(
          (path) => `
          <loc>${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL}/${path}</loc>
        `,
        )
        .join(``)}
      </url>
    </urlset>
  `;
  await promises.writeFile(join(__dirname, `..`, `out`, `sitemap.xml`), xml, {
    encoding: `utf8`,
  });
};

sitemap().catch((error) => {
  console.error(error);
  process.exit(1);
});
