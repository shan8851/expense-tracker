"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const updateProjectAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) return {
      error: "You must be signed in to edit a project."
    };
    const id = formData.get('id') as string;
    const project = await db.project.findUnique({
      where: { id },
    });
    if (!project) {
      return { error: 'Project not found.' };
    }
    if (project.userId !== session.user.id) {
      return { error: 'Unauthorized to update this project.' };
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    await db.project.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    revalidatePath("/projects/[projectId]");
    return { error: null };
  } catch (error:any) {
    return {
      error: error.message ?? 'An error occurred while editing project.'
    };
  }
};
