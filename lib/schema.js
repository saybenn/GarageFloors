import { site } from "../siteConfig";

/** tiny helpers */
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const defined = (v) => typeof v !== "undefined" && v !== null;

/** Build a LocalBusiness or ServiceAreaBusiness JSON-LD object */
export function localBusinessSchema({ url }) {
  const hasAddress = isObj(site?.address);
  const businessType = hasAddress
    ? "LocalBusiness"
    : "HomeAndConstructionBusiness";

  const base = {
    "@context": "https://schema.org",
    "@type": businessType,
    name: site?.brand,
    legalName: site?.legalName,
    url,
    telephone: site?.phone,
    email: site?.email,
    priceRange: site?.priceRange,
    areaServed: site?.areaServed,
    openingHours: site?.hours,
  };

  if (hasAddress) {
    base.address = {
      "@type": "PostalAddress",
      ...(defined(site.address.street) && {
        streetAddress: site.address.street,
      }),
      ...(defined(site.address.city) && { addressLocality: site.address.city }),
      ...(defined(site.address.region) && {
        addressRegion: site.address.region,
      }),
      ...(defined(site.address.postalCode) && {
        postalCode: site.address.postalCode,
      }),
      addressCountry: "US",
    };
  }

  // Social profiles (safe)
  const socialObj = isObj(site?.social) ? site.social : {};
  const sameAs = Object.values(socialObj).filter(Boolean);
  if (sameAs.length) base.sameAs = sameAs;

  return base;
}

/** Build a Service JSON-LD object for a specific offering */
export function serviceSchema({ name = "Garage Floor Coating", url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: {
      "@type": "LocalBusiness",
      name: site.brand,
      telephone: site.phone,
      areaServed: site.areaServed,
    },
    areaServed: site.areaServed,
    url,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        // keep generic; your page copy can show ranges
        minPrice: 6,
        unitText: "SQ_FT",
      },
      availability: "https://schema.org/InStock",
    },
  };
}

/** Minimal FAQPage JSON-LD */
export function faqSchema(items = []) {
  const safeItems = Array.isArray(items) ? items : [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: safeItems
      .filter((pair) => Array.isArray(pair) && pair.length === 2)
      .map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
  };
}
