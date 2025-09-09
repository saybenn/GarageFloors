import { Meta } from "../lib/seo";
import SchemaInjector from "../components/SchemaInjector";
import { localBusinessSchema } from "../lib/schema";
import { site } from "../siteConfig";

export default function About() {
  const url = `${site.baseUrl}/about`;
  return (
    <>
      <Meta
        title="About Us"
        url={url}
        description="Local 757 crew. Insured. OSHA silica-safe practices. Photo proof on every job."
      />
      <SchemaInjector data={localBusinessSchema({ url })} />

      <main
        style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>
          About {site.brand}
        </h1>
        <p style={{ marginTop: ".6rem", opacity: 0.9 }}>
          We’re a Virginia Beach based team focused on safety, craftsmanship,
          and clear communication. We follow OSHA silica-safe practices with
          vacuum-shrouded grinders and protective equipment, and we send photo
          proof on every job so you can see the results.
        </p>

        <section style={{ marginTop: "1.2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
            What We Stand For
          </h2>
          <ul style={{ marginTop: ".4rem", lineHeight: 1.6 }}>
            <li>
              <b>Quality prep:</b> Mechanical grinding for adhesion—no acid-etch
              shortcuts.
            </li>
            <li>
              <b>Honest specs:</b> UV-stable polyaspartic finish for coastal sun
              and hot-tire durability.
            </li>
            <li>
              <b>Respect for your home:</b> Clean workspace and thorough ground
              cleanup.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
