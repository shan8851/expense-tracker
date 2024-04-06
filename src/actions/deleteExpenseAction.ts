'use server';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const deleteExpenseAction = async (id: string) => {
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return { error: 'You must be signed in to delete an expense.' };
  }
  try {
    const expenseRecord = await db.expense.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!expenseRecord) {
      return { error: 'Income record not found.' };
    }
    if (expenseRecord.project.userId !== session.user.id) {
      return { error: 'Unauthorized to delete this expense record.' };
    }
    await db.expense.delete({
      where: { id },
    });
    revalidatePath('/dashboard');
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting project expense:', error);
    return {
      error: error.message ?? 'An error occurred while deleting project expense.',
    };
  }
};
