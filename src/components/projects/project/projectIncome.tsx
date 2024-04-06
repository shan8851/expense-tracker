import { ProjectIncome } from '@prisma/client';
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <IncomeTable
          incomeRecords={incomeRecords}
          projectName={projectName}
          incomeTotal={incomeTotal}
          projectId={projectId}
        />
      </div>
    </div>
  );
};
