"use client";
import Image from "next/image";
import CompareSlider from "./CompareSlider";

/**
 * BeforeAfterItem – single before/after pair.
 * Desktop: slider with visible divider/knob and BEFORE/AFTER chips.
 * Mobile: stacked images with chips on each.
 */
export default function BeforeAfterItem(props) {
  const {
    id,
    title,
    caption,
    location,
    date,
    orientation = "landscape",
    before,
    after,
    slider = true,
    stackedOnMobile = true,
  } = props;

  const aspect = orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]";

  return (
    <figure className="group rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] overflow-hidden transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(12,35,64,.25)]">
      {/* Desktop slider */}
      {slider && (
        <div className={`relative hidden md:block ${aspect}`}>
          {/* BEFORE base */}
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(max-width: 1100px) 50vw, 560px"
            className="object-cover"
            placeholder={before.blur ? "blur" : undefined}
            blurDataURL={before.blur}
            priority={false}
          />

          {/* Accessible slider control renders pos (0–100) */}
          <CompareSlider ariaLabel={`Comparison slider for ${title}`}>
            {(pos) => (
              <div className="absolute inset-0">
                {/* AFTER clip */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${pos}%` }}
                >
                  <Image
                    src={after.src}
                    alt={after.alt}
                    fill
                    sizes="(max-width: 1100px) 50vw, 560px"
                    className="object-cover"
                    placeholder={after.blur ? "blur" : undefined}
                    blurDataURL={after.blur}
                  />
                </div>

                {/* Visual divider + knob (decoration; CompareSlider still handles input) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0"
                  style={{ left: `calc(${pos}% - 1px)` }}
                >
                  <div className="h-full w-[2px] bg-white/85 shadow-[0_0_0_1px_rgba(0,0,0,.06)]" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-white text-slate-800 grid place-items-center shadow-lg ring-1 ring-black/10">
                      <span className="text-base leading-none">↔</span>
                    </div>
                  </div>
                </div>

                {/* BEFORE / AFTER chips */}
                <span className="absolute left-3 top-3 z-10 rounded-full bg-black/55 text-white text-[11px] font-medium px-2 py-0.5">
                  BEFORE
                </span>
                <span className="absolute right-3 top-3 z-10 rounded-full bg-black/55 text-white text-[11px] font-medium px-2 py-0.5">
                  AFTER
                </span>
              </div>
            )}
          </CompareSlider>
        </div>
      )}

      {/* Mobile stacked */}
      {stackedOnMobile && (
        <div className="block md:hidden">
          <div className={`${aspect} relative`}>
            <Image
              src={before.src}
              alt={before.alt}
              fill
              sizes="100vw"
              className="object-cover"
              placeholder={before.blur ? "blur" : undefined}
              blurDataURL={before.blur}
            />
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black/55 text-white text-[11px] font-medium px-2 py-0.5">
              BEFORE
            </span>
          </div>
          <div className={`relative ${aspect} mt-2`}>
            <Image
              src={after.src}
              alt={after.alt}
              fill
              sizes="100vw"
              className="object-cover"
              placeholder={after.blur ? "blur" : undefined}
              blurDataURL={after.blur}
            />
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black/55 text-white text-[11px] font-medium px-2 py-0.5">
              AFTER
            </span>
          </div>
        </div>
      )}

      {/* Caption */}
      <figcaption className="p-4">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        {caption && (
          <div className="text-sm text-slate-600 mt-0.5">{caption}</div>
        )}
        {(location || date) && (
          <div className="text-xs text-slate-500 mt-1">
            {[location, date].filter(Boolean).join(" • ")}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
