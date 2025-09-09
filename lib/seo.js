import Head from "next/head";
import { site } from "../siteConfig";

/**
 * Usage: <Meta title="Custom" description="..." url={`${site.baseUrl}/path`} />
 * Falls back to site defaults if not provided.
 */
export function Meta({ title, description, url, image }) {
  const t = title
    ? `${title} | ${site.brand}`
    : `${site.brand} | Garage Floor Coatings in Virginia Beach`;
  const d =
    description ||
    "UV-stable, 1-day polyaspartic garage floor coatings in Virginia Beach and the 757. Diamond-ground prep, full-flake system, photo proof on every job.";
  const u = url || site.baseUrl;
  const ogImg = image || `${site.baseUrl}/hero.jpg`;

  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={u} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={u} />
      <meta property="og:image" content={ogImg} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={ogImg} />
    </Head>
  );
}
