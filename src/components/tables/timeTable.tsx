import { TimeLog } from '@prisma/client';
import { EditAndDeleteCell } from './editAndDeleteCell';
import { deleteTimeAction } from '@/actions/deleteTimeAction';

type ProjectIncomeTableProps = {
  setOpen: (open: boolean) => void;
  projectName: string;
  timeRecords: TimeLog[];
};

export function TimeLogTable({
  setOpen,
  projectName,
  timeRecords,
}: ProjectIncomeTableProps) {
  return (
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
            onClick={() => setOpen(true)}
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
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Hours
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Notes
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
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
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.hours}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.note}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 flex justify-end">
                      <EditAndDeleteCell id={record.id} deleteAction={deleteTimeAction} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
