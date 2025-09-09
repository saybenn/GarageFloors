import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "../siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // freeze header when menu is open, and don't hide on scroll while open
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 4);

      if (open) {
        setHidden(false); // keep visible while menu open
        lastY = y;
        return;
      }

      const goingDown = y > lastY + 8;
      const goingUp = y < lastY - 8;
      if (y > 80 && goingDown) setHidden(true);
      if (goingUp) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // lock page scroll when mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    if (open) html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  const handleNav = () => setOpen(false);

  return (
    <>
      {/* Fixed header so menu overlay doesn't push layout and trigger bounce */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
          hidden ? "-translate-y-full" : "translate-y-0",
          // keep it navy at all times to avoid white-on-white at top
          "bg-[#0B1C2C]/95 backdrop-blur",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-[1100px] px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between text-white">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={handleNav}
            aria-label="Home"
          >
            <span className="font-semibold tracking-tight text-2xl md:text-3xl">
              {site.brand}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 font-semibold text-sm">
            <li>
              <Link href="/about" className="hover:opacity-90">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services/garage-floor-coatings"
                className="hover:opacity-90"
              >
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:opacity-90">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              >
                Get a Free Quote
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-white/90 ring-1 ring-white/20"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
          >
            <span className="sr-only">Toggle menu</span>☰
          </button>
        </nav>
      </header>

      {/* Mobile panel as a fixed overlay below the header */}
      <div
        id="mobile-menu"
        className={[
          "md:hidden fixed inset-x-0 top-16 z-40 bg-[#0B1C2C]/95 text-white",
          "transition-[max-height] duration-300 overflow-hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        ].join(" ")}
        aria-hidden={open ? "false" : "true"}
      >
        <div className="mx-auto max-w-[1100px] px-4 py-3">
          <div className="grid gap-2">
            <Link
              href="/about"
              className="block px-3 py-2 hover:opacity-90"
              onClick={handleNav}
            >
              About
            </Link>
            <Link
              href="/services/garage-floor-coatings"
              className="block px-3 py-2 hover:opacity-90"
              onClick={handleNav}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 hover:opacity-90"
              onClick={handleNav}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="mt-1 inline-flex justify-center rounded-lg px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              Get a Free Quote
            </Link>
            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
                className="block px-3 py-2"
              >
                {site.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Push page content below the fixed header */}
      <div className="h-16" />
    </>
  );
}
