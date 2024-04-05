import { currencyFormatter } from "@/utils/utils";

type ProjectStatsProps = {
  totalIncome: number;
  totalExpenses: number;
  hoursWorked: number;
  profit: number;
  hourlyRate: number;
};

export function ProjectStats({
  totalIncome,
  totalExpenses,
  hoursWorked,
  profit,
  hourlyRate,
}: ProjectStatsProps) {

    const getColorClass = (value: number) => value >= 0 ? 'text-green-500' : 'text-red-600';


  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Total Income
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {currencyFormatter.format(totalIncome)}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Total Expenses
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-red-600">
          {currencyFormatter.format(totalExpenses)}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Hours Worked
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {hoursWorked}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Profit</dt>
        <dd className={`mt-1 text-3xl font-semibold tracking-tight ${getColorClass(profit)}`}>
          {currencyFormatter.format(profit)}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Hourly Rate
        </dt>
       <dd className={`mt-1 text-3xl font-semibold tracking-tight ${getColorClass(hourlyRate)}`}>
          {currencyFormatter.format(hourlyRate)}
          <span className="text-lg text-gray-400"> / hour</span>
        </dd>
      </div>
    </dl>
  );
}
