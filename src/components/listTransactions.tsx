import React from 'react';

export const Transactions = ({transactions}:{transactions:any}) => {


  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction: any) => (
          <li key={transaction.id}>
            {transaction.type} - {transaction.amount} {transaction.currency}

          </li>
        ))}
      </ul>
    </div>
  );
};

