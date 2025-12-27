import { ProjectSectionProps } from "./project.types";
import ProjectSectionClient from "./ProjectSection.client";

export default function ProjectSection(props: ProjectSectionProps) {
  return <ProjectSectionClient {...props} />;
}
