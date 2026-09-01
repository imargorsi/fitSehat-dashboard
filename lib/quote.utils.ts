export function splitQuoteHighlight(text: string): { lead: string; accent: string | null } {
  const comma = text.indexOf(",");
  if (comma !== -1) {
    return {
      lead: text.slice(0, comma + 1),
      accent: text.slice(comma + 1).trim(),
    };
  }
  return { lead: text, accent: null };
}
