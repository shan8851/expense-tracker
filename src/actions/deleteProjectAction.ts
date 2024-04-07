'use server';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const deleteProjectAction = async (id: string) => {
const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return { error: 'You must be signed in to delete a project.' };
  }
    try {
    const project = await db.project.findUnique({
      where: { id },
    });
    if (!project) {
      return { error: 'Project not found.' };
    }
    if (project.userId !== session.user.id) {
      return { error: 'Unauthorized to delete this project.' };
    }
    await db.project.delete({
      where: { id },
    });
    revalidatePath('/projects/[projectId]');
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return {
      error: error.message ?? 'An error occurred while deleting project.',
    };
  }
}
