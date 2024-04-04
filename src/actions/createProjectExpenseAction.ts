"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createProjectExpenseAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) return "Unauthorized";
    const amount = formData.get("amount") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    await db.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        description,
        date: new Date(date),
        project: {
          connect: {
            id: formData.get("projectId") as string,
          }
        }
      },
    });
    revalidatePath("/dashboard");
  } catch (error:any) {
    throw new Error(error.message);
  }
};
