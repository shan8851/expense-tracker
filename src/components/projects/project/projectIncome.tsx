"use client";
import { ProjectIncome } from "@prisma/client";
import { useState } from "react";
import AddProjectIncomeModal from "./addProjectIncomeModal";
import { IncomeTable } from "./incomeTable";

type IncomeProps = {
  incomeRecords: ProjectIncome[];
  projectName: string;
  incomeTotal: number;
}

export const Income = ({ incomeRecords, projectName, incomeTotal }: IncomeProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
       <IncomeTable incomeRecords={incomeRecords} projectName={projectName} setOpen={setOpen} incomeTotal={incomeTotal} />
      </div>
      <AddProjectIncomeModal open={open} setOpen={setOpen} />
    </div>
  )
}
