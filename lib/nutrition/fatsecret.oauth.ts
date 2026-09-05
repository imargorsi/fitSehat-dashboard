import { createHmac, randomBytes } from "node:crypto";

export const FATSECRET_API_URL = "https://platform.fatsecret.com/rest/server.api";

/** RFC 3986 encoding used by OAuth 1.0 (uppercase hex, encode `!'()*`). */
export function rfc3986Encode(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) => {
    return `%${char.charCodeAt(0).toString(16).toUpperCase()}`;
  });
}

export function signedFatSecretQuery(
  httpMethod: "GET" | "POST",
  consumerKey: string,
  consumerSecret: string,
  apiParams: Record<string, string>
): string {
  const oauth: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_version: "1.0",
  };
  const params = { ...apiParams, ...oauth };
  const normalized = Object.keys(params)
    .sort()
    .map((key) => `${rfc3986Encode(key)}=${rfc3986Encode(params[key] ?? "")}`)
    .join("&");
  const baseString = [
    httpMethod,
    rfc3986Encode(FATSECRET_API_URL),
    rfc3986Encode(normalized),
  ].join("&");
  const signingKey = `${rfc3986Encode(consumerSecret)}&`;
  const signature = createHmac("sha1", signingKey).update(baseString).digest("base64");
  const signed: Record<string, string> = { ...params, oauth_signature: signature };

  return Object.keys(signed)
    .sort()
    .map((key) => `${rfc3986Encode(key)}=${rfc3986Encode(signed[key] ?? "")}`)
    .join("&");
}
