'use client';
import { TimeLog } from '@prisma/client';
import { useState } from 'react';
import { TimeLogTable } from './timeTable';
import LogProjectTimeModal from './logProjectTimeModal';

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
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <TimeLogTable
          timeRecords={timeRecords}
          projectName={projectName}
          setOpen={setOpen}
        />
      </div>
      <LogProjectTimeModal
        open={open}
        setOpen={setOpen}
        projectId={projectId}
      />
    </div>
  );
};
