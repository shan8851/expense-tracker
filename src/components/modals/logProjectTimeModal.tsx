import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon, PencilIcon } from '@heroicons/react/20/solid';
import { LogTimeForm } from '@/components/forms/logTimeForm';
import { TimeLog } from '@prisma/client';

type AddOrEditTimeModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
  timeRecord: TimeLog | null;
};
export function AddOrEditTimeModal({
  open,
  setOpen,
  projectId,
  timeRecord,
}: AddOrEditTimeModalProps) {
  const cancelButtonRef = useRef(null);
  const isEditing = timeRecord !== null;
  const title = isEditing ? 'Edit Time Log' : 'Log Time';
  const iconBgColorClass = isEditing ? 'bg-blue-100' : 'bg-emerald-100';
  const icon = !isEditing ? (
    <PlusCircleIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
  ) : (
    <PencilIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconBgColorClass}`}
                  >
                    {icon}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <LogTimeForm
                      projectId={projectId}
                      setOpen={setOpen}
                      timeRecord={timeRecord}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
