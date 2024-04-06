'use server';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const deleteIncomeAction = async (id: string) => {
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return { error: 'You must be signed in to delete a project income.' };
  }
  try {
    const incomeRecord = await db.projectIncome.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!incomeRecord) {
      return { error: 'Income record not found.' };
    }
    if (incomeRecord.project.userId !== session.user.id) {
      return { error: 'Unauthorized to delete this income record.' };
    }
    await db.projectIncome.delete({
      where: { id },
    });
    revalidatePath('/dashboard');
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting project income:', error);
    return {
      error: error.message ?? 'An error occurred while deleting project income.',
    };
  }
};
