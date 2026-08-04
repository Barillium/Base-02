export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-27";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio";
export const readToken = process.env.SANITY_API_READ_TOKEN;
export const previewToken = process.env.SANITY_API_PREVIEW_TOKEN;

export const isSanityConfigured = Boolean(projectId && dataset);

export function assertSanityConfigured() {
  if (!isSanityConfigured) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET before using the Sanity client.",
    );
  }
}
