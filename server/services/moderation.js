const bannedKeywords = ["malware", "exploit", "hack", "ddos", "phish"];

export function containsRestrictedContent(text) {
  const lower = text.toLowerCase();
  return bannedKeywords.some((keyword) => lower.includes(keyword));
}
