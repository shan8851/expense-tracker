'use client';

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function TawkToProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <TawkMessengerReact
        propertyId={process.env.TAWK_TO_ID!}
        widgetId="default"
      />
    </>
  );
}
