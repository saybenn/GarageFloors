"use client";
import { useId, useState } from "react";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  className = "",
}) {
  const [open, setOpen] = useState(defaultOpen);
  const regionId = useId();
  return (
    <div className={className}>
      <button
        type="button"
        className="mt-4 inline-flex items-center rounded-md px-3 py-2 ring-1 ring-slate-300 text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mr-2">{open ? "−" : "+"}</span>
        <span className="font-medium">{title}</span>
      </button>
      <div
        id={regionId}
        hidden={!open}
        className="mt-2 space-y-1 text-slate-600 text-sm"
      >
        {children}
      </div>
    </div>
  );
}
