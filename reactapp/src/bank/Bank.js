import React, { useState } from "react";
import "./Bank.css";

const Bank = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Deposit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    if (amount && description) {
      const newTransaction = {
        id: new Date().getTime(),
        type: transactionType,
        amount: parseFloat(amount),
        description: description,
        timestamp: new Date().toLocaleString(),
      };
      setTransactions([...transactions, newTransaction]);
      setAmount("");
      setDescription("");
    }
  };

  const accountBalance = transactions.reduce(
    (balance, transaction) =>
      transaction.type === "Deposit"
        ? balance + transaction.amount
        : balance - transaction.amount,
    0
  );

  return (
    <div className="app">
      <h1>Banking Transaction Tracker</h1>
      <div className="transaction-form">
        <h2>Add New Transaction</h2>
        <form onSubmit={handleTransactionSubmit}>
          <label>
            Transaction Type:
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit">Add Transaction</button>
        </form>
      </div>
      <div className="transaction-list">
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <span className={transaction.type.toLowerCase()}>
                {transaction.type}: ${transaction.amount.toFixed(2)}
              </span>
              <span>{transaction.description}</span>
              <span>{transaction.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="account-summary">
        <h2>Account Summary</h2>
        <p>Account Balance: ${accountBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Bank;
