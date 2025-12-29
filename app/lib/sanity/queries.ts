import { client } from "./client";

export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      description,
      liveDemo,
      technologies,
      images[]{
        asset->{
          _id,
          url
        }
      }
    }
  `);
}
