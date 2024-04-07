import { Expense as ProjectExpense } from '@prisma/client';
import { ExpenseTable } from '../../tables/expenseTable';

type ExpenseProps = {
  expenseRecords: ProjectExpense[];
  projectName: string;
  projectId: string;
};

export const Expense = ({
  expenseRecords,
  projectName,
  projectId,
}: ExpenseProps) => {
  return (
    <ExpenseTable
      expenseRecords={expenseRecords}
      projectName={projectName}
      projectId={projectId}
    />
  );
};
