"use client";
import { Project } from "@prisma/client";
import NewProjectShell from "./newProjectShell";
import { useState } from "react";
import AddProjectModal from "./addProjectModal";
import ProjectsTable from "./projectsTable";
import toast from "react-hot-toast";

type ProjectListProps = {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  const [open, setOpen] = useState(false);

  const notify = () => toast('Here is your toast.');
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold text-center">Projects</h1>
      <button onClick={notify}>Make me a toast</button>
      <div className="flex flex-col gap-1">
        {projects.length === 0 && (
          <NewProjectShell setOpen={setOpen} />
        )}
        {projects.length > 0 &&  (
       <ProjectsTable projects={projects} setOpen={setOpen} />
      )}
      </div>
      <AddProjectModal open={open} setOpen={setOpen} />
    </div>
  )
}
