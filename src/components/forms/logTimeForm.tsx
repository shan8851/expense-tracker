'use client';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FormButton } from '../formButton/formButton';
import { logTimeAction } from '@/actions/logProjectTimeAction';
import { TimeLog } from '@prisma/client';
import { updateTimeAction } from '@/actions/updateTimeAction';

type LogTimeFormProps = {
  setOpen: (open: boolean) => void;
  projectId: string;
  timeRecord: TimeLog | null;
};

export function LogTimeForm({ projectId, setOpen, timeRecord }: LogTimeFormProps) {
const [formData, setFormData] = useState({
    hours: timeRecord?.hours || '',
    note: timeRecord?.note || '',
    date: timeRecord ? new Date(timeRecord.date).toISOString().slice(0, 10) : '',
  });
  const [errors, setErrors] = useState({
    hours: '',
    date: '',
  });
  const cancelButtonRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitAction = async (formData: FormData) => {
    const isValid = validateForm();
    if (!isValid) return;
    formRef.current?.reset();
    const action = timeRecord ? updateTimeAction : logTimeAction;
    const { error } = await action(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success(`Time ${timeRecord ? 'updated' : 'logged'} successfully`);
    }
    setOpen(false);
  };

    const validateForm = () => {
    let isValid = true;
    const newErrors = { hours: '', date: '' };

    if (!formData.hours) {
      newErrors.hours = 'Hours is required';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <form action={submitAction} className="flex flex-col gap-4">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="id" value={timeRecord?.id} />
      <div>
        <label
          htmlFor="hours"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
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
            onChange={handleChange}
            value={formData.hours}
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
            onChange={handleChange}
            value={formData.date}
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
          Notes
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="note"
            id="note"
            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
            value={formData.note}
          />
        </div>
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <FormButton text={!timeRecord ? 'Log Time' : "Edit"} pendingText={!timeRecord ? 'Logging...' : "Editing..."} />
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
