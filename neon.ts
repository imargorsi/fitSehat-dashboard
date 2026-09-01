/**
 * Neon project config-as-code placeholder.
 *
 * `npx neon@latest init` installed the Cursor neon-postgres plugin.
 * CLI project linking needs a Neon API key or browser login, which this
 * environment could not complete. The app connects with DATABASE_URL instead.
 *
 * When you have an API key:
 *   npx neon@latest link --project-id <id>
 *   npx neon@latest config init
 */
export const neonProject = {
  name: "FitSehat",
  endpointId: "ep-square-art-azwbf8ft",
  region: "ap-southeast-1",
  authEnabled: true,
};
