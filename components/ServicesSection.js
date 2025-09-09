import Image from "next/image";
import Link from "next/link";
import { site } from "../siteConfig";

export default function ServicesSection({ slug }) {
  const primaryKey =
    slug ||
    site.services?.primarySlug ||
    Object.keys(site.services?.items || {})[0];
  const svc = site.services?.items?.[primaryKey];

  if (!svc) return null;

  // Replace token with first city for convenience
  const primaryCity = site.areaServed?.[0] || "Virginia Beach";
  const badges = (svc.badges || []).map((b) =>
    b.replace("{PRIMARY_CITY}", primaryCity)
  );

  return (
    <section className="bg-[var(--color-primary)]">
      <div className="mx-auto max-w-[1100px] px-4 py-14 md:py-20 grid items-center gap-10 md:grid-cols-2">
        {/* Copy */}
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold">
            {svc.title}
          </h2>
          {svc.intro && <p className="mt-3 text-slate-200">{svc.intro}</p>}

          {Array.isArray(svc.bullets) && svc.bullets.length > 0 && (
            <ul className="mt-5 text-slate-200/90 space-y-2 text-[15px]">
              {svc.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          )}

          {/* Warranty micro-strip */}
          <div className="mt-6 rounded-lg bg-white/10 ring-1 ring-white/15 p-4 text-slate-100">
            <div className="font-semibold">Our Warranty</div>
            <div className="text-slate-200/90 text-[14px]">
              {site.warranty ||
                "5-year adhesion & yellowing coverage (residential). Exclusions apply."}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {svc.ctas?.primary && (
              <a
                href={svc.ctas.primary.href}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--color-accent)] text-white font-semibold transition-300 hover:opacity-95"
              >
                {svc.ctas.primary.label}
              </a>
            )}
            {svc.ctas?.secondary && (
              <Link
                href={svc.ctas.secondary.href}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/30 text-white transition-300 hover:bg-white/10"
              >
                {svc.ctas.secondary.label}
              </Link>
            )}
          </div>
        </div>

        {/* Media */}
        <div className="relative">
          {svc.image?.src && (
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_15px_40px_-10px_rgba(0,0,0,.5)]">
              <Image
                src={svc.image.src}
                alt={svc.image.alt || svc.title}
                width={svc.image.width || 880}
                height={svc.image.height || 560}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
          )}

          {badges.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] text-white/80">
              {badges.map((b) => (
                <div
                  key={b}
                  className="rounded-md bg-white/10 ring-1 ring-white/15 px-3 py-2"
                >
                  {b}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
