'use client';
import { TimeLog } from '@prisma/client';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { deleteTimeAction } from '@/actions/deleteTimeAction';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmDeleteModal } from '../modals/confirmDeleteModal';
import { AddOrEditTimeModal } from '../modals/logProjectTimeModal';

type ProjectIncomeTableProps = {
  projectName: string;
  timeRecords: TimeLog[];
  projectId: string;
};

export function TimeLogTable({
  projectName,
  timeRecords,
  projectId,
}: ProjectIncomeTableProps) {
  const [addOrEditModalOpen, setAddOrEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [selectedTimeLog, setSelectedTimeLog] = useState<TimeLog | null>(null);

  const handleOpenModal = (timeRecord?: TimeLog) => {
    setSelectedTimeLog(timeRecord || null);
    setAddOrEditModalOpen(true);
  };

  const handleDelete = async (incomeId: string) => {
    setDeleteId(incomeId);
    setDeleteModalOpen(true);
  };

  const onDeleteAction = async () => {
    setIsDeleting(true);
    await deleteTimeAction(deleteId);
    setIsDeleting(false);
    setDeleteModalOpen(false);
    toast.success('Item deleted successfully');
  };
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Time Log
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              For work completed on {projectName}.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => handleOpenModal()}
              type="button"
              className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            >
              Log Time
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Hours
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Notes
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timeRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {record.hours}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {record.note}
                      </td>
                      <td className="py-5">
                        <div className="flex gap-2 justify-end">
                          <PencilSquareIcon
                            onClick={() => handleOpenModal(record)}
                            className="h-4 w-4 text-gray-600 hover:text-gray-400 cursor-pointer"
                          />
                          <TrashIcon
                            onClick={() => handleDelete(record.id)}
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
      <AddOrEditTimeModal
        open={addOrEditModalOpen}
        setOpen={setAddOrEditModalOpen}
        projectId={projectId}
        timeRecord={selectedTimeLog}
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
