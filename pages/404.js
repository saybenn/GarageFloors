import Link from "next/link";
import { site } from "../siteConfig";
import { Meta } from "../lib/seo";

export default function NotFound() {
  const url = `${site.baseUrl}/404`;
  return (
    <>
      <Meta
        title="Page not found"
        description={`${site.brand} — Page not found`}
        url={url}
        noindex
      />
      <main className="min-h-[70vh] grid place-items-center bg-[var(--color-light)]">
        <section className="mx-auto max-w-[700px] px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-white ring-1 ring-black/5 px-4 py-2 text-sm font-semibold text-slate-700">
            404 — Not Found
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-slate-900">
            Can’t find that page.
          </h1>
          <p className="mt-3 text-slate-600">
            The link may be broken or the page may have moved.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--color-accent)] text-white font-semibold transition-300 hover:opacity-95"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-slate-300 text-slate-800 font-semibold transition-300 hover:bg-white"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${site.phone?.replace(/[^+\d]/g, "") || ""}`}
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-slate-300 text-slate-800 font-semibold transition-300 hover:bg-white"
            >
              Call {site.phone}
            </a>
          </div>

          <div className="mt-10 text-xs text-slate-500">
            © {new Date().getFullYear()} {site.legalName || site.brand}
          </div>
        </section>
      </main>
    </>
  );
}
