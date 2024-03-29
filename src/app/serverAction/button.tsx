'use client';
import { useState } from 'react';

export default function Button({ action }: { action: () => Promise<string> }) {
  const [name, setName] = useState<string>();

  return (
    <div>
      <button onClick={async () => setName(await action())}>WHO AM I???</button>
      {name && <p>You are - {name}</p>}
    </div>
  );
}
