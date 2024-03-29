'use client';
import { useState, useEffect } from 'react';

export default function APITestPage() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    fetch('/api/whoAmI')
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, []);

  return (
    <div>
      <h1>
        API from <span className="font-bold underline">Client</span>
      </h1>
      <div>Name: {name}</div>
    </div>
  );
}
