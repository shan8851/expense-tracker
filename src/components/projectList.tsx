"use client";
import { Project } from "@prisma/client";
import NewProjectShell from "./newProjectShell";
import { useState } from "react";
import AddProjectModal from "./addProjectModal";

type ProjectListProps = {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold text-center">Projects</h1>
      <div className="flex flex-col gap-1">
        {projects.length === 0 && (
          <NewProjectShell setOpen={setOpen} />
        )}
        {projects.length > 0 && projects.map((project) => (
        <div className="flex flex-col p-4 border border-black rounded" key={project.id}>
          <p>{project.name}</p>
          <p>{project.description}</p>
        </div>
      ))}
      {projects.length > 0 && (
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="w-fit inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          Create New Project
        </button>
      )}
      </div>
      <AddProjectModal open={open} setOpen={setOpen} />
    </div>
  )
}
