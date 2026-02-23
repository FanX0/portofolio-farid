import { ProjectScrollSectionProps } from "./projectScroll.types";
import ProjectScrollClient from "./ProjectScrollSection.client";

export default function ProjectScrollSection(props: ProjectScrollSectionProps) {
  return <ProjectScrollClient {...props} />;
}
