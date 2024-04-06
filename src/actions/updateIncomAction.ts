'use server';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const updateIncomeAction = async (formData: FormData) => {
  const session = await getServerSession(AUTH_OPTIONS);

  if (!session || !session.user) {
    return { error: 'You must be signed in to update a project income.' };
  }
  try {
  const id = formData.get('id') as string;
    const incomeRecord = await db.projectIncome.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!incomeRecord) {
      return { error: 'Income record not found.' };
    }
    if (incomeRecord.project.userId !== session.user.id) {
      return { error: 'Unauthorized to update this income record.' };
    }
    const amount = formData.get("amount") as string;
    const source = formData.get("source") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    await db.projectIncome.update({
      where: { id },
      data: {
        amount: parseFloat(amount),
        source,
        description,
        date: new Date(date),
      },
    });
    revalidatePath('/dashboard');
    return { error: null };
  } catch (error: any) {
    console.error('Error updating project income:', error);
    return {
      error: error.message ?? 'An error occurred while updating project income.',
    };
  }
};
