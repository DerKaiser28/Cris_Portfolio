import { createClient } from "next-sanity";

// Import environment variables safely
import { apiVersion, dataset, projectId } from "../env";

// Validate env vars to avoid silent build issues
if (!projectId || !dataset) {
  throw new Error("Missing SANITY configuration: projectId or dataset is undefined.");
}

/**
 * Sanity Client
 * - Uses CDN in production for fast public queries
 * - Disables CDN in dev for real-time updates
 * - Safe defaults for ISR, tag revalidation, and edge rendering
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // CDN for published content only
  perspective: "published", // Ensures only published content is fetched
  stega: {
    enabled: process.env.NEXT_PUBLIC_SANITY_STEGA === "true", // optional: enable source map for preview
  },
});
