import type { SanityImage } from "@/shared/types/project";

/**
 * Lightweight helper to extract the image URL.
 * It expects the asset to have been pre-resolved by the GROQ query
 * (using asset->{url}) to avoid pulling the heavy Sanity client 
 * and builder into the client-side bundle.
 */
export function getImageUrl(image?: SanityImage | null): string | null {
  if (!image || !image.asset) return null;
  
  // Return the pre-resolved URL from the GROQ query
  return image.asset.url || null;
}
