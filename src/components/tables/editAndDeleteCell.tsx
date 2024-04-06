'use client';

import { useState } from 'react';
import { ConfirmDeleteModal } from '../modals/confirmDeleteModal';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { deleteIncomeAction } from '@/actions/deleteIncomAction';
import toast from 'react-hot-toast';

type EditAndDeleteCellProps = {
  id: string;
  deleteAction: (id: string) => Promise<{
    error: any;
}>
};

export function EditAndDeleteCell({ id, deleteAction }: EditAndDeleteCellProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteAction = async () => {
    setIsLoading(true);
    await deleteAction(id);
    setIsLoading(false);
    setDeleteModalOpen(false);
    toast.success('Income deleted successfully');
  }

  console.debug(deleteModalOpen)
  return (
    <>
      <div className="flex gap-2">
        <PencilSquareIcon className="h-4 w-4 text-gray-600 hover:text-gray-400 cursor-pointer" />
        <TrashIcon onClick={() => setDeleteModalOpen(true)} className="h-4 w-4 text-red-600 hover:text-red-400 cursor-pointer" />
      </div>
      <ConfirmDeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDelete={onDeleteAction}
        isLoading={isLoading}
      />
    </>
  );
}
