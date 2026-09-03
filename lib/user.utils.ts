export function firstName(name: string): string {
  const part = name.trim().split(/\s+/).filter(Boolean)[0] ?? name;
  if (part.includes("@")) {
    return part.split("@")[0] ?? part;
  }
  return part;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts[0]?.includes("@")) {
    return (parts[0][0] ?? "?").toUpperCase();
  }
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
