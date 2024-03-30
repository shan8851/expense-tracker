"use client"
import React from 'react';

export const Transactions = ({transactions}:{transactions:any}) => {
const handleDelete = async (id:any) => {
  await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });

};
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction: any) => (
          <li className="flex items-center gap-4" key={transaction.id}>
            <p>{transaction.type} - {transaction.amount} {transaction.currency}</p>
            <button onClick={() => handleDelete(transaction.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

