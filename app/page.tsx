import { getProjects } from "@/app/lib/sanity/queries";
import HomeClient from "@/app/components/sections/home/Home.client";

export default async function HomePage() {
  const projects = await getProjects();

  return <HomeClient projects={projects} />;
}
