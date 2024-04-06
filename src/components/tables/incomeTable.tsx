import { currencyFormatter } from '@/utils/utils';
import { ProjectIncome } from '@prisma/client';
import { EditAndDeleteCell } from './editAndDeleteCell';
import { deleteIncomeAction } from '@/actions/deleteIncomeAction';

type ProjectIncomeTableProps = {
  setOpen: (open: boolean) => void;
  projectName: string;
  incomeRecords: ProjectIncome[];
  incomeTotal: number;
};

export function IncomeTable({
  setOpen,
  projectName,
  incomeRecords,
  incomeTotal,
}: ProjectIncomeTableProps) {
  return (
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
            onClick={() => setOpen(true)}
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
                    <EditAndDeleteCell deleteAction={deleteIncomeAction} id={record.id} />
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
  );
}
