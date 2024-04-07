'use client';
import { currencyFormatter } from '@/utils/utils';
import { deleteIncomeAction } from '@/actions/deleteIncomeAction';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AddOrEditIncomeModal } from '../modals/addOrEditIncomeModal';
import { ConfirmDeleteModal } from '../modals/confirmDeleteModal';
import { ProjectIncome } from '@prisma/client';
import { useVisibleItems } from '@/hooks/useVisibleItems';

type ProjectIncomeTableProps = {
  projectName: string;
  projectId: string;
  incomeRecords: ProjectIncome[];
};

export function IncomeTable({
  projectName,
  incomeRecords,
  projectId,
}: ProjectIncomeTableProps) {
  const [addOrEditModalOpen, setAddOrEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [selectedIncomeRecord, setSelectedIncomeRecord] =
    useState<ProjectIncome | null>(null);
  const { visibleItems, showMoreItems, showLessItems, canShowMore, canShowLess } = useVisibleItems<ProjectIncome>(incomeRecords);


  const handleOpenModal = (incomeRecord?: ProjectIncome) => {
    setSelectedIncomeRecord(incomeRecord || null);
    setAddOrEditModalOpen(true);
  };

  const handleDelete = async (incomeId: string) => {
    setDeleteId(incomeId);
    setDeleteModalOpen(true);
  };

  const onDeleteAction = async () => {
    setIsDeleting(true);
    await deleteIncomeAction(deleteId);
    setIsDeleting(false);
    setDeleteModalOpen(false);
    toast.success(`Income ${deleteId} deleted successfully`);
  };

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Income
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
            Add Income
          </button>
        </div>
      </div>
      {incomeRecords.length === 0 && (
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            No income records found. Add one to get started.
          </p>
        </div>
      )}
      {incomeRecords.length > 0 && (
        <div className="flow-root">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
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
                  {visibleItems.map((record) => (
                    <tr key={record.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 break-words">
                        <div>{record.source}</div>
                        <div className="mt-1 truncate text-gray-500">
                          {record.description}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 break-words">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 break-words">
                        {currencyFormatter.format(record.amount)}
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
              <div className="flex items-center justify-end gap-4 px-4 py-2">
                {canShowMore && (
                  <button
                    onClick={showMoreItems}
                    className="rounded-md mt-2 flex items-center gap-1 font-semibold bg-gray-500 p-1 text-white text-[10px] hover:bg-gray-400"
                  >
                      SHOW MORE
                  </button>
                )}
                {canShowLess && (
                  <button
                    onClick={showLessItems}
                    className="rounded-md mt-2 flex items-center gap-1 font-semibold bg-gray-500 p-1 text-white text-[10px] hover:bg-gray-400"
                  >
                      SHOW LESS
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <AddOrEditIncomeModal
        open={addOrEditModalOpen}
        setOpen={setAddOrEditModalOpen}
        projectId={projectId}
        incomeRecord={selectedIncomeRecord}
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
