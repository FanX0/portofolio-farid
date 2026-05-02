/**
 * Centralized asset configuration for the portfolio.
 * Allows easy switching between local development assets and production CDN assets.
 */

export const assets = {
  videos: {
    heroPreview: {
      local: "/videos/hero/project-preview.mp4",
      // When you move to a CDN (Cloudinary/Mux), paste the URL below
      cdn: process.env.NEXT_PUBLIC_CDN_HERO_VIDEO || "/videos/hero/project-preview.mp4",
      poster: "/images/hero-poster.jpg",
    },
  },
  images: {
    og: "/og-image.png",
    // Fallback images if Sanity content is missing
    placeholder: "/images/placeholder.webp",
  },
} as const;

/**
 * Returns the optimized URL for a video asset.
 */
export const getVideoUrl = (key: keyof typeof assets.videos) => {
  const asset = assets.videos[key];
  return process.env.NODE_ENV === "production" ? asset.cdn : asset.local;
};
