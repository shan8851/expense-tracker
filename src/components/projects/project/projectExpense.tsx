import { Expense as ProjectExpense } from '@prisma/client';
import { ExpenseTable } from '../../tables/expenseTable';

type ExpenseProps = {
  expenseRecords: ProjectExpense[];
  projectName: string;
  expenseTotal: number;
  projectId: string;
};

export const Expense = ({
  expenseRecords,
  projectName,
  expenseTotal,
  projectId,
}: ExpenseProps) => {
  return (
    <ExpenseTable
      expenseRecords={expenseRecords}
      projectName={projectName}
      expenseTotal={expenseTotal}
      projectId={projectId}
    />
  );
};
