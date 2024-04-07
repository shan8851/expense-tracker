"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const updateTimeAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) return {
      error: "You must be signed in to log time."
    };
    const id = formData.get('id') as string;
    const timeRecord = await db.timeLog.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!timeRecord) {
      return { error: 'Log not found.' };
    }
    if (timeRecord.project.userId !== session.user.id) {
      return { error: 'Unauthorized to update this time log.' };
    }
    const hours = formData.get("hours") as string;
    const note = formData.get("note") as string;
    const date = formData.get("date") as string;
    await db.timeLog.update({
      where: { id },
      data: {
        hours: parseFloat(hours),
        date: new Date(date),
        note,
      },
    });
    revalidatePath("/projects/[projectId]");
    return { error: null };
  } catch (error:any) {
    return {
      error: error.message ?? 'An error occurred while logging time.'
    };
  }
};
