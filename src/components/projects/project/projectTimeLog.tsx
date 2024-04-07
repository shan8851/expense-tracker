import { TimeLog } from '@prisma/client';
import { TimeLogTable } from '../../tables/timeTable';

type TimeLogProps = {
  timeRecords: TimeLog[];
  projectName: string;
  projectId: string;
};

export const ProjectTimeLog = ({
  timeRecords,
  projectName,
  projectId,
}: TimeLogProps) => {
  return (
    <TimeLogTable
      timeRecords={timeRecords}
      projectName={projectName}
      projectId={projectId}
    />
  );
};
