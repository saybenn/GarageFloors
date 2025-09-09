// components/SchemaInjector.jsx
// Tiny, safe JSON-LD injector for Next.js (Page or App Router).
// - Accepts a single object or an array of objects.
// - If given an array, outputs a single script with @graph.
// - Dedupes @context when using @graph.
// - Uses a stable key and deterministic JSON so React won't re-insert on re-renders.

import React from "react";

/** Remove undefined / functions that would break JSON.stringify */
function safeJsonLd(obj) {
  return JSON.stringify(obj, (_key, value) => {
    if (typeof value === "undefined") return undefined;
    if (typeof value === "function") return undefined;
    return value;
  });
}

/** Normalize: ensure @context at root level for graphs, or on the single node */
function toScriptPayload(data) {
  const isArray = Array.isArray(data);

  if (!isArray) {
    // Single node: ensure @context set
    const node = { "@context": "https://schema.org", ...data };
    // If node already had @context, the spread above keeps node's value
    return node;
  }

  // Array: make a single @graph with root @context
  const graph = data.map((n) => {
    // Strip nested @context to avoid duplicate contexts inside @graph
    const { ["@context"]: _ctx, ...rest } = n || {};
    return rest;
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Props:
 * - data: object | object[]  (required)
 * - id: string (optional)    a stable id for the <script> tag; helps dedupe
 *
 * Usage:
 *   <SchemaInjector data={serviceSchema({ url })} id="service-schema" />
 *   <SchemaInjector data={[localBusinessSchema({ url }), faqSchema(items)]} id="all-schema" />
 */
export default function SchemaInjector({ data, id = "json-ld" }) {
  if (!data) return null;

  const payload = toScriptPayload(data);
  const json = safeJsonLd(payload);

  // Use a deterministic key derived from id + byte length to reduce re-inserts
  const key = `${id}-${json.length}`;

  // Plain <script> is fine in body or head; Google supports both.
  // If you prefer, you can wrap with next/head in Page Router where you render this.
  return (
    <script
      key={key}
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
