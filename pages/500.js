import Link from "next/link";
import { site } from "../siteConfig";
import { Meta } from "../lib/seo";

export default function ServerError() {
  const url = `${site.baseUrl}/500`;
  return (
    <>
      <Meta
        title="Something went wrong"
        description={`${site.brand} — Temporary error`}
        url={url}
        noindex
      />
      <main className="min-h-[70vh] grid place-items-center bg-[var(--color-light)]">
        <section className="mx-auto max-w-[700px] px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-white ring-1 ring-black/5 px-4 py-2 text-sm font-semibold text-slate-700">
            500 — Server Error
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-slate-900">
            That’s on us. Please try again.
          </h1>
          <p className="mt-3 text-slate-600">
            We hit a temporary snag. The team has been notified.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => location.reload()}
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[var(--color-accent)] text-white font-semibold transition-300 hover:opacity-95"
            >
              Reload Page
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-slate-300 text-slate-800 font-semibold transition-300 hover:bg-white"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-slate-300 text-slate-800 font-semibold transition-300 hover:bg-white"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-10 text-xs text-slate-500">
            © {new Date().getFullYear()} {site.legalName || site.brand}
          </div>
        </section>
      </main>
    </>
  );
}
