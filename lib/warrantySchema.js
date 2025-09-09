export function warrantySchemaFromConfig({
  businessName = "Coastal Poly Floors",
  serviceName = "Polyaspartic Garage Floor Coating",
  warrantySection,
}) {
  if (!warrantySection?.coverage?.term) return null;

  // crude parse: "5 Years" -> 5, unitCode ANN
  const match = /(\d+(?:\.\d+)?)\s*(year|years|yr|yrs|ann|annum)/i.exec(
    warrantySection.coverage.term || ""
  );
  const value = match ? Number(match[1]) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    provider: { "@type": "LocalBusiness", name: businessName },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Residential Garage" },
    hasWarrantyPromise: {
      "@type": "WarrantyPromise",
      durationOfWarranty: value
        ? { "@type": "QuantitativeValue", value, unitCode: "ANN" }
        : undefined,
      warrantyScope:
        "Adhesion and UV yellowing resistance (residential) per agreement terms",
    },
  };
}
