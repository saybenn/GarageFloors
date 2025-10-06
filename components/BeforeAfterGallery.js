import BeforeAfterItem from "./BeforeAfterItem";

export default function BeforeAfterGallery({
  title = "Before & After Transformations",
  subhead,
  items = [],
  cta,
  background = "var(--color-light, #F5F6F8)",
}) {
  if (!items?.length) return null;

  return (
    <section
      aria-labelledby="before-after-heading"
      className="py-16 md:py-24"
      style={{ background }}
    >
      {/* match site width (1100px) so cards don’t look lost on wide screens */}
      <div className="mx-auto max-w-[1100px] px-4">
        <header className="mx-auto max-w-2xl text-center mb-10 md:mb-14">
          <h2
            id="before-after-heading"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            {title}
          </h2>
          {subhead && (
            <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">
              {subhead}
            </p>
          )}
        </header>

        {/* Two-up grid on desktop; generous gaps to breathe */}
        <div className="grid grid-cols-1  gap-6 lg:gap-8">
          {items.map((it) => (
            <BeforeAfterItem key={it.id} {...it} />
          ))}
        </div>

        {/* CTA strip */}
        {/* {cta && (cta.headline || cta.primary || cta.secondary) && (
          <div className="mt-12 md:mt-16 flex flex-col items-center text-center">
            {cta.headline && (
              <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                {cta.headline}
              </h3>
            )}
            <div className="mt-4 flex gap-4 flex-wrap justify-center">
              {cta.primary && (
                <a
                  href={cta.primary.href}
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-[var(--color-accent)] text-white font-semibold shadow hover:opacity-95"
                >
                  {cta.primary.label}
                </a>
              )}
              {cta.secondary && (
                <a
                  href={cta.secondary.href}
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50"
                >
                  {cta.secondary.label}
                </a>
              )}
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
}
