import { Project } from '@prisma/client';
import { Income } from './projectIncome';
import { db } from '@/lib/db';
import { Expense } from './projectExpense';
import { ProjectTimeLog } from './projectTimeLog';
import { ProjectStats } from './projectStats';

type ProjectProps = {
  project: Project;
};

async function getIncomeForProject(projectId: string) {
  try {
    const incomes = await db.projectIncome.findMany({
      where: {
        projectId: projectId,
      },
    });
    return incomes;
  } catch (error) {
    throw error;
  }
}

async function getTimeLogsForProject(projectId: string) {
  try {
    const logs = await db.timeLog.findMany({
      where: {
        projectId: projectId,
      },
    });
    return logs;
  } catch (error) {
    throw error;
  }
}

async function getIncomeTotalForProject(projectId: string) {
  try {
    const totalIncome = await db.projectIncome.aggregate({
      where: {
        projectId: projectId,
      },
      _sum: {
        amount: true,
      },
    });
    return totalIncome._sum.amount;
  } catch (error) {
    throw error;
  }
}

async function getExpensesForProject(projectId: string) {
  try {
    const incomes = await db.expense.findMany({
      where: {
        projectId: projectId,
      },
    });
    return incomes;
  } catch (error) {
    throw error;
  }
}

async function getExpensesTotalForProject(projectId: string) {
  try {
    const totalExpenses = await db.expense.aggregate({
      where: {
        projectId: projectId,
      },
      _sum: {
        amount: true,
      },
    });
    return totalExpenses._sum.amount;
  } catch (error) {
    throw error;
  }
}

export async function Project({ project }: ProjectProps) {
  const incomeRecords = await getIncomeForProject(project.id);
  const incomeTotal = (await getIncomeTotalForProject(project.id)) || 0;
  const expenseRecords = await getExpensesForProject(project.id);
  const expenseTotal = (await getExpensesTotalForProject(project.id)) || 0;
  const timeRecords = await getTimeLogsForProject(project.id);
  // Calculate total hours worked on the project
  const totalHoursWorked = timeRecords.reduce(
    (total, record) => total + record.hours,
    0
  );
  // Calculate profit/loss
  const profitLoss = incomeTotal - expenseTotal;
  // Calculate $ per hour (avoid division by zero)
  const dollarsPerHour =
    totalHoursWorked > 0 ? profitLoss / totalHoursWorked : 0;
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Project Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          ID: {project.id}
        </p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {project.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {project.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Created
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(project.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Updated
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(project.updatedAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
      <ProjectStats
        projectName={project.name}
        totalIncome={incomeTotal}
        totalExpenses={expenseTotal}
        hoursWorked={totalHoursWorked}
        profit={profitLoss}
        hourlyRate={dollarsPerHour}
      />
      <Income
        projectName={project.name}
        incomeRecords={incomeRecords}
        incomeTotal={incomeTotal}
        projectId={project.id}
      />
      <Expense
        projectName={project.name}
        expenseRecords={expenseRecords}
        expenseTotal={expenseTotal}
        projectId={project.id}
      />
      <ProjectTimeLog
        projectName={project.name}
        timeRecords={timeRecords}
        projectId={project.id}
      />
    </div>
  );
}
