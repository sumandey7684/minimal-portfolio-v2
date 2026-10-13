import fs from "fs";
import path from "path";
import {
  canonicalUrl,
  notFoundSeo,
  personAndWebsiteJsonLd,
  seoPages,
  sitemapXml,
  type SeoPage,
} from "../src/seo/pages";

const NAV = [
  ["/", "Home"],
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/experiments", "Experiments"],
  ["/contact", "Contact"],
  ["/writing", "Writing"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
] as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderBody(page: SeoPage) {
  const crumbs =
    page.crumbs && page.crumbs.length > 1
      ? `<nav aria-label="Breadcrumb"><ol>${page.crumbs
          .map((crumb, index) => {
            const label = escapeHtml(crumb.name);
            const last = index === page.crumbs!.length - 1;
            return `<li>${last ? label : `<a href="${crumb.path}">${label}</a>`}</li>`;
          })
          .join("")}</ol></nav>`
      : "";

  const blocks = page.blocks
    .map((block) => {
      const heading = block.heading ? `<h2>${escapeHtml(block.heading)}</h2>` : "";
      const paragraphs = (block.paragraphs ?? [])
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join("");
      const items = block.items?.length
        ? `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      return `${heading}${paragraphs}${items}`;
    })
    .join("");

  const links = NAV.map(
    ([href, label]) => `<a href="${href}">${label}</a>`,
  ).join("");

  return `<nav aria-label="Primary">${links}</nav>${crumbs}<main><h1>${escapeHtml(page.h1)}</h1>${blocks}</main>`;
}

function upsertTitle(html: string, title: string) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

function upsertMeta(html: string, key: string, attribute: "name" | "property", content: string) {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`,
    "i",
  );
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertCanonical(html: string, href: string | null) {
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  if (!href) return html.replace(pattern, "");
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertJsonLd(html: string, data: unknown) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  const tag = `<script id="seo-jsonld" type="application/ld+json">${json}</script>`;
  const pattern = /<script id="seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

export function renderSeoDocument(template: string, page: SeoPage, includeCanonical: boolean) {
  let html = template;
  html = upsertTitle(html, page.title);
  html = upsertMeta(html, "description", "name", page.description);
  html = upsertMeta(html, "robots", "name", page.robots);
  html = upsertMeta(html, "og:title", "property", page.title);
  html = upsertMeta(html, "og:description", "property", page.description);
  const pageUrl = page.path === "/404" ? canonicalUrl("/") : canonicalUrl(page.path);
  html = upsertMeta(html, "og:url", "property", pageUrl);
  html = upsertMeta(html, "twitter:title", "name", page.title);
  html = upsertMeta(html, "twitter:description", "name", page.description);
  html = upsertCanonical(html, includeCanonical ? canonicalUrl(page.path) : null);
  html = upsertJsonLd(html, personAndWebsiteJsonLd(page));

  const block = `<div id="prerender">${renderBody(page)}</div><script>document.getElementById("prerender")?.remove()</script>`;
  if (!html.includes('id="prerender"')) {
    html = html.replace('<div id="root"></div>', `<div id="root"></div>${block}`);
  }
  return html;
}

export function writePrerenderedHtml(distDir: string) {
  const templatePath = path.join(distDir, "index.html");
  const template = fs.readFileSync(templatePath, "utf8");

  for (const page of seoPages) {
    const html = renderSeoDocument(template, page, true);
    if (page.path === "/") {
      fs.writeFileSync(templatePath, html);
      continue;
    }
    const directory = path.join(distDir, page.path.slice(1));
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), html);
  }

  fs.writeFileSync(
    path.join(distDir, "404.html"),
    renderSeoDocument(template, notFoundSeo, false),
  );
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml());
  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    "User-agent: *\nAllow: /\nSitemap: https://www.sumandey.tech/sitemap.xml\n",
  );
}
