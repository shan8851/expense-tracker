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
    toast.success(`Time log ${deleteId} deleted successfully`);
  };
  return (
    <>
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
      {timeRecords.length === 0 && (
        <div className="mt-8">
          <p className="text-sm text-gray-500">No time logs found. Add one!</p>
        </div>
      )}
      {timeRecords.length > 0 && (
        <div className="flow-root">
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
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timeRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 break-words">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 break-words">
                          {record.hours}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 break-words">
                          {record.note}
                        </td>
                        <td className="py-4 pr-4">
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
      )}
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
