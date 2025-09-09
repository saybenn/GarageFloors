"use client";

import Link from "next/link";
import Accordion from "./Accordion";
import IconShield from "./icons/IconShield";
import IconSun from "./icons/IconSun";
import IconClock from "./icons/IconClock";
import IconTire from "./icons/IconTire";

const ICONS = {
  shield: IconShield,
  sun: IconSun,
  clock: IconClock,
  tire: IconTire,
};

function IconBubble({ name }) {
  const Cmp = ICONS[name] || IconShield;
  return (
    <span className="h-9 w-9 rounded-full bg-slate-100 grid place-items-center text-slate-700">
      <Cmp className="h-5 w-5" />
    </span>
  );
}

/**
 * Props:
 * - data: site.warrantySection (object) OR undefined
 * - fallbackText: site.warranty (string) for minimal fallback
 * - id: optional string to anchor/link the section
 */
export default function Warranty({ data, fallbackText, id = "warranty" }) {
  const hasConfig = !!data;
  const variant = data?.variant || "default";
  const bg = data?.background || "var(--color-light)";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      style={{ background: bg }}
      className="py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1100px] px-4">
        {/* Header */}
        <header>
          <h2
            id={`${id}-title`}
            className="text-2xl md:text-3xl font-extrabold text-slate-900"
          >
            {hasConfig ? data.title : "Warranty"}
          </h2>
          {hasConfig && data.subhead ? (
            <p className="mt-3 text-slate-700">{data.subhead}</p>
          ) : null}
        </header>

        {/* Minimal fallback */}
        {!hasConfig && (
          <div className="mt-6 rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] p-6">
            <p className="text-slate-700">{fallbackText}</p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg px-5 py-3 font-semibold border border-slate-300 text-slate-800 hover:bg-slate-50"
              >
                Ask About Coverage
              </Link>
            </div>
          </div>
        )}

        {/* Compact variant */}
        {hasConfig && variant === "compact" && (
          <div className="mt-6 rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-3 py-1 text-sm">
                  {data.coverage?.term || "—"}
                </span>
                <span className="text-sm text-slate-600">Warranty Term</span>
              </div>
              <p className="mt-2 text-slate-700 text-sm">
                {data.notes || "Coverage details available in your agreement."}
              </p>
            </div>
            <div className="flex gap-3">
              {data.ctas?.primary?.href && (
                <Link
                  href={data.ctas.primary.href}
                  className="bg-[var(--color-accent)] text-white rounded-lg px-5 py-3 font-semibold hover:opacity-95"
                >
                  {data.ctas.primary.label || "Get My Free Quote"}
                </Link>
              )}
              {data.ctas?.secondary?.href && (
                <Link
                  href={data.ctas.secondary.href}
                  className="border border-slate-300 text-slate-800 rounded-lg px-5 py-3 font-semibold hover:bg-slate-50"
                >
                  {data.ctas.secondary.label || "Ask About Coverage"}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Default/full variant */}
        {hasConfig && variant === "default" && (
          <>
            {/* Highlights */}
            {Array.isArray(data.highlights) && data.highlights.length > 0 && (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {data.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <IconBubble name={h.icon} />
                      <div>
                        <h3 className="mt-0 font-semibold text-slate-900">
                          {h.title}
                        </h3>
                        <p className="text-slate-600 text-sm">{h.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coverage + Exclusions */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {/* Left: term + scope */}
              <div className="md:col-span-2">
                <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-3 py-1 text-sm">
                  {data.coverage?.term || "—"}
                </span>
                {Array.isArray(data.coverage?.scope) &&
                  data.coverage.scope.length > 0 && (
                    <ul className="mt-3 space-y-1 text-slate-700 text-sm list-disc pl-5">
                      {data.coverage.scope.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                {/* Exclusions (accordion or visible list) */}
                {Array.isArray(data.exclusions) &&
                data.exclusions.length > 0 ? (
                  <div className="mt-6">
                    <h4 className="font-semibold text-slate-900">Exclusions</h4>
                    {/* Toggle: choose Accordion or inline by length */}
                    {data.exclusions.length > 3 ? (
                      <Accordion title="View exclusions">
                        <ul className="list-disc pl-5">
                          {data.exclusions.map((ex, i) => (
                            <li key={i}>{ex}</li>
                          ))}
                        </ul>
                      </Accordion>
                    ) : (
                      <ul className="mt-2 space-y-1 text-slate-600 text-sm list-disc pl-5">
                        {data.exclusions.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="mt-6">
                    <Link
                      href={data.assets?.pdfUrl || "/contact"}
                      className="underline text-slate-800"
                    >
                      See full terms
                    </Link>
                  </div>
                )}
              </div>

              {/* Right: pdf + notes */}
              <aside>
                {data.assets?.pdfUrl && (
                  <Link
                    href={data.assets.pdfUrl}
                    className="mt-3 inline-flex items-center text-slate-800 underline"
                  >
                    {/* simple doc glyph */}
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                    {data.assets?.pdfMeta?.label || "Download Full Warranty"}
                    {data.assets?.pdfMeta?.fileType ||
                    data.assets?.pdfMeta?.pages ? (
                      <span className="ml-1 text-slate-500">
                        (
                        {[
                          data.assets.pdfMeta?.fileType,
                          data.assets.pdfMeta?.pages &&
                            `${data.assets.pdfMeta.pages} pages`,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                        )
                      </span>
                    ) : null}
                  </Link>
                )}
                {data.notes && (
                  <p className="mt-3 text-xs text-slate-500">{data.notes}</p>
                )}
              </aside>
            </div>

            {/* CTA strip */}
            {(data?.ctas?.primary?.href || data?.ctas?.secondary?.href) && (
              <div className="mt-10 rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl font-semibold text-slate-900">
                    Ready to move forward?
                  </p>
                  <p className="text-slate-600 text-sm">
                    We’ll confirm coverage during your on-site estimate.
                  </p>
                </div>
                <div className="flex gap-3">
                  {data.ctas?.primary?.href && (
                    <Link
                      href={data.ctas.primary.href}
                      className="bg-[var(--color-accent)] text-white rounded-lg px-5 py-3 font-semibold hover:opacity-95"
                    >
                      {data.ctas.primary.label || "Get My Free Quote"}
                    </Link>
                  )}
                  {data.ctas?.secondary?.href && (
                    <Link
                      href={data.ctas.secondary.href}
                      className="border border-slate-300 text-slate-800 rounded-lg px-5 py-3 font-semibold hover:bg-slate-50"
                    >
                      {data.ctas.secondary.label || "Ask About Coverage"}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
