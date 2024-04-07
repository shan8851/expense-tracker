'use client';
import { Project } from '@prisma/client';
import { NewProjectShell } from './newProjectShell';
import { useState } from 'react';
import { ProjectsTable } from '../../tables/projectsTable';

type ProjectListProps = {
  projects: Project[];
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto mt-8">
      <div className="flex flex-col gap-1">
        <ProjectsTable projects={projects}  />
      </div>
    </div>
  );
};
