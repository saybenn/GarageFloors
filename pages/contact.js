// pages/contact.js
import { Meta } from "../lib/seo";
import SchemaInjector from "../components/SchemaInjector";
import { localBusinessSchema } from "../lib/schema";
import { site } from "../siteConfig";
import { useState } from "react";

export default function Contact() {
  const url = `${site.baseUrl}/contact`;
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());

    // Honeypot: if filled, silently abort
    if (body.website) {
      setStatus({ state: "idle", msg: "" });
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      window.location.href = "/thanks";
    } catch (err) {
      setStatus({
        state: "error",
        msg: err.message || "Something went wrong.",
      });
    }
  }

  const inputBase =
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 " +
    "placeholder:text-slate-400 shadow-sm outline-none transition " +
    "focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]";

  const labelBase = "text-sm font-medium text-slate-800";

  return (
    <>
      <Meta
        title="Contact"
        url={url}
        description="Request a free quote. We’ll respond within one business day."
      />
      <SchemaInjector data={localBusinessSchema({ url })} id="contact-schema" />

      <main className="mx-auto max-w-[900px] px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Contact Us
        </h1>
        <p className="mt-2 text-slate-700">
          Call{" "}
          <a
            href={`tel:${site.phone?.replace(/[^0-9+]/g, "")}`}
            className="underline decoration-amber-400 underline-offset-2"
          >
            {site.phone}
          </a>{" "}
          or send a request below—we’ll get back within one business day.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-6 rounded-2xl border border-[#E0E4EA] bg-white p-5 md:p-8 shadow-[0_10px_30px_rgba(12,35,64,.08)]"
        >
          <div className="grid gap-5 md:gap-6 md:grid-cols-2">
            {/* Full name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className={labelBase}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className={inputBase}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className={labelBase}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={inputBase}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className={labelBase}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                placeholder="(757) 555-0137"
                className={inputBase}
              />
            </div>

            {/* ZIP */}
            <div className="space-y-1.5">
              <label htmlFor="zip" className={labelBase}>
                ZIP
              </label>
              <input
                id="zip"
                name="zip"
                inputMode="numeric"
                pattern="[0-9]{5}"
                placeholder="23451"
                className={inputBase}
              />
            </div>

            {/* Project details */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="message" className={labelBase}>
                Project details
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="2-car garage, current floor bare/paint/old epoxy; any cracks or pitting; preferred timing…"
                className={inputBase + " h-auto resize-y py-2"}
              />
            </div>

            {/* Honeypot (visually hidden, still in DOM) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto h-0 w-0 opacity-0"
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              By submitting, you agree to our{" "}
              <a href="/terms" className="underline">
                Terms
              </a>
              . We don’t sell your data.
            </p>

            <button
              type="submit"
              disabled={status.state === "loading"}
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-[var(--color-accent)] text-white font-semibold hover:opacity-95 disabled:opacity-60"
            >
              {status.state === "loading" ? "Sending…" : "Request My Quote"}
            </button>
          </div>

          {/* Error alert */}
          {status.state === "error" && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {status.msg}
            </p>
          )}
        </form>

        {/* Quick meta chips (optional) */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Hours: {site.hours}
          </span>
          {Array.isArray(site.areaServed) && site.areaServed.length > 0 && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Service Area: {site.areaServed.slice(0, 3).join(", ")}
              {site.areaServed.length > 3 ? "…" : ""}
            </span>
          )}
        </div>
      </main>
    </>
  );
}
