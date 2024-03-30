"use client"
import React, { useState } from 'react';

export const AddTransaction = () => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const transaction = {
    type,
    amount: parseFloat(amount),
    currency,
    date,
    description,
  };

    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type (Income/Expense/Withdrawal)"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        placeholder="Currency (USD/GBP/etc.)"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

