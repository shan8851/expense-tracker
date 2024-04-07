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
}: IncomeProps) => (
  <IncomeTable
    incomeRecords={incomeRecords}
    projectName={projectName}
    incomeTotal={incomeTotal}
    projectId={projectId}
  />
);
