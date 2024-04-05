'use client';
import { ProjectIncome } from '@prisma/client';
import { useState } from 'react';
import AddProjectIncomeModal from '../../modals/addProjectIncomeModal';
import { IncomeTable } from '../../tables/incomeTable';

type IncomeProps = {
  incomeRecords: ProjectIncome[];
  projectName: string;
  incomeTotal: number;
  projectId: string;
};

export const Income = ({
  incomeRecords,
  projectName,
  incomeTotal,
  projectId,
}: IncomeProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <IncomeTable
          incomeRecords={incomeRecords}
          projectName={projectName}
          setOpen={setOpen}
          incomeTotal={incomeTotal}
        />
      </div>
      <AddProjectIncomeModal
        open={open}
        setOpen={setOpen}
        projectId={projectId}
      />
    </div>
  );
};
