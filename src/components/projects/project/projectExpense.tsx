'use client';
import { Expense as ProjectExpense } from '@prisma/client';
import { useState } from 'react';
import AddProjectExpenseModal from './addProjectExpenseModal';
import { ExpenseTable } from './expenseTable';

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
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <ExpenseTable
          expenseRecords={expenseRecords}
          projectName={projectName}
          setOpen={setOpen}
          expenseTotal={expenseTotal}
        />
      </div>
      <AddProjectExpenseModal
        open={open}
        setOpen={setOpen}
        projectId={projectId}
      />
    </div>
  );
};
