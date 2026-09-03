export const ERROR_CODES = {
  VALIDATION: "VALIDATION",
  AUTH: "AUTH",
  NOT_FOUND: "NOT_FOUND",
  DATABASE: "DATABASE",
  EXTERNAL: "EXTERNAL",
  INTERNAL: "INTERNAL",
} as const;

export type TErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
