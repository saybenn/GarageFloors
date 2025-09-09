// components/FAQ.jsx
"use client";
import { useId, useState, useMemo, useRef, useEffect } from "react";
import Head from "next/head";
import { site } from "../siteConfig";

/**
 * FAQ – Config-driven accordion with a11y + JSON-LD schema injection.
 *
 * Props (all optional):
 *  - title, subhead, items (defaults to site.faq)
 *  - singleOpen (bool) ensure only one panel open at a time (default: true)
 *  - background (css color) section background (default var(--color-light))
 *  - injectSchema (bool) emit FAQPage JSON-LD (default: true)
 */
export default function FAQ({
  title = site?.faq?.title || "Frequently Asked Questions",
  subhead = site?.faq?.subhead || "",
  items = site?.faq?.items || [],
  singleOpen = true,
  background = "var(--color-light, #F5F6F8)",
  injectSchema = true,
}) {
  const baseId = useId();

  const [openIndex, setOpenIndex] = useState(-1); // for singleOpen mode
  const [openSet, setOpenSet] = useState(() => new Set()); // for multi-open if singleOpen=false

  if (!Array.isArray(items) || items.length === 0) return null;

  const schemaJson = useMemo(() => {
    if (!injectSchema) return null;
    const mainEntity = items.slice(0, 6).map((it) => ({
      "@type": "Question",
      name: String(it.q || "").trim(),
      acceptedAnswer: { "@type": "Answer", text: String(it.a || "").trim() },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
    };
  }, [items, injectSchema]);

  const isOpen = (i) => (singleOpen ? openIndex === i : openSet.has(i));

  const toggle = (i) => {
    if (singleOpen) setOpenIndex((prev) => (prev === i ? -1 : i));
    else
      setOpenSet((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
  };

  return (
    <section className="py-14 md:py-20" style={{ background }}>
      {/* FAQPage JSON-LD */}
      {injectSchema && schemaJson && (
        <Head>
          <script
            type="application/ld+json"
            // Using stringify ensures proper escaping
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
          />
        </Head>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {title}
          </h2>
          {subhead && <p className="mt-3 text-slate-700">{subhead}</p>}
        </header>

        <dl className="mt-8 max-w-3xl mx-auto divide-y divide-slate-200">
          {items.slice(0, 6).map((item, i) => (
            <FAQItem
              key={`${baseId}-${i}`}
              idx={i}
              baseId={baseId}
              q={item.q}
              a={item.a}
              open={isOpen(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

function FAQItem({ idx, baseId, q, a, open, onToggle }) {
  const panelId = `${baseId}-panel-${idx}`;
  const btnId = `${baseId}-button-${idx}`;
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) setMaxH(el.scrollHeight);
    else setMaxH(0);
  }, [open, q, a]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="py-2">
      <dt>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKeyDown}
          className="w-full text-left flex justify-between items-center py-4 font-medium text-slate-900 hover:text-[var(--color-accent,theme(colors.blue.700))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent,theme(colors.blue.300))]/40"
        >
          <span>{q}</span>
          <Chevron open={open} />
        </button>
      </dt>
      <dd>
        <div
          id={panelId}
          role="region"
          aria-labelledby={btnId}
          hidden={!open}
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? maxH : 0, opacity: open ? 1 : 0.8 }}
        >
          <div ref={contentRef} className="pb-4">
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">{a}</p>
          </div>
        </div>
      </dd>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
        open ? "rotate-90" : "rotate-0"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M6.293 7.293a1 1 0 011.414 0L12 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Example usage (Page Router):
// import FAQ from "../components/FAQ";
// <FAQ />

// Optional: If you want a dedicated page with extended items, pass items explicitly:
// <FAQ title="All FAQs" subhead="Everything you want to know" items={site.faq.items} singleOpen={false} />
