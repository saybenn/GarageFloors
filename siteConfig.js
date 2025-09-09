// siteConfig.js
// Replace TODOs with final client data.

export const site = {
  brand: "Coastal Poly Floors",
  legalName: "Coastal Poly Floors LLC",
  baseUrl: "https://www.coastalpolyfloors.com",

  phone: "(757) 555-0137",
  email: "hello@coastalpolyfloors.com",

  address: null,
  hours: "Mon–Sat 8am–6pm",
  areaServed: [
    "Virginia Beach",
    "Chesapeake",
    "Norfolk",
    "Portsmouth",
    "Suffolk",
  ],
  priceRange: "$$",

  hero: {
    h1: "1-Day Polyaspartic Garage Floors in Virginia Beach — UV-Stable. Hot-Tire Tough.",
    sub: "We diamond-grind, repair, and coat your garage floor with a UV-stable polyaspartic system. Walk on it the same day; park in ~24–48 hours (conditions apply).",
  },

  warranty:
    "5-year adhesion & yellowing coverage (residential). Excludes substrate movement, hydrostatic moisture, structural cracking, and misuse.",

  process: {
    title: "Our Proven 6-Step Garage Floor Process",
    subhead:
      "From bare concrete to a flawless finish in just one day — here’s how we do it.",
    steps: [
      {
        title: "Grind",
        body: "Dust-controlled diamond grinding for a proper adhesion profile.",
        icon: "grind",
        img: {
          src: "/media/steps/grind.jpg",
          alt: "Grinding concrete with vacuum-shrouded grinder",
        },
      },
      {
        title: "Repair",
        body: "Fill cracks and pits, stabilize the slab, feather smooth.",
        icon: "repair",
        img: {
          src: "/media/steps/repair.jpg",
          alt: "Crack fill and patching divots",
        },
      },
      {
        title: "Base Coat",
        body: "Industrial-grade polyaspartic base tailored to slab conditions.",
        icon: "base",
        img: { src: "/media/steps/base.jpg", alt: "Squeegeeing base coat" },
      },
      {
        title: "Flake",
        body: "Broadcast decorative flakes to rejection for coverage and texture.",
        icon: "flake",
        img: {
          src: "/media/steps/flake.jpg",
          alt: "Broadcasting color flakes",
        },
      },
      {
        title: "Scrape",
        body: "Scrape and vacuum to remove excess, leaving a flat surface.",
        icon: "scrape",
        img: { src: "/media/steps/scrape.jpg", alt: "Scraping excess flakes" },
      },
      {
        title: "Topcoat",
        body: "UV-stable polyaspartic topcoat for long-term durability.",
        icon: "topcoat",
        img: {
          src: "/media/steps/topcoat.jpg",
          alt: "Rolling polyaspartic topcoat",
        },
      },
    ],
    cta: {
      headline: "Ready to Transform Your Garage?",
      body: "Get a fast, no-obligation quote from our local crew.",
      primary: { label: "Get My Free Quote", href: "#quote" },
      secondary: { label: "Contact Us", href: "/contact" },
    },
    // background color for this section (keeps contrast with dark hero)
    background: "#F5F6F8",
  },
  // ---- Services content used by ServicesSection ----
  services: {
    primarySlug: "garage-floor-coatings",
    items: {
      "garage-floor-coatings": {
        title: "Garage Floors Built to Last",
        intro:
          "We install UV-stable, full-flake polyaspartic floors designed for Virginia’s coastal climate. Proper surface prep, structural crack repair, and a fast-curing topcoat mean you can walk same-day and park within ~24–48 hours (conditions apply).",
        bullets: [
          "Diamond-ground prep (no acid-etch)",
          "Full-flake broadcast for coverage & traction",
          "UV-stable polyaspartic topcoat (resists yellowing)",
          "Hot-tire pickup resistance",
        ],
        image: {
          src: "/media/after-garage.webp", // TODO: replace with real asset
          alt: "Fresh polyaspartic flake garage floor",
          width: 880,
          height: 560,
        },
        badges: [
          "Full-flake finish",
          "{PRIMARY_CITY} & nearby", // token replaced by first areaServed city
        ],
        ctas: {
          primary: { label: "Get a Free Quote", href: "#quote" },
          secondary: { label: "Contact Us", href: "/contact" },
        },
      },
    },
  },
  warranty:
    "5-year adhesion & yellowing coverage (residential). Excludes substrate movement, hydrostatic moisture, structural cracking, and misuse.",

  warrantySection: {
    title: "Our Warranty & Guarantees",
    subhead:
      "We stand behind our work with clear coverage and honest expectations.",
    highlights: [
      {
        icon: "shield",
        title: "Adhesion Guarantee",
        text: "Our system is warrantied against peeling from the substrate under normal residential use.",
      },
      {
        icon: "sun",
        title: "UV Stability",
        text: "Polyaspartic topcoat designed to resist yellowing in sun-exposed areas.",
      },
      {
        icon: "tire",
        title: "Hot-Tire Resistance",
        text: "Formulated to resist hot-tire pickup under typical residential conditions.",
      },
    ],
    coverage: {
      term: "5 Years",
      scope: [
        "Residential garages (owner-occupied).",
        "Adhesion of coating to a properly prepared substrate.",
        "UV yellowing resistance of the polyaspartic topcoat.",
      ],
    },
    exclusions: [
      "Substrate movement, heaving, or structural cracking.",
      "Hydrostatic moisture or active vapor drive through the slab.",
      "Pre-existing slab contamination (oils, silanes) that prevents adhesion.",
      "Improper maintenance, misuse, impact damage, or chemical abuse.",
    ],
    notes:
      "Full terms are provided in your installation agreement. Coverage begins on the installation date.",
    ctas: {
      primary: { label: "Get My Free Quote", href: "#quote" },
      secondary: { label: "Ask About Coverage", href: "/contact" },
    },
    assets: {
      pdfUrl: null, // e.g. "/warranty/coastal-poly-floors-warranty.pdf"
      pdfMeta: { label: "Download Full Warranty", pages: 2, fileType: "PDF" },
    },
    background: "var(--color-light)", // or hex like "#F5F6F8"
    variant: "default", // "default" | "compact"
  },
  gallery: {
    title: "Before & After Transformations",
    subhead: "Real garages we’ve transformed in the Virginia Beach area.",
    items: [
      {
        id: "job-001",
        title: "2-Car Garage — Chic’s Beach",
        caption: "Full-flake polyaspartic system • 1-day install",
        location: "Virginia Beach, VA",
        date: "2025-07", // optional ISO-like
        orientation: "landscape", // or "portrait"
        before: {
          src: "/media/gallery/job-001-before.webp",
          alt: "Bare concrete with oil stains",
          width: 1600,
          height: 900, // for next/image
          blur: "/media/gallery/job-001-before-blur.jpg", // optional placeholder
        },
        after: {
          src: "/media/gallery/job-001-after.webp",
          alt: "Fresh polyaspartic flake floor, clean and glossy",
          width: 1600,
          height: 900,
          blur: "/media/gallery/job-001-after-blur.jpg",
        },
        tags: ["full-flake", "2-car", "residential"],
      },
      // more items...
    ],
    cta: {
      headline: "Like what you see?",
      primary: { label: "Get My Free Quote", href: "#quote" },
      secondary: { label: "Contact Us", href: "/contact" },
    },
  },
  leadForm: {
    title: "Get a Fast, No-Obligation Quote",
    subhead:
      "Tell us a little about your garage. We’ll follow up within one business day.",
    fields: {
      zip: true,
      surfaceSize: true,
      currentSurface: true,
    },
    privacy: "By submitting, you agree to be contacted about your request.",
    thanksUrl: "/thanks",
  },
  faq: {
    title: "Frequently Asked Questions",
    subhead:
      "Straight answers to the most common concerns we hear from homeowners.",
    items: [
      {
        q: "Will my new floor yellow in the sun?",
        a: "No — we use a UV-stable polyaspartic topcoat formulated to resist yellowing over time, even in sun-exposed garages.",
      },
      {
        q: "How soon can I park on the floor?",
        a: "You can walk on the surface in ~12 hours. Vehicles can typically return within 24–48 hours depending on conditions.",
      },
      {
        q: "What about hot-tire pickup?",
        a: "Our polyaspartic system is designed to resist hot-tire pickup, a common failure with cheaper epoxy products.",
      },
      {
        q: "What if I have cracks or moisture issues?",
        a: "We patch structural cracks and use moisture-tolerant materials, but hydrostatic vapor drive or major structural movement is excluded under warranty.",
      },
      {
        q: "Do you acid-etch the concrete?",
        a: "No — we diamond-grind every floor for the strongest adhesion. Acid-etching is weaker and not part of our system.",
      },
      {
        q: "How do you handle cleanup?",
        a: "All grinding dust is vacuumed with HEPA-filtered equipment, and flakes are scraped and vacuumed before sealing. We leave your garage clean and ready.",
      },
    ],
  },
  theme: {
    primary: "#0B1C2C",
    light: "#F5F6F8",
    accent: "#F59E0B",
  },
};
