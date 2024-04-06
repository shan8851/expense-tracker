"use server";

import { AUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createProjectAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);
  try {
    if (!session || !session.user) return {
      error: "You must be signed in to create a project."
    };
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    await db.project.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: session.user.id,
          }
        }
      },
    });
    revalidatePath("/dashboard");
    return { error: null };
  } catch (error:any) {
    return {
      error: error.message ?? 'An error occurred while creating project.'
    };
  }
};
