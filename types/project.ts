export type SanityImageAsset = {
  _id: string;
  url: string;
};

export type SanityImage = {
  _type: "image";
  asset: SanityImageAsset;
  alt?: string;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  liveDemo?: string;
  technologies: string[];
  images: SanityImage[];
};
