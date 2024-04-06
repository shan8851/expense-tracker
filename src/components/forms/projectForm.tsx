'use client';

import { createProjectAction } from '@/actions/createProjectAction';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FormButton } from '../formButton/formButton';

type ProjectFormProps = {
  setOpen: (open: boolean) => void;
  projectId: string;
};

export function ProjectForm({ setOpen, projectId }: ProjectFormProps) {
  const [errors, setErrors] = useState({
    name: '',
  });
  const cancelButtonRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitAction = async (formData: FormData) => {
    const isValid = validateForm(formData);
    if (!isValid) return;
    formRef.current?.reset();
    const { error } = await createProjectAction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Project created successfully');
    }
    setOpen(false);
  };

  const validateForm = (formData: FormData) => {
    const name = formData.get('name') as string;
    const errors = {
      name: '',
    };
    if (!name) {
      errors.name = 'Name is required';
    }
    setErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  return (
    <form
      ref={formRef}
      action={(formData) => submitAction(formData)}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="projectId" value={projectId} />
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            placeholder="HustleHub"
          />
        </div>
        <div className="h-[20px]">
          {errors.name && <p className="text-left text-sm text-red-600">{errors.name}</p>}
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900 text-left"
        >
          Project description
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="description"
            id="description"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <FormButton text="Create Project" pendingText="Creating Project..." />
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
