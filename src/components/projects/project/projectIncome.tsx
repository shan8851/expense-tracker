import { ProjectIncome } from '@prisma/client';
import { IncomeTable } from '../../tables/incomeTable';

type IncomeProps = {
  incomeRecords: ProjectIncome[];
  projectName: string;
  projectId: string;
};

export const Income = ({
  incomeRecords,
  projectName,
  projectId,
}: IncomeProps) => (
  <IncomeTable
    incomeRecords={incomeRecords}
    projectName={projectName}
    projectId={projectId}
  />
);
