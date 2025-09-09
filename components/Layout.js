import React from "react";
import { Meta } from "../lib/seo";
import { site } from "../siteConfig";
import Navbar from "./Navbar";
import Footer from "./Footer";
// If you already created a dedicated Footer component, import it and
// replace the inline footer below.
// import Footer from "./Footer";

import dynamic from "next/dynamic";
// Make SchemaInjector optional: if you haven't added it yet, this won't break.
const SchemaInjector = dynamic(
  () => import("./SchemaInjector").catch(() => () => null),
  {
    ssr: true,
  }
);

/**
 * Layout
 * - Provides <Meta> SEO tags
 * - Optionally injects JSON-LD schema (single object or array)
 * - Renders global Navbar + simple footer
 * - Includes a11y "Skip to content" link
 *
 * Props:
 *  - title?: string
 *  - description?: string
 *  - url?: string
 *  - image?: string
 *  - schema?: object | object[]  (JSON-LD payload(s))
 *  - children: ReactNode
 */
export default function Layout({
  title,
  description,
  url,
  image,
  schema,
  children,
}) {
  // Normalize schema: accept single object or array
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <>
      <Meta
        title={title}
        description={description}
        url={url || site.baseUrl}
        image={image}
      />

      {/* Optional JSON-LD(s) */}
      {schemas.map((data, i) => (
        <SchemaInjector key={i} data={data} />
      ))}

      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">{children}</main>

      <Footer />
    </>
  );
}
