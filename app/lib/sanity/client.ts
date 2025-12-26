import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "4zl94dvo",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
