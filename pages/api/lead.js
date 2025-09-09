import { z } from "zod";
import { Resend } from "resend";
import { rateLimit } from "../../lib/lead/rateLimit";
import { renderHtmlEmail, sanitizeLead } from "../../lib/lead/email";

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(25),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/)
    .optional()
    .or(z.literal("")),
  surfaceSize: z.string().optional().or(z.literal("")),
  currentSurface: z.string().optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot must be empty
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  // Very basic IP extraction (works on Vercel/Node behind proxy)
  const ip = (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown"
  ).trim();

  if (!rateLimit(ip))
    return res.status(429).json({ error: "Too many requests." });

  const parse = LeadSchema.safeParse(req.body);
  if (!parse.success) {
    const first = parse.error.issues?.[0];
    return res.status(400).json({ error: first?.message || "Invalid input." });
  }

  const lead = sanitizeLead(parse.data);

  const hasEnv = !!(
    process.env.RESEND_API_KEY &&
    process.env.LEAD_TO_EMAIL &&
    process.env.LEAD_FROM_EMAIL
  );

  if (!hasEnv) {
    console.log("[LEAD] (email disabled) =>", JSON.stringify(lead, null, 2));
    return res.status(200).json({ ok: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `New Lead: ${lead.name}${lead.zip ? ` (${lead.zip})` : ""}`;
    const html = renderHtmlEmail(lead);

    await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL,
      to: process.env.LEAD_TO_EMAIL,
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[LEAD] email send failed:", err);
    // Soft success per spec: user should not be penalized for provider failure
    return res.status(200).json({ ok: true });
  }
}
