import { Project } from "@prisma/client";
import NewProjectShell from "./newProjectShell";

type ProjectListProps = {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold">Projects</h1>
      <div className="flex flex-col gap-1">
        {projects.length === 0 && (
          <NewProjectShell />
        )}
        {projects.length > 0 && projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
      </div>
    </div>
  )
}
