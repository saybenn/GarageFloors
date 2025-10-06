// components/ServicesStack.jsx
import Image from "next/image";
import Link from "next/link";
import { site } from "../siteConfig";

/**
 * ServicesStack
 * - Renders all services (stacked, alternating background & layout)
 * - Adds one unified CTA block at the end instead of per-service buttons
 */
export default function ServicesStack() {
  const items = site?.services?.items || {};
  const order = site?.services?.order?.length
    ? site.services.order.filter((slug) => items[slug])
    : Object.keys(items);

  if (!order.length) return null;
  const primaryCity = site.areaServed?.[0] || "Virginia Beach";

  return (
    <div aria-labelledby="services-heading">
      <h2
        id="services-heading"
        className="flex justify-center mx-auto text-xl md:text-3xl font-extrabold text-slate-900 bg-[var(--color-light)]"
      >
        Our Services
      </h2>{" "}
      {order.map((slug, idx) => {
        const svc = items[slug];
        if (!svc) return null;

        const isDark = idx % 2 === 1;
        const sectionBg = isDark
          ? "bg-[var(--color-primary)]"
          : "bg-[var(--color-light,#F5F6F8)]";
        const headingClass = isDark ? "text-white" : "text-slate-900";
        const bodyText = isDark ? "text-slate-200" : "text-slate-700";
        const bulletText = isDark ? "text-slate-200/90" : "text-slate-600";
        const microStripBg = isDark
          ? "bg-white/10 ring-white/15 text-slate-100"
          : "bg-white ring-slate-200/60 text-slate-700";
        const microStripText = isDark ? "text-slate-200/90" : "text-slate-600";
        const badgeBox = isDark
          ? "bg-white/10 ring-white/15 text-white/80"
          : "bg-gray-500/10 ring-slate-200/60 text-slate-600";
        const mediaFirst = idx % 2 === 0;

        const badges = (svc.badges || []).map((b) =>
          b.replace("{PRIMARY_CITY}", primaryCity)
        );

        return (
          <section
            key={slug}
            id={`service-${slug}`}
            className={`${sectionBg} relative`}
          >
            {idx > 0 && (
              <div
                className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-40"
                aria-hidden
              />
            )}

            <div className="mx-auto max-w-[1100px] px-4 py-14 md:py-20 grid items-center gap-10 md:grid-cols-2">
              {/* Media */}
              <div className={`${mediaFirst ? "order-1" : "order-2"} relative`}>
                {svc.image?.src && (
                  <div
                    className={`rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,.25)] ${
                      isDark ? "ring-1 ring-white/10" : "ring-1 ring-black/5"
                    }`}
                  >
                    <Image
                      src={svc.image.src}
                      alt={svc.image.alt || svc.title}
                      width={svc.image.width || 880}
                      height={svc.image.height || 560}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}

                {badges.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                    {badges.map((b) => (
                      <div
                        key={b}
                        className={`rounded-md px-3 py-2 ring-1 ${badgeBox}`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Copy */}
              <div className={`${mediaFirst ? "order-2" : "order-1"}`}>
                <h3
                  className={`${headingClass} text-2xl md:text-3xl font-extrabold`}
                >
                  {svc.title}
                </h3>

                {svc.intro && <p className={`mt-3 ${bodyText}`}>{svc.intro}</p>}

                {Array.isArray(svc.bullets) && svc.bullets.length > 0 && (
                  <ul className={`mt-5 ${bulletText} space-y-2 text-[15px]`}>
                    {svc.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                )}

                {/* Warranty micro-strip */}
                <div className={`mt-6 rounded-lg ring-1 p-4 ${microStripBg}`}>
                  <div className="font-semibold">Our Warranty</div>
                  <div className={`${microStripText} text-[14px]`}>
                    {site.warranty ||
                      "5-year adhesion & yellowing coverage (residential). Exclusions apply."}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-40"
              aria-hidden
            />
          </section>
        );
      })}
      {/* Unified CTA Section */}
      <section className="bg-[var(--color-primary)] text-white text-center py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h3 className="text-2xl md:text-3xl font-bold">
            Ready to Transform Your Floor?
          </h3>
          <p className="mt-3 text-slate-200">
            Get a free, no-obligation quote and discover how durable and
            beautiful your garage can be.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 bg-[var(--color-accent)] text-white font-semibold hover:opacity-95 transition"
            >
              Get a Free Quote
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
