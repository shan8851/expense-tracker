'use client';

import { useFormStatus } from 'react-dom';

type FormButtonProps = {
  text: string;
  pendingText: string;
};
export function FormButton({ text, pendingText }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 sm:col-start-2"
    >
      {pending ? pendingText : text}
    </button>
  );
}
