export function sanitizeLead(data) {
  const s = (v) =>
    typeof v === "string"
      ? v.replace(/[<>]/g, (m) => ({ "<": "&lt;", ">": "&gt;" }[m]))
      : v;
  const lead = {
    name: s(data.name?.trim()),
    email: s(data.email?.trim()),
    phone: s(data.phone?.trim()),
    zip: s(data.zip || ""),
    surfaceSize: s(data.surfaceSize || ""),
    currentSurface: s(data.currentSurface || ""),
    message: s(limitAndStripUrls(data.message || "")),
  };
  return lead;
}

function limitAndStripUrls(msg) {
  const truncated = String(msg).slice(0, 1000);
  // remove obvious URLs to reduce spam value in emails (optional)
  return truncated.replace(/https?:\/\/\S+/gi, "[link removed]");
}

export function renderHtmlEmail(lead) {
  const row = (k, v) => `
    <tr>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f8fafc">${k}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb">${v || ""}</td>
    </tr>`;

  return `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial">
    <h2 style="margin:0 0 8px">New Lead</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("ZIP", lead.zip)}
      ${row("Surface Size", lead.surfaceSize)}
      ${row("Current Surface", lead.currentSurface)}
      ${row("Message", nl2br(lead.message))}
    </table>
  </div>`;
}

function nl2br(s) {
  return String(s || "").replace(/\n/g, "<br/>");
}
