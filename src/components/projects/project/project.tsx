import { Project } from '@prisma/client';
import { Income } from './projectIncome';
import { db } from '@/lib/db';
import { Expense } from './projectExpense';

type ProjectProps = {
  project: Project;
};

async function getIncomeForProject(projectId:string) {
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

async function getIncomeTotalForProject(projectId:string) {
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

async function getExpensesForProject(projectId:string) {
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

async function getExpensesTotalForProject(projectId:string) {
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
  const incomeTotal = await getIncomeTotalForProject(project.id) || 0;
  const expenseRecords = await getExpensesForProject(project.id);
  const expenseTotal = await getExpensesTotalForProject(project.id) || 0;
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
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
    </div>
    <Income projectName={project.name} incomeRecords={incomeRecords} incomeTotal={incomeTotal} />
    <Expense projectName={project.name} expenseRecords={expenseRecords} expenseTotal={expenseTotal} />
    </div>
  );
}
