'use client';

import { createProjectIncomeAction } from '@/actions/createProjectIncomeAction';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FormButton } from '../formButton/formButton';
import { createProjectExpenseAction } from '@/actions/createProjectExpenseAction';
import { logProjectTimeAction } from '@/actions/logProjectTimeAction';

type LogTimeFormProps = {
  setOpen: (open: boolean) => void;
  projectId: string;
};

export function LogTimeForm({ projectId, setOpen }: LogTimeFormProps) {
  const [errors, setErrors] = useState({
    hours: '',
    date: '',
  });
  const cancelButtonRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitAction = async (formData: FormData) => {
    const isValid = validateForm(formData);
    if (!isValid) return;
    formRef.current?.reset();
    const { error } = await logProjectTimeAction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Time logged successfully');
    }
    setOpen(false);
  };

  const validateForm = (formData: FormData) => {
    const hours = formData.get('hours') as string;
    const date = formData.get('date') as string;
    const errors = {
      hours: '',
      date: '',
    };
    if (!hours) {
      errors.hours = 'Hours is required';
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
          htmlFor="hours"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          No. of Hours
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="hours"
            id="hours"
            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="3"
            onChange={() => setErrors({ ...errors, hours: '' })}
          />
        </div>
        <div className="h-[20px]">
          {errors.hours && <p className="text-left text-sm text-red-600">{errors.hours}</p>}
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
      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="note"
            id="note"
            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <FormButton text="Log Time" pendingText='Logging Time...' />
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
