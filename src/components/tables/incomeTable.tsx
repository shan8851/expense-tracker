'use client';
import { currencyFormatter } from '@/utils/utils';
import { ProjectIncome } from '@prisma/client';
import { deleteIncomeAction } from '@/actions/deleteIncomeAction';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AddOrEditIncomeModal } from '../modals/addOrEditIncomeModal';
import { ConfirmDeleteModal } from '../modals/confirmDeleteModal';

type ProjectIncomeTableProps = {
  projectName: string;
  projectId: string;
  incomeRecords: ProjectIncome[];
  incomeTotal: number;
};

export function IncomeTable({
  projectName,
  incomeRecords,
  incomeTotal,
  projectId,
}: ProjectIncomeTableProps) {
  const [addOrEditModalOpen, setAddOrEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [selectedIncomeRecord, setSelectedIncomeRecord] =
    useState<ProjectIncome | null>(null);

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
    toast.success('Item deleted successfully');
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
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
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/4" />
              <col className="sm:w-1/4" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Details
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                />
              </tr>
            </thead>
            <tbody>
              {incomeRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center text-sm text-gray-500 py-5"
                  >
                    No income records found. Add one to get started.
                  </td>
                </tr>
              ) : (
                incomeRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200">
                    <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="font-medium text-gray-900">
                        {record.source}
                      </div>
                      <div className="mt-1 truncate text-gray-500">
                        {record.description}
                      </div>
                    </td>
                    <td className="hidden px-3 py-5 text-left text-sm text-gray-500 sm:table-cell">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-5 pl-3 pr-4 text-left text-sm text-gray-500 sm:pr-0">
                      {currencyFormatter.format(record.amount)}
                    </td>
                    <td className="py-5 pl-3 pr-4">
                      <div className="flex gap-2">
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
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  {currencyFormatter.format(incomeTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
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
