import { headers } from 'next/headers';

export default async function APIFromServer() {
  const response = await fetch('http://localhost:3000/api/whoAmI', {
    method: 'GET',
    headers: headers(),
  }).then((res) => res.json());
  return (
    <div>
      <h1>
        API from <span className="font-bold underline">Server</span>
      </h1>
      <div>Name: {response.name}</div>
    </div>
  );
}
