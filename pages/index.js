import { site } from "../siteConfig";
import { Meta } from "../lib/seo";

import Hero from "../components/Hero";
import ProcessTimeline from "../components/ProcessTimeline";
import ServicesSection from "../components/ServicesSection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Warranty from "@/components/Warranty";
import LeadForm from "../components/LeadForm";

// Schema wiring
import SchemaInjector from "../components/SchemaInjector";
import { localBusinessSchema, serviceSchema, faqSchema } from "../lib/schema";
// Optional: only if you added it per earlier message
import { warrantySchemaFromConfig } from "../lib/warrantySchema";
import FAQ from "@/components/FAQ";

export default function Home() {
  const url = `${site.baseUrl}/`;

  // --- JSON-LD objects (all config-driven) ---
  const localBiz = localBusinessSchema({ url });

  const svc = serviceSchema({
    name: "Polyaspartic Garage Floor Coating",
    url,
  });

  const faq = faqSchema([
    [
      "Will it yellow in the VB sun?",
      "We finish with a UV-stable polyaspartic topcoat designed to resist yellowing.",
    ],
    [
      "When can I park on it?",
      "Most installs allow vehicle parking in ~24–48 hours depending on temperature and humidity.",
    ],
    [
      "Do you acid-etch?",
      "No. We mechanically diamond-grind for a proper adhesion profile.",
    ],
  ]);

  const warrantyJsonLd =
    typeof warrantySchemaFromConfig === "function"
      ? warrantySchemaFromConfig({
          businessName: site.brand,
          serviceName: "Polyaspartic Garage Floor Coating",
          warrantySection: site.warrantySection,
        })
      : null;

  const schemaGraph = [localBiz, svc, faq, warrantyJsonLd].filter(Boolean);

  return (
    <>
      <Meta url={url} />

      {/* One consolidated JSON-LD <script> via @graph */}
      {schemaGraph.length > 0 && (
        <SchemaInjector data={schemaGraph} id="home-graph" />
      )}

      {/* 1) Split hero (navy) */}
      <Hero />

      {/* 2) Process (light) */}
      <ProcessTimeline />

      {/* 3) Services (navy) with CTA */}
      <ServicesSection />

      {/* 4) BeforeandAfterGallery */}
      <BeforeAfterGallery
        title={site.gallery?.title}
        subhead={site.gallery?.subhead}
        items={site.gallery?.items || []}
        cta={site.gallery?.cta}
      />

      {/* 5) Warranty  */}
      <Warranty data={site.warrantySection} fallbackText={site.warranty} />

      {/* 6) Lead form (conversion) */}
      <section className="mx-auto max-w-[1100px] px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Fast, no-obligation quote
          </h2>
          <ul className="mt-3 space-y-1 text-gray-700 text-sm">
            <li>• Local team, usually responds same day</li>
            <li>• Direct insurance guidance available</li>
            <li>• Financing options on approved credit</li>
          </ul>
        </div>
        <LeadForm />
      </section>

      {/* 7) FAQ */}
      <FAQ />
    </>
  );
}

