import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(image?: SanityImageSource | null): string | null {
  if (!image) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(image as any).asset) return null;
  return urlFor(image).url();
}
