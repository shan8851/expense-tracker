"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createProjectIncomeAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) return {
      error: "You must be signed in to create a project income."
    };
    const amount = formData.get("amount") as string;
    const source = formData.get("source") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    await db.projectIncome.create({
      data: {
        amount: parseFloat(amount),
        source,
        description,
        date: new Date(date),
        project: {
          connect: {
            id: formData.get("projectId") as string,
          }
        }
      },
    });
    revalidatePath("/projects/[projectId]");
    return { error: null };
  } catch (error:any) {
    return {
      error: error.message ?? 'An error occurred while creating project income.'
    };
  }
};
