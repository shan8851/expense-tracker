import { Project } from "@prisma/client";

type ProjectListProps = {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold">Projects</h1>
      <div className="flex flex-col gap-1">
        {projects.length === 0 && (
          <h2 className="text-lg">No projects found</h2>
        )}
        {projects.length > 0 && projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
      </div>
    </div>
  )
}
