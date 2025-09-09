import Image from "next/image";
import Link from "next/link";
import { site } from "../siteConfig";

/**
 * Config-driven Process Timeline with icons
 * - Optional step images (next/image)
 * - Numbered badge stays; icon appears beside step title
 */
export default function ProcessTimeline({ process = site.process }) {
  if (!process) return null;
  const { title, subhead, steps = [], cta, background = "#F5F6F8" } = process;

  return (
    <section id="process" style={{ background }}>
      <div className="mx-auto max-w-[1100px] px-4 py-14 md:py-20">
        {/* Title + subhead */}
        <div className="text-center max-w-[75ch] mx-auto">
          {title && (
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {title}
            </h2>
          )}
          {subhead && <p className="mt-3 text-slate-700">{subhead}</p>}
        </div>

        {/* Timeline */}
        <div className="mt-10 md:mt-12 relative">
          {/* Desktop connector line */}
          <div className="hidden md:block absolute left-0 right-0 top-[52px] h-[2px] bg-slate-300"></div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-6">
            {steps.map((s, idx) => (
              <StepCard
                key={`${s.title || "step"}-${idx}`}
                index={idx + 1}
                title={s.title}
                body={s.body}
                img={s.img}
                iconKey={s.icon}
              />
            ))}
          </div>
        </div>

        {/* CTA strip */}
        {cta && (
          <div className="mt-12 md:mt-16 rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-lg md:text-xl font-semibold text-slate-900">
                {cta.headline || "Ready to Transform Your Garage?"}
              </div>
              {cta.body && <div className="text-slate-600">{cta.body}</div>}
            </div>
            <div className="flex gap-3">
              {cta.primary && (
                <a
                  href={cta.primary.href}
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--color-accent)] text-white font-semibold transition-300 hover:opacity-95"
                >
                  {cta.primary.label}
                </a>
              )}
              {cta.secondary && (
                <Link
                  href={cta.secondary.href}
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-slate-300 text-slate-800 font-semibold transition-300 hover:bg-slate-50"
                >
                  {cta.secondary.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StepCard({ index, title, body, img, iconKey }) {
  const resolvedIcon = iconKey || inferIconKey(title);

  return (
    <div className="relative">
      {/* Mobile vertical connector */}
      <div className="md:hidden absolute left-[20px] top-[28px] bottom-0 w-[2px] bg-slate-300/80"></div>

      <div className="flex md:block gap-4">
        {/* Numbered badge */}
        <div className="shrink-0 relative z-10">
          <div className="h-10 w-10 rounded-full bg-white ring-1 ring-slate-300 shadow-sm grid place-items-center font-bold text-slate-900">
            {index}
          </div>
        </div>

        <div className="flex-1">
          {/* Optional image */}
          {img?.src && (
            <div className="mt-0 md:mt-6 mb-3 md:mb-4 overflow-hidden rounded-lg bg-white ring-1 ring-black/5"></div>
          )}

          {/* Title + icon + body */}
          <div className="md:mt-2">
            {title && (
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <span>{title}</span>
                <span className="text-slate-600" aria-hidden="true">
                  <StepIcon name={resolvedIcon} className="h-16 w-16" />
                </span>
              </div>
            )}
            {body && <p className="text-slate-600 text-sm">{body}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Icon system ---------- */

function inferIconKey(title = "") {
  const t = title.toLowerCase();
  if (t.includes("grind")) return "grind";
  if (t.includes("repair")) return "repair";
  if (t.includes("base")) return "base";
  if (t.includes("flake")) return "flake";
  if (t.includes("scrape")) return "scrape";
  if (t.includes("topcoat") || t.includes("top coat")) return "topcoat";
  return "default";
}

function StepIcon({ name = "default", className = "" }) {
  switch (name) {
    case "grind":
      return <GrinderIcon className={className} />;
    case "repair":
      return <TrowelIcon className={className} />;
    case "base":
      return <RollerIcon className={className} />;
    case "flake":
      return <FlakeIcon className={className} />;
    case "scrape":
      return <ScraperIcon className={className} />;
    case "topcoat":
      return <ShieldSunIcon className={className} />;
    default:
      return <DotIcon className={className} />;
  }
}

function GrinderIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="8" cy="12" r="3" className="fill-current opacity-20" />
      <rect
        x="11"
        y="10"
        width="9"
        height="4"
        rx="1.5"
        className="fill-current"
      />
      <rect x="14" y="8" width="2" height="2" className="fill-current" />
    </svg>
  );
}

function TrowelIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M4 15l8-8 3 3-8 8H4z" className="fill-current" />
      <rect
        x="14"
        y="5"
        width="6"
        height="2"
        rx="1"
        className="fill-current opacity-30"
      />
    </svg>
  );
}

function RollerIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="4" y="5" width="10" height="4" rx="2" className="fill-current" />
      <rect x="9" y="9" width="2" height="6" className="fill-current" />
      <rect
        x="9"
        y="15"
        width="8"
        height="2"
        rx="1"
        className="fill-current opacity-30"
      />
    </svg>
  );
}

function FlakeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="8" cy="8" r="1.5" className="fill-current" />
      <circle cx="14" cy="6" r="1" className="fill-current opacity-70" />
      <circle cx="16" cy="12" r="1.25" className="fill-current opacity-60" />
      <circle cx="10" cy="14" r="1" className="fill-current opacity-50" />
      <circle cx="18" cy="9" r="0.9" className="fill-current opacity-40" />
    </svg>
  );
}

function ScraperIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect
        x="5"
        y="6"
        width="14"
        height="3"
        rx="1.5"
        className="fill-current"
      />
      <path d="M7 9v6a3 3 0 006 0V9" className="fill-current opacity-30" />
    </svg>
  );
}

function ShieldSunIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 3l6 3v4c0 4.4-2.7 8.4-6 9.8C8.7 18.4 6 14.4 6 10V6l6-3z"
        className="fill-current opacity-80"
      />
      <circle cx="12" cy="10" r="2.5" className="fill-current opacity-50" />
    </svg>
  );
}

function DotIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="2" className="fill-current" />
    </svg>
  );
}
