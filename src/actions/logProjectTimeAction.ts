"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const logProjectTimeAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) return "Unauthorized";
    const hours = formData.get("hours") as string;
    const note = formData.get("note") as string;
    const date = formData.get("date") as string;
    await db.timeLog.create({
      data: {
        hours: parseFloat(hours),
        note,
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
