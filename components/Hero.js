import Link from "next/link";
import { site } from "../siteConfig";
import HeroMedia from "./HeroMedia";

export default function Hero({
  mediaType = "image",
  mediaSrc = "/images/hero.webp",
  mediaPoster = "/images/hero.webp",
  mediaAlt = "Garage floor during grinding",
  align = "center",
}) {
  return (
    <section className="py-8 md:py-14 relative  overflow-hidden">
      <HeroMedia
        backgroundtype={mediaType}
        src={mediaSrc}
        poster={mediaPoster}
        alt={mediaAlt}
      />
      {/* CONTENT CONTAINER */}
      <div className="relative z-10  h-full mx-auto max-w-[1100px] px-4">
        <div className="rounded-2xl bg-[var(--color-primary)]/90 shadow-[0_15px_40px_-10px_rgba(0,0,0,.5)] px-5 md:px-10 py-8 md:py-12">
          {/* Headline */}
          <div className="text-center">
            <h1 className="text-white font-extrabold text-3xl md:text-[34px] leading-tight">
              {site.hero?.h1}
            </h1>
            {site.hero?.sub && (
              <p className="mt-3 md:mt-4 text-slate-200 md:text-[15px] max-w-[70ch] mx-auto">
                {site.hero.sub}
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-5 md:mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--color-accent)] text-white font-semibold"
            >
              Get My Free Quote
            </Link>
            <Link
              href="/#process"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/25 text-white transition-all-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[var(--color-light)] hover:text-[var(--color-primary)] font-semibold"
            >
              See Our Process
            </Link>
          </div>

          {/* Value cards */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ValueCard
              title="Done in a Day"
              text="Walk on your new floor in ~12 hours."
            />
            <ValueCard
              title="UV-Stable Finish"
              text="Resists yellowing over time."
            />
            <ValueCard
              title="Humidity & Salt Ready"
              text="Built for Virginia’s coastal climate."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ title, text }) {
  return (
    <div className="rounded-xl bg-white ring-1 ring-black/10 shadow-[0_10px_25px_-12px_rgba(0,0,0,.35)] p-4">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="text-[13.5px] text-slate-600">{text}</div>
    </div>
  );
}
