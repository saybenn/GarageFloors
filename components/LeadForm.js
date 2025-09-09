"use client";
import { useEffect, useId, useMemo, useState } from "react";
import { site } from "../siteConfig";

const cfg = site?.leadForm || {};

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    surfaceSize: "",
    currentSurface: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const formId = useId();
  const thanksUrl = cfg.thanksUrl || "/thanks";

  const showZip = cfg?.fields?.zip !== false; // default true
  const showSurfaceSize = !!cfg?.fields?.surfaceSize;
  const showCurrentSurface = !!cfg?.fields?.currentSurface;

  useEffect(() => {
    // Clear status on input
    if (status) setStatus("");
  }, [
    form.name,
    form.email,
    form.phone,
    form.message,
    form.zip,
    form.surfaceSize,
    form.currentSurface,
  ]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlurValidate = (e) => {
    const { name } = e.target;
    const msg = validateSingle(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const clientValidateAll = () => {
    const fields = ["name", "email", "phone"]; // message optional per spec
    if (showZip) fields.push("zip");
    const newErrs = {};
    for (const k of fields) newErrs[k] = validateSingle(k, form[k]);
    setErrors(newErrs);
    return Object.values(newErrs).every((v) => !v);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!clientValidateAll()) return;

    setSubmitting(true);
    setStatus("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setStatus("Success! Redirecting…");
        // tiny delay for screen readers to announce status
        setTimeout(() => {
          window.location.assign(thanksUrl);
        }, 200);
      } else {
        setStatus(data?.error || "Something went wrong. Try again.");
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="quote"
      onSubmit={onSubmit}
      className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_25px_-12px_rgba(0,0,0,.25)] p-5 md:p-6"
      noValidate
    >
      <header className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          {cfg.title || "Get a Fast, No-Obligation Quote"}
        </h2>
        {cfg.subhead && (
          <p className="mt-1.5 text-sm text-gray-600">{cfg.subhead}</p>
        )}
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          value={form.name}
          onChange={onChange}
          onBlur={onBlurValidate}
          error={errors.name}
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          onBlur={onBlurValidate}
          error={errors.email}
          required
          autoComplete="email"
        />
        <Field
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={onChange}
          onBlur={onBlurValidate}
          error={errors.phone}
          required
          autoComplete="tel"
          placeholder="(757) 555-0137"
        />

        {showZip && (
          <Field
            label="ZIP"
            name="zip"
            value={form.zip}
            onChange={onChange}
            onBlur={onBlurValidate}
            error={errors.zip}
            autoComplete="postal-code"
            placeholder="23451"
          />
        )}

        {showSurfaceSize && (
          <Select
            label="Surface size"
            name="surfaceSize"
            value={form.surfaceSize}
            onChange={onChange}
            options={[
              { value: "", label: "Select…" },
              { value: "1-car", label: "1-car" },
              { value: "2-car", label: "2-car" },
              { value: "3-car", label: "3-car" },
              { value: "other", label: "Other" },
            ]}
          />
        )}

        {showCurrentSurface && (
          <Select
            label="Current surface"
            name="currentSurface"
            value={form.currentSurface}
            onChange={onChange}
            options={[
              { value: "", label: "Select…" },
              { value: "bare", label: "Bare" },
              { value: "paint", label: "Paint" },
              { value: "old epoxy", label: "Old epoxy" },
              { value: "unknown", label: "Unknown" },
            ]}
          />
        )}

        <Textarea
          label="Message (optional)"
          name="message"
          value={form.message}
          onChange={onChange}
          maxLength={1000}
          placeholder="Tell us anything helpful (size, moisture, timeline)…"
          className="md:col-span-2"
        />

        {/* Honeypot */}
        <div className="sr-only" aria-hidden>
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            value={form.website}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 inline-flex items-center rounded-lg px-5 py-3 bg-[var(--color-accent,theme(colors.blue.600))] text-white font-semibold hover:opacity-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent,theme(colors.blue.500))]/40 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get My Free Quote"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-2 text-sm ${
          status && !status.toLowerCase().includes("success")
            ? "text-red-600"
            : "text-gray-600"
        }`}
      >
        {status}
      </p>

      <SmallLegal text={cfg.privacy} />
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  required,
  autoComplete,
  placeholder,
}) {
  const id = useId();
  const describedBy = error ? `${id}-err` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 transition focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
      {error && (
        <p id={describedBy} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Textarea({
  label,
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  className = "",
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={4}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 transition focus:outline-none focus:ring-4 focus:ring-blue-200"
      />
      <div className="mt-1 text-xs text-slate-500">
        {value?.length || 0}/{maxLength} characters
      </div>
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 transition focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SmallLegal({ text }) {
  if (!text) return null;
  return <p className="mt-2 text-xs text-slate-500">{text}</p>;
}

function validateSingle(name, value) {
  if (name === "name") {
    if (!value || value.trim().length < 2)
      return "Please enter your full name.";
    if (value.trim().length > 80) return "Name is too long.";
  }
  if (name === "email") {
    if (!value) return "Email is required.";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!ok) return "Enter a valid email address.";
  }
  if (name === "phone") {
    if (!value) return "Phone is required.";
    const raw = value.replace(/[^0-9+\-()\s]/g, "");
    if (raw.replace(/\D/g, "").length < 7) return "Enter a valid phone number.";
  }
  if (name === "zip" && value) {
    const ok = /^\d{5}(-\d{4})?$/.test(value.trim());
    if (!ok) return "Enter a valid ZIP or ZIP+4.";
  }
  return "";
}
