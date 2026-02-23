import { getProjects } from "@/lib/sanity/queries";
import HomeClient from "@/components/sections/home/Home.client";

export default async function HomePage() {
  const projects = await getProjects();

  return <HomeClient projects={projects} />;
}
