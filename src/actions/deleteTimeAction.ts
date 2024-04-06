'use server';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const deleteTimeAction = async (id: string) => {
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return { error: 'You must be signed in to delete an expense.' };
  }
  try {
    const timeRecord = await db.timeLog.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!timeRecord) {
      return { error: 'Time log not found.' };
    }
    if (timeRecord.project.userId !== session.user.id) {
      return { error: 'Unauthorized to delete this time log.' };
    }
    await db.timeLog.delete({
      where: { id },
    });
    revalidatePath('/dashboard');
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting project time log:', error);
    return {
      error: error.message ?? 'An error occurred while deleting project time log.',
    };
  }
};
