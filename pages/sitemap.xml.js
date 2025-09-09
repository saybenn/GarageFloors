// pages/sitemap.xml.js
import { site } from "../siteConfig";

export async function getServerSideProps({ res }) {
  const baseUrl = site.baseUrl.replace(/\/$/, ""); // strip trailing slash

  // Core static routes
  const routes = [
    { loc: "/", priority: 1.0 },
    { loc: "/about", priority: 0.6 },
    { loc: "/contact", priority: 0.6 },
    { loc: "/services/garage-floor-coatings", priority: 0.9 },
    { loc: "/thanks", priority: 0.2 },
  ];

  // Optional: map areaServed or other services dynamically
  // Example: loop services if you add more later
  if (site.services?.items) {
    for (const slug of Object.keys(site.services.items)) {
      routes.push({ loc: `/services/${slug}`, priority: 0.9 });
    }
  }

  const urls = routes
    .map(
      (r) => `
  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  // getServerSideProps handles response
  return null;
}
