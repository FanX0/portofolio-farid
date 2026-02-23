import { getProjects } from "@/shared/lib/sanity/queries";
import HomeClient from "@/shared/components/sections/home/Home.client";

export default async function HomePage() {
  const projects = await getProjects();

  return <HomeClient projects={projects} />;
}
