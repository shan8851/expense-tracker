"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { RecurrenceFrequency } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function calculateNextPaymentDue(date: Date, frequency: "MONTHLY" | "ANNUALLY"): Date {
  const nextDate = new Date(date);
  if (frequency === "MONTHLY") {
    nextDate.setMonth(nextDate.getMonth() + 1);
  } else if (frequency === "ANNUALLY") {
    nextDate.setFullYear(nextDate.getFullYear() + 1);
  }
  return nextDate;
}

export const createProjectIncomeAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) {
      return { error: "You must be signed in to create a project income." };
    }

    const projectId = formData.get("projectId") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const source = formData.get("source") as string;
    const description = formData.get("description") as string;
    const date = new Date(formData.get("date") as string);
    const recurring = formData.get("recurring") as RecurrenceFrequency;

    // Begin a transaction to ensure we correctly handle failures
    const income = await db.$transaction(async (prisma) => {
      // Create the income
      const newIncome = await prisma.projectIncome.create({
        data: {
          amount,
          source,
          description,
          date,
          recurring,
          nextPaymentDue: recurring !== 'NONE' ? calculateNextPaymentDue(date, recurring) : null,
          project: { connect: { id: projectId } },
        },
      });

      // If recurring, update `hasRecurringPayments` flag inside project
      if (recurring !== 'NONE') {
        await prisma.project.update({
          where: { id: projectId },
          data: { hasRecurringPayments: true },
        });
      }
      return newIncome;
    });

    revalidatePath(`/projects/${projectId}`);
    return { error: null, income };
  } catch (error: any) {
    return {
      error: error.message ?? 'An error occurred while creating project income.',
    };
  }
};
