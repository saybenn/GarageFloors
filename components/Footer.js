import { site } from "../siteConfig"; // adjust the path if siteConfig.js is in /lib

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 py-8 text-sm text-slate-700 grid gap-4 md:grid-cols-3">
        <div>
          <div className="font-semibold">{site.brand}</div>
          <div className="opacity-80">
            {site.areaServed?.length
              ? `Serving ${site.areaServed.join(", ")}`
              : null}
          </div>
        </div>
        <div>
          <div className="font-semibold">Hours</div>
          <div>{site.hours}</div>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <div>{site.phone}</div>
          <div>{site.email}</div>
        </div>
      </div>
      <div className="bg-white text-center text-xs text-slate-500 py-4">
        © {new Date().getFullYear()} {site.legalName || site.brand}. All rights
        reserved.
      </div>
    </footer>
  );
}
