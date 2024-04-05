'use client';

import { createProjectIncomeAction } from '@/actions/createProjectIncomeAction';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FormButton } from '../formButton/formButton';
import { createProjectExpenseAction } from '@/actions/createProjectExpenseAction';

type ExpenseFormProps = {
  setOpen: (open: boolean) => void;
  projectId: string;
};

export function ExpenseForm({ projectId, setOpen }: ExpenseFormProps) {
  const [errors, setErrors] = useState({
    amount: '',
    category: '',
    date: '',
  });
  const cancelButtonRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitAction = async (formData: FormData) => {
    const isValid = validateForm(formData);
    if (!isValid) return;
    formRef.current?.reset();
    const { error } = await createProjectExpenseAction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Income added successfully');
    }
    setOpen(false);
  };

  const validateForm = (formData: FormData) => {
    const amount = formData.get('amount') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const errors = {
      amount: '',
      category: '',
      date: '',
    };
    if (!amount) {
      errors.amount = 'Amount is required';
    }
    if (!category) {
      errors.category = 'Category is required';
    }
    if (!date) {
      errors.date = 'Date is required';
    }
    setErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  return (
    <form action={submitAction} className="flex flex-col gap-4">
      <input type="hidden" name="projectId" value={projectId} />
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Amount
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="amount"
            id="amount"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            aria-describedby="price-currency"
            onChange={() => setErrors({ ...errors, amount: '' })}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              USD
            </span>
          </div>
        </div>
         <div className="h-[20px]">
          {errors.amount && <p className="text-left text-sm text-red-600">{errors.amount}</p>}
        </div>
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Category
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="category"
            id="category"
            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="AWS Fees"
            onChange={() => setErrors({ ...errors, category: '' })}
          />
        </div>
        <div className="h-[20px]">
          {errors.category && <p className="text-left text-sm text-red-600">{errors.category}</p>}
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="description"
            id="description"
            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Date
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="date"
            id="date"
            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={() => setErrors({ ...errors, date: '' })}
          />
        </div>
        <div className="h-[20px]">
          {errors.date && <p className="text-left text-sm text-red-600">{errors.date}</p>}
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <FormButton text="Add Expense" pendingText='Adding Expense...' />
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={() => setOpen(false)}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
