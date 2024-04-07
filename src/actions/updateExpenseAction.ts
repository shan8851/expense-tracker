'use server';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const updateExpenseAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);

  if (!session || !session.user) {
    return { error: 'You must be signed in to update a project expense.' };
  }
  try {
  const id = formData.get('id') as string;
    const expenseRecord = await db.expense.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!expenseRecord) {
      return { error: 'Expense record not found.' };
    }
    if (expenseRecord.project.userId !== session.user.id) {
      return { error: 'Unauthorized to update this expense record.' };
    }
    const amount = formData.get("amount") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    await db.expense.update({
      where: { id },
      data: {
        amount: parseFloat(amount),
        category,
        description,
        date: new Date(date),
      },
    });
    revalidatePath('/projects/[projectId]');
    return { error: null };
  } catch (error: any) {
    console.error('Error updating project expense:', error);
    return {
      error: error.message ?? 'An error occurred while updating project expense.',
    };
  }
};
