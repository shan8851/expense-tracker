'use client';
import { Project } from '@prisma/client';
import Link from 'next/link';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { deleteProjectAction } from '@/actions/deleteProjectAction';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmDeleteModal } from '../modals/confirmDeleteModal';
import { AddOrEditProjectModal } from '../modals/addProjectModal';
import { NewProjectShell } from '../projects/projectList/newProjectShell';

type ProjectsTableProps = {
  projects: Project[];
};
export function ProjectsTable({
  projects,
}: ProjectsTableProps) {
const [addOrEditModalOpen, setAddOrEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

const handleOpenModal = (proj?: Project) => {
  setSelectedProject(proj || null);
  setAddOrEditModalOpen(true);
};

const handleDelete = async (incomeId: string) => {
  setDeleteId(incomeId);
  setDeleteModalOpen(true);
};

  const onDeleteAction = async () => {
    setIsDeleting(true);
    await deleteProjectAction(deleteId);
    setIsDeleting(false);
    setDeleteModalOpen(false);
    toast.success(`Project ${deleteId} deleted successfully`);
  };

  return (
    <>
      <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Projects
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Create, update and delete projects. To view more insights and stats for each project click the name.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => handleOpenModal()}
            type="button"
            className="w-fit inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Add project
          </button>
        </div>
      </div>
      {projects.length === 0 && (
        <NewProjectShell setOpen={() => handleOpenModal()} />
      )}
     {projects.length > 0 && (
       <div className="mt-8 flow-root">
        <div>
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last Updated
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 break-words">
                        <Link className="text-blue-600 hover:underline" href={`projects/${project.id}`}>{project.name}</Link>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 break-words">
                        {project.description ?? '---'}
                      </td>
                      <td className="hidden md:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="hidden md:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 pr-4">
                      <div className="flex gap-2 justify-end">
                        <PencilSquareIcon
                          onClick={() => handleOpenModal(project)}
                          className="h-4 w-4 text-gray-600 hover:text-gray-400 cursor-pointer"
                        />
                        <TrashIcon
                          onClick={() => handleDelete(project.id)}
                          className="h-4 w-4 text-red-600 hover:text-red-400 cursor-pointer"
                        />
                      </div>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     )}
    </div>
    <AddOrEditProjectModal
        open={addOrEditModalOpen}
        setOpen={setAddOrEditModalOpen}
        project={selectedProject}
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDelete={onDeleteAction}
        isLoading={isDeleting}
      />
    </>
  );
}
